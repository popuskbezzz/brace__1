from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class CartItemCreate(BaseModel):
    product_id: UUID
    size: str
    quantity: int = Field(default=1, ge=1, le=10)


class CartItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    product_id: UUID
    product_name: str
    size: str
    quantity: int
    unit_price: float
    hero_media_url: str | None = None


class CartCollection(BaseModel):
    items: list[CartItemRead]
    total_amount: float
