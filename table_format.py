# importing the modules
# Install pandas
# Install tabulate
import pandas as df
import sys
import logging
import os
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

  
# reading the file
data = df.read_json("simplified.json")
data = data.drop(['URL'], axis = 1)


channel_id = str(sys.argv[1])
token = str(sys.argv[2])


client = WebClient(token=os.environ.get("slack_token"))
logger = logging.getLogger(__name__)

# __________ Create markdown for table to be posted in Slack Channel___________________

markdown_table = data.to_markdown() # install tabulate

try:
    # Call the chat.postMessage method using the WebClient
    result = client.chat_postMessage(
        token=token,
        channel=channel_id, 
        text="```\n" + markdown_table + "\n```"
    )
    logger.info(result)

except SlackApiError as e:
    logger.error(f"Error posting message: {e}")