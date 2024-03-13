import boto3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from api.lib import dynamo
from api.lib.dynamo import ProductNotFoundError
from api.models import models
from api.services.products import delete_all_products as delete_all_products_service
from api.services.products import (
    get_presigned_url_for_product,
    get_product,
    get_products,
)

app = FastAPI()

origins = [
    "https://froodom-frontend.vercel.app",
    "https://froodom.org",
    "https://www.froodom.org",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

s3 = boto3.client("s3")


@app.get("/")
def get_root():
    return {"message": "Hello World"}


@app.get("/products", response_model=models.ProductsListResponse)
def list_products(next_token: str = None):
    products = get_products(next_token=next_token)
    return products


@app.post("/products", status_code=201, response_model=models.ProductResponse)
def post_product(payload: models.CreatePayload):
    res = dynamo.create_product(stores=payload.stores, name=payload.name)
    return res


@app.get("/products/{product_id}", response_model=models.ProductResponse)
def get_product_route(product_id: str):
    try:
        return get_product(product_id)
    except dynamo.ProductNotFoundError as err:
        raise HTTPException(status_code=404, detail="Product not found") from err
    except Exception as err:
        print(err)
        raise HTTPException(status_code=500, detail="Something went wrong") from err


@app.patch("/products/{product_id}")
def update_product(product_id: str, payload: models.UpdatePayload):
    try:
        dynamo.update_product(
            product_id=product_id,
            stores=payload.stores,
            name=payload.name,
        )
    except dynamo.ProductNotFoundError as err:
        raise HTTPException(status_code=404, detail="Product not found") from err


@app.delete("/products/{product_id}", status_code=200)
def delete_product(product_id: str):
    try:
        # delete all the images from s3
        product = get_product(product_id)
        for image_id in product["images"]:
            s3.delete_object(Bucket="froodom-frontend", Key=image_id)
        dynamo.delete_product(product_id)

    except dynamo.ProductNotFoundError as err:
        raise HTTPException(status_code=404, detail="Product not found") from err


@app.get("/products/{product_id}/image-upload-pre-signed-url")
def upload_pre_signed(product_id: str):
    try:
        url = get_presigned_url_for_product(product_id)

    except Exception as err:
        raise HTTPException(status_code=500, detail="Something went wrong") from err

    return {"url": url}


@app.delete("/products/all/force", status_code=200)
def delete_all_products():
    delete_all_products_service()


@app.post("/products/bulk", status_code=201)
def bulk_upload(payload: models.ProductsBulkUploadRequest):
    try:
        for product in payload.products:
            try:
                existing_products = dynamo.get_products_by_name(product.name)
                if len(existing_products) > 1:
                    raise HTTPException(
                        status_code=500,
                        detail="There are more than one products with the same name",
                    )
                if len(existing_products) == 0:
                    raise ProductNotFoundError
                dynamo.update_product(
                    product_id=existing_products[0]["id"],
                    stores=product.stores,
                    name=product.name,
                )
            except dynamo.ProductNotFoundError:
                dynamo.create_product(stores=product.stores, name=product.name)

    except Exception as err:
        print(err)
        raise HTTPException(status_code=500, detail="Something went wrong") from err

    return {"message": f"Successfully added {len(payload.products)} products"}


handler = Mangum(app)
