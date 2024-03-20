from typing import Optional

from pydantic import BaseModel


class ProductResponse(BaseModel):
    id: str
    name: str
    stores: list[str]
    images: list[str]
    image_urls: dict[str, str] = {}
    categories: list[str]
    header_image: str = None


class CreatePayload(BaseModel):
    name: str
    stores: list[str]
    categories: list[str]


class UpdatePayload(BaseModel):
    name: Optional[str]
    stores: Optional[list[str]]
    categories: Optional[list[str]]


class ProductsListResponse(BaseModel):
    products: list[ProductResponse]
    next_token: str = None


class ProductsBulkUploadRequest(BaseModel):
    products: list[CreatePayload]
