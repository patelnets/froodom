import os
from uuid import uuid4

import boto3

from api.lib import dynamo

s3 = boto3.client("s3")


def get_all_images_for_product(product_id):
    res = s3.list_objects_v2(
        Bucket=os.environ["bucket"], Prefix=f"images/{product_id}/"
    )
    if "Contents" in res:
        return [obj["Key"] for obj in res["Contents"]]
    return []


def get_products(next_token=None):
    res = dynamo.list_products(next_token=next_token)
    for product in res["products"]:
        if "categories" not in product:
            product["categories"] = []
        images = get_all_images_for_product(product["id"])
        for image_id in images:
            if "image_urls" not in product:
                product["image_urls"] = {}
            product["image_urls"][
                image_id
            ] = f"https://{os.environ['bucket']}.s3.eu-west-2.amazonaws.com/{image_id}"

        if len(images) > 0:
            product["header_image"] = (
                f"https://{os.environ['bucket']}.s3.eu-west-2.amazonaws.com/{images[0]}"
            )
    return res


def get_product(product_id):
    product = dynamo.get_product(product_id)
    images = get_all_images_for_product(product_id)
    if "categories" not in product:
        product["categories"] = []
    for image_id in images:
        if "image_urls" not in product:
            product["image_urls"] = {}
        product["image_urls"][
            image_id
        ] = f"https://froodom-frontend.s3.eu-west-2.amazonaws.com/{image_id}"

    if len(images) > 0:
        product["header_image"] = (
            f"https://froodom-frontend.s3.eu-west-2.amazonaws.com/{images[0]}"
        )

    return product


def get_presigned_url_for_product(product_id: str):
    uuid = str(uuid4())

    url = s3.generate_presigned_url(
        "put_object",
        Params={"Bucket": "froodom-frontend", "Key": f"images/{product_id}/{uuid}"},
    )
    return url


def delete_all_products():
    res = dynamo.list_products()
    for product in res["products"]:
        images = get_all_images_for_product(product["id"])
        for image_id in images:
            s3.delete_object(Bucket="froodom-frontend", Key=image_id)
        dynamo.delete_product(product["id"])
    return res
