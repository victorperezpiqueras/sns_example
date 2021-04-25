import json
import logging
import os
import time
import uuid
import boto3


def send_message_to_topic(event, context):

    response = {
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            "Content-Type": "application/json"},
        "statusCode": 200,
        "body": None,
    }

    try:
        headers = event["headers"] if "headers" in event else None
        data = event["body"] if "body" in event else None
        data = json.loads(data) if data else None

        topic = event['pathParameters']['topic']
        subject = data['subject']
        message = data['message']

        sns = boto3.client("sns", region_name="us-east-1")

        sns.publish(TopicArn=topic,
                    Message=message,
                    Subject=subject)

        message = {
            "result": "ok"
        }

        response.update({"body": json.dumps(message)})

    except Exception as e:
        print("> Error: %s" % e)
        response.update({"statusCode": 500, "body": "Internal Error: %s" % e})

    return response
