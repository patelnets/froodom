from fastapi.testclient import TestClient
from moto import mock_aws

from api.index import app


def test_hello_world():
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


@mock_aws()
def test_list_products(dynamodb_client, s3_client):
    dynamodb_client.create_table(
        TableName="test-table",
        KeySchema=[
            {"AttributeName": "id", "KeyType": "HASH"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "id", "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
    )

    s3_client.create_bucket(
        Bucket="test-bucket",
        CreateBucketConfiguration={"LocationConstraint": "us-east-2"},
    )

    client = TestClient(app)
    response = client.post(
        "/products",
        json={
            "id": "foobar",
            "name": "Foo Bar",
            "stores": ["store1", "store2"],
            "categories": ["category1", "category2"],
        },
    )
    assert response.status_code == 201

    response = client.get("/products")
    assert response.status_code == 200

    expected = {
        "next_token": None,
        "products": [
            {
                "categories": ["category1", "category2"],
                "header_image": None,
                "image_urls": {},
                "images": [],
                "name": "Foo Bar",
                "stores": ["store1", "store2"],
            }
        ],
    }
    assert response.json() == (expected | response.json())
    assert isinstance(response.json()["products"][0]["id"], str)


@mock_aws()
def test_get_single_product(dynamodb_client, s3_client):
    dynamodb_client.create_table(
        TableName="test-table",
        KeySchema=[
            {"AttributeName": "id", "KeyType": "HASH"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "id", "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
    )

    s3_client.create_bucket(
        Bucket="test-bucket",
        CreateBucketConfiguration={"LocationConstraint": "us-east-2"},
    )

    client = TestClient(app)
    response = client.post(
        "/products",
        json={
            "name": "Foo Bar",
            "stores": ["store1", "store2"],
            "categories": ["category1", "category2"],
        },
    )
    assert response.status_code == 201
    product_id = response.json()["id"]

    response = client.get(f"/products/{product_id}")
    assert response.status_code == 200

    expected = {
        "categories": ["category1", "category2"],
        "header_image": None,
        "id": "c88d897a-b81d-4288-a98d-1194e13787e2",
        "image_urls": {},
        "images": [],
        "name": "Foo Bar",
        "stores": ["store1", "store2"],
    }
    assert response.json() == (expected | response.json())
    assert isinstance(response.json()["id"], str)


@mock_aws()
def test_delete_single_product(dynamodb_client, s3_client):
    dynamodb_client.create_table(
        TableName="test-table",
        KeySchema=[
            {"AttributeName": "id", "KeyType": "HASH"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "id", "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
    )

    s3_client.create_bucket(
        Bucket="test-bucket",
        CreateBucketConfiguration={"LocationConstraint": "us-east-2"},
    )

    client = TestClient(app)
    response = client.post(
        "/products",
        json={
            "name": "Foo Bar",
            "stores": ["store1", "store2"],
            "categories": ["category1", "category2"],
        },
    )
    assert response.status_code == 201
    product_id = response.json()["id"]

    response = client.delete(f"/products/{product_id}")
    assert response.status_code == 200

    response = client.get(f"/products/{product_id}")
    assert response.status_code == 404


@mock_aws()
def test_get_pre_signed_url(dynamodb_client, s3_client):
    dynamodb_client.create_table(
        TableName="test-table",
        KeySchema=[
            {"AttributeName": "id", "KeyType": "HASH"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "id", "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
    )

    s3_client.create_bucket(
        Bucket="test-bucket",
        CreateBucketConfiguration={"LocationConstraint": "us-east-2"},
    )

    client = TestClient(app)
    response = client.post(
        "/products",
        json={
            "name": "Foo Bar",
            "stores": ["store1", "store2"],
            "categories": ["category1", "category2"],
        },
    )
    assert response.status_code == 201
    product_id = response.json()["id"]

    response = client.get(f"/products/{product_id}/image-upload-pre-signed-url")
    assert response.status_code == 200
    assert response.json().get("url") is not None
