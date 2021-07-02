import app
from chalice.test import Client
import requests
baseurl = 'http://127.0.0.1:8000'   # Needs chalice local to be running

def test_get():
  url = f'{baseurl}/get/vbalasu@gmail.com/portfolio'
  response = requests.get(url)
  print(url)
  assert response.status_code == 200
  assert response.headers['Content-Type'] == 'text/csv'

def test_put():
  url = f'{baseurl}/put/vbalasu@gmail.com/portfolio/43d59ffa-bf0f-485c-9104-32cb808b0f8b'
  with open('/tmp/portfolio.csv', 'rb') as f:
    body = f.read()
  response = requests.put(url, data=body, headers={'Content-Type': 'text/csv'})
  assert response.status_code == 200
  assert response.json() == True