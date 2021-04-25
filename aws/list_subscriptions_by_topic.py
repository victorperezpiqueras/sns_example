import json
import logging
import os
import time
import uuid
import boto3


def list_subscriptions_by_topic(event, context):

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

        sns = boto3.client("sns", region_name="us-east-1")

        subscriptions = sns.list_subscriptions_by_topic(TopicArn=topic)

        response.update({"body": json.dumps(subscriptions)})

    except Exception as e:
        print("> Error: %s" % e)
        response.update({"statusCode": 500, "body": "Internal Error: %s" % e})

    return response
