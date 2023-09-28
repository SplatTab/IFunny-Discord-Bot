import requests

url = "https://api.ifunny.mobi/v4/users/by_nick/splat"
headers = {
    "Host": "api.ifunny.mobi",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "authorization": "Basic NjUzNjM0MzQ2MzM4MzI2MjJENjQ2NTY1NjMyRDM0MzAzMjM4MkQ2MTMxNjYzMzJEMzEzMzMxMzAzMzM0MzQzMzMzNjQ2MzM0X01zT0lKMzlRMjg6Y2Y2Njc5OTdiY2U5MTJhOTc1MDZhMmFlYjM0ZTI0MWI5NjZiNTdlZQ==",
    "accept-language": "en-US,en;q=0.5",
    "ifunny-project-id": "iFunny",
    "content-type": "application/x-www-form-urlencoded",
    "accept-encoding": "gzip, deflate, br",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0",
}

response = requests.get(url, headers=headers)

print(response.json())

