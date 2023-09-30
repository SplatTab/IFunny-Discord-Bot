import requests
import threading

# Define the URL and headers
url = "https://api.ifunny.mobi/v4/feeds/collective?limit=8"
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

# Initialize a counter for video clips
video_clip_count = 0

# Lock to ensure thread-safe access to the counter
counter_lock = threading.Lock()

# Function to send GET request and count video clips
def process_request():
    global video_clip_count
    try:
        # Send the GET request
        response = requests.post(url, headers=headers)

        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()

            # Check if the 'data' key exists in the response
            if "data" in data:
                content = data["data"]["content"]

                # Check if 'items' key exists in 'content'
                if "items" in content:
                    items = content["items"]

                    # Iterate through items and count 'video_clip'
                    for item in items:
                        if item.get("type") == "video_clip":
                            with counter_lock:
                                print(" V ", end='')
                                video_clip_count += 1
                                break;
                        else:
                            print("N", end='')
        else:
            print("Bad response", response.status_code)
    except Exception as e:
        print("An error occurred:", str(e))

# Create multiple threads to send concurrent requests
num_threads = 20  # Adjust the number of threads as needed
threads = []

for _ in range(num_threads):
    thread = threading.Thread(target=process_request)
    threads.append(thread)
    thread.start()

# Wait for all threads to complete
for thread in threads:
    thread.join()

# 'video_clip_count' now contains the count of "video_clip" items in the response
print("\nNumber of 'video_clip' items:", video_clip_count)
