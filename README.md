# sns_example
AWS Simple Notification Service example web app to list and invite subscribers to a topic and publish messages.

## Notebooks
Run ```jupyter notebook``` to see some examples of Boto3 SNS methods.

## Client
Angular client template, made with ngxrocket. To run in ```localhost:4200```, go to /client and execute:
```ng serve```

## AWS
Serverless architecture that creates a SNS Topic and lambdas to perform:
- listing of topic subscribers
- invite subscribers by email to a topic
- publish messages to a topic

To deploy the architecture, go to /aws folder and set AWS credentials:
```sls config credentials --provider aws --key XXX --secret XXX```. Then deploy the code to AWS:
```sls deploy```.
