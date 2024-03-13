# pylint: disable-msg=R0903
import aws_cdk
from aws_cdk import aws_lambda_python_alpha as aws_python
from constructs import Construct


class ServerlessBackendStack(aws_cdk.Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        bucket_name = aws_cdk.CfnParameter(
            self,
            "uploadBucketName",
            type="String",
            description="The name of the Amazon S3 bucket where uploaded images will be stored.",
        )
        user_pool = aws_cdk.aws_cognito.UserPool(self, "UserPool")
        user_pool.add_client(
            "app-client",
            auth_flows=aws_cdk.aws_cognito.AuthFlow(user_password=True),
            supported_identity_providers=[
                aws_cdk.aws_cognito.UserPoolClientIdentityProvider.COGNITO
            ],
        )
        auth = aws_cdk.aws_apigateway.CognitoUserPoolsAuthorizer(
            self, "froodom-authorizer", cognito_user_pools=[user_pool]
        )
        my_table = aws_cdk.aws_dynamodb.Table(
            self,
            id="dynamoTable",
            table_name="products",
            partition_key=aws_cdk.aws_dynamodb.Attribute(
                name="id", type=aws_cdk.aws_dynamodb.AttributeType.STRING
            ),
        )

        my_table.add_global_secondary_index(
            partition_key=aws_cdk.aws_dynamodb.Attribute(
                name="name", type=aws_cdk.aws_dynamodb.AttributeType.STRING
            ),
            sort_key=aws_cdk.aws_dynamodb.Attribute(
                name="updated_at", type=aws_cdk.aws_dynamodb.AttributeType.STRING
            ),
            index_name="name-updated_at-index",
        )

        my_bucket = aws_cdk.aws_s3.Bucket(
            self, id="s3bucket", bucket_name=bucket_name.value_as_string
        )
        # TODO Add bucket policy for images to be public in code here

        my_lambda = aws_python.PythonFunction(
            self,
            id="lambdafunction",
            runtime=aws_cdk.aws_lambda.Runtime.PYTHON_3_10,
            entry="./src",
            index="api/index.py",
            function_name="froodom-lambda",
            environment={"bucket": my_bucket.bucket_name, "table": my_table.table_name},
            timeout=aws_cdk.Duration.minutes(1),
        )

        my_bucket.grant_read_write(my_lambda)
        my_table.grant_read_write_data(my_lambda)
        my_api = aws_cdk.aws_apigateway.LambdaRestApi(
            self,
            id="lambdaapi",
            rest_api_name="froodom-api",
            handler=my_lambda,
            proxy=True,
            default_cors_preflight_options={
                "allow_origins": aws_cdk.aws_apigateway.Cors.ALL_ORIGINS,
                "allow_methods": aws_cdk.aws_apigateway.Cors.ALL_METHODS,
            },
        )
        post_data = my_api.root.add_resource("products")

        post_data.add_method(
            "POST",
            authorizer=auth,
            authorization_type=aws_cdk.aws_apigateway.AuthorizationType.COGNITO,
        )
