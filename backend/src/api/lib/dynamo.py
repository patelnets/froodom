import base64
import json
import os
from datetime import datetime
from uuid import uuid4

import boto3
from boto3.dynamodb.conditions import Attr, Key

table = boto3.resource("dynamodb").Table(os.environ["table"])


class Error(Exception):
    pass


class ProductNotFoundError(Error):
    pass


def create_product(name: str, stores: list[str], categories: list[str]) -> dict:
    print("Creating product")

    item = {
        "id": str(uuid4()),
        "name": name,
        "stores": stores,
        "images": [],
        "categories": categories,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
    }
    table.put_item(
        Item=item,
        ConditionExpression="#product_name <> :nameValue",
        ExpressionAttributeNames={"#product_name": "name"},
        ExpressionAttributeValues={":nameValue": name},
    )
    return item


def get_product(product_id: str) -> dict:
    print(f"Getting product {product_id}")
    res = table.get_item(
        Key={
            "id": product_id,
        },
    )

    item = res.get("Item")
    if not item:
        raise ProductNotFoundError

    return item


def get_products_by_name(name: str) -> dict:
    print(f"Getting product by name {name}")

    response = table.query(
        IndexName="name-updated_at-index", KeyConditionExpression=Key("name").eq(name)
    )
    return response["Items"]


def update_product(
    product_id: str,
    stores: list[str] = None,
    name: str = None,
    categories: list[str] = None,
) -> dict:
    expr = []
    attr_values = {}
    attr_names = {}

    if stores is not None:
        expr.append("#K=:k")
        attr_values[":k"] = stores
        attr_names["#K"] = "stores"

    if categories is not None:
        expr.append("#C=:c")
        attr_values[":c"] = categories
        attr_names["#C"] = "categories"

    if name is not None:
        expr.append("#N=:n")
        attr_values[":n"] = name
        attr_names["#N"] = "name"

    expr.append("#U=:u")
    attr_values[":u"] = datetime.now().isoformat()
    attr_names["#U"] = "updated_at"

    if not expr:
        print("No fields to update")
        return

    print("Updating product")
    try:
        table.update_item(
            Key={
                "id": product_id,
            },
            UpdateExpression=f"set {', '.join(expr)}",
            ExpressionAttributeValues=attr_values,
            ExpressionAttributeNames=attr_names,
            ConditionExpression=Attr("id").exists(),
        )
    except table.meta.client.exceptions.ConditionalCheckFailedException:
        raise ProductNotFoundError


def list_products(next_token: str = None) -> dict:
    print("Listing products")

    scan_args = {
        "Limit": 1000,
    }

    if next_token:
        scan_args["ExclusiveStartKey"] = _decode(next_token)

    res = table.scan(**scan_args)
    response = {"products": res["Items"]}

    if "LastEvaluatedKey" in res:
        response["next_token"] = _encode(res["LastEvaluatedKey"])

    return response


def delete_product(product_id: str):
    print(f"Deleting product ${product_id}")

    try:
        table.delete_item(
            Key={
                "id": product_id,
            },
            ConditionExpression=Attr("id").exists(),
        )
    except table.meta.client.exceptions.ConditionalCheckFailedException:
        raise ProductNotFoundError


def add_image_to_product(product_id: str, image_id: str):
    print(f"Adding image {image_id} to product {product_id}")
    try:
        table.update_item(
            Key={
                "id": product_id,
            },
            UpdateExpression="set #I = list_append(if_not_exists(#I, :empty_list), :i)",
            ExpressionAttributeNames={"#I": "images"},
            ExpressionAttributeValues={
                ":i": [image_id],
                ":empty_list": [],
            },
            ConditionExpression=Attr("id").exists(),
        )
    except table.meta.client.exceptions.ConditionalCheckFailedException:
        raise ProductNotFoundError


def _encode(data: dict) -> str:
    json_string = json.dumps(data)
    return base64.b64encode(json_string.encode("utf-8")).decode("utf-8")


def _decode(data: str) -> dict:
    json_string = base64.b64decode(data.encode("utf-8")).decode("utf-8")
    return json.loads(json_string)
