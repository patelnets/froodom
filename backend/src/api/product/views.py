from fastapi import APIRouter, HTTPException

from api.lib import dynamo
from api.product.exceptions import ProductNotFoundError
from api.product.models import (
    CreatePayload,
    ProductResponse,
    ProductsBulkUploadRequest,
    ProductsListResponse,
    UpdatePayload,
)
from api.product.service import (
    delete_all_products,
    delete_by_id,
    get_presigned_url_for_product,
    get_product,
    get_products,
)

router = APIRouter()


@router.get("/products/{product_id}", response_model=ProductResponse)
def get_product_route(product_id: str):
    try:
        return get_product(product_id)
    except ProductNotFoundError as err:
        raise HTTPException(status_code=404, detail="Product not found") from err
    except Exception as err:
        print(err)
        raise HTTPException(status_code=500, detail="Something went wrong") from err


@router.delete("/products/{product_id}", status_code=200)
def delete_product(product_id: str):
    try:
        delete_by_id(product_id=product_id)

    except ProductNotFoundError as err:
        raise HTTPException(status_code=404, detail="Product not found") from err


@router.post("/products", status_code=201, response_model=ProductResponse)
def post_product(payload: CreatePayload):
    res = dynamo.create_product(
        stores=payload.stores, name=payload.name, categories=payload.categories
    )
    return res


@router.get("/products", response_model=ProductsListResponse)
def list_products(next_token: str = None):
    products = get_products(next_token=next_token)
    return products


@router.patch("/products/{product_id}")
def update_product(product_id: str, payload: UpdatePayload):
    try:
        dynamo.update_product(
            product_id=product_id,
            stores=payload.stores,
            name=payload.name,
            categories=payload.categories,
        )
    except ProductNotFoundError as err:
        raise HTTPException(status_code=404, detail="Product not found") from err


@router.get("/products/{product_id}/image-upload-pre-signed-url")
def upload_pre_signed(product_id: str):
    try:
        url = get_presigned_url_for_product(product_id)

    except Exception as err:
        raise HTTPException(status_code=500, detail="Something went wrong") from err

    return {"url": url}


@router.delete("/products/all/force", status_code=200)
def delete_all_products_endpoint():
    delete_all_products()


@router.post("/products/bulk", status_code=201)
def bulk_upload(payload: ProductsBulkUploadRequest):
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
                    categories=product.categories,
                )
            except ProductNotFoundError:
                dynamo.create_product(
                    stores=product.stores,
                    name=product.name,
                    categories=product.categories,
                )

    except Exception as err:
        print(err)
        raise HTTPException(status_code=500, detail="Something went wrong") from err

    return {"message": f"Successfully added {len(payload.products)} products"}
