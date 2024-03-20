import os

import boto3
import pytest
from moto import mock_aws


@pytest.fixture(scope="function", name="aws_credentials")
def fixture_aws_credentials():
    """Mocked AWS Credentials for moto."""
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"
    os.environ["AWS_DEFAULT_REGION"] = "us-east-2"


@pytest.fixture(scope="function")
# pylint: disable-next=unused-argument
def dynamodb_client(aws_credentials):
    with mock_aws():
        yield boto3.client("dynamodb", region_name="us-east-2")


@pytest.fixture(scope="function")
# pylint: disable-next=unused-argument
def s3_client(aws_credentials):
    with mock_aws():
        yield boto3.client("s3")
