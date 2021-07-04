from chalice import Chalice, Response
import boto3

app = Chalice(app_name='chalice-portfolio')


@app.route('/get/{user}/{cid}', cors=True)
def get(user, cid):
    url = f's3://cloudmatica/portfolio/{user}/{cid}'
    log(user, cid)
    print('get', url)
    from botocore.exceptions import ClientError
    s3 = boto3.client('s3')
    try:
        s3.download_file('cloudmatica', f'portfolio/{user}/{cid}', '/tmp/portfolio.csv')
    except ClientError:
        s3.download_file('cloudmatica', f'portfolio/portfolio.csv', '/tmp/portfolio.csv')
    with open('/tmp/portfolio.csv', 'rb') as f:
        body = f.read()
    return Response(body=body, headers={'Content-Type': 'text/csv'})

# USAGE: http PUT http://127.0.0.1:8000/put/vbalasu.kb@gmail.com/portfolio @portfolio.csv
@app.route('/put/{user}/{cid}/{token}', methods=['PUT'], content_types=['text/csv'], cors=True)
def put(user, cid, token):
    import requests
    auth = requests.get(f'https://email-authentication.cloudmatica.com/verify/{user}/{token}')
    if not auth.json():
        return False
    url = f's3://cloudmatica/portfolio/{user}/{cid}'
    print('put', url)
    payload = app.current_request.raw_body
    s3 = boto3.client('s3')
    with open('/tmp/portfolio.csv', 'wb') as f:
        f.write(payload)
    s3.upload_file('/tmp/portfolio.csv', 'cloudmatica', f'portfolio/{user}/{cid}')
    return True

@app.route('/log/{user}/{cid}', cors=True)
def log(user, cid):
    import datetime
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('portfolio')
    response = table.put_item(Item={'timestamp': datetime.datetime.utcnow().isoformat(), 'action': 'view', 'user': user, 'cid': cid})
    return response['ResponseMetadata']['HTTPStatusCode'] == 200

# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#
