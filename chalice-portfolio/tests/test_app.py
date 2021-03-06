import app
from chalice.test import Client
import requests
baseurl = 'http://127.0.0.1:8000'   # Needs chalice local to be running

# Request to nonexistent portfolio should return the template
def test_get_nonexistent_portfolio():
  url = f'{baseurl}/get/nonexistent@somecompany.com/portfolio'
  response = requests.get(url)
  print(url)
  assert response.status_code == 200
  assert response.headers['Content-Type'] == 'text/csv'

def test_get():
  url = f'{baseurl}/get/vbalasu@gmail.com/portfolio'
  response = requests.get(url)
  print(url)
  assert response.status_code == 200
  assert response.headers['Content-Type'] == 'text/csv'

# Get token by running `aws s3 cp s3://cloudmatica/email-authentication/vbalasu@gmail.com -`
def test_put():
  url = f'{baseurl}/put/vbalasu@gmail.com/portfolio/914cecd3-4d0c-4a17-88f6-f2172c6a7669'
  with open('/tmp/portfolio.csv', 'rb') as f:
    body = f.read()
  response = requests.put(url, data=body, headers={'Content-Type': 'text/csv'})
  assert response.status_code == 200
  assert response.json() == True

def test_log():
  url = f'{baseurl}/log/vbalasu@gmail.com/portfolio'
  with Client(app.app) as client:
    response = client.http.get(url)
    assert response.status_code == 200
    assert response.json_body == True