import boto3

# Best to instantiate at global level in lambdas https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
s3 = boto3.client("s3")


def delete_object(bucket: str, key: str):
    s3.delete_object(Bucket=bucket, Key=key)
