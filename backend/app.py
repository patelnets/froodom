#!/usr/bin/env python3

import os

import aws_cdk

from serverless_backend.serverless_backend_stack import ServerlessBackendStack

app = aws_cdk.App()
ServerlessBackendStack(
    app,
    "ServerlessBackendStack",
    env=aws_cdk.Environment(
        account=os.getenv("AWS_ACCOUNT"), region=os.getenv("AWS_REGION")
    ),
)

app.synth()
