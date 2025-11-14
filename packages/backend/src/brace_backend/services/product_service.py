from __future__ import annotations

from uuid import UUID

from brace_backend.core.exceptions import NotFoundError
from brace_backend.db.uow import UnitOfWork
from brace_backend.domain.product import Product
from brace_backend.schemas.common import ListResponse, PageMeta, Pagination, ResourceResponse
from brace_backend.schemas.products import ProductRead


class ProductService:
    async def list_products(
        self, uow: UnitOfWork, pagination: Pagination
    ) -> ListResponse[ProductRead]:
        products = await uow.products.list_products(
            offset=pagination.offset, limit=pagination.limit
        )
        return ListResponse[ProductRead](
            data=[self._to_schema(product) for product in products],
            meta=PageMeta(limit=pagination.limit, offset=pagination.offset),
        )

    async def get_product(
        self, uow: UnitOfWork, product_id: UUID
    ) -> ResourceResponse[ProductRead]:
        product = await uow.products.get_with_variants(product_id)
        if not product:
            raise NotFoundError("Product not found.")
        return ResourceResponse[ProductRead](data=self._to_schema(product))

    def _to_schema(self, product: Product) -> ProductRead:
        return ProductRead(
            id=product.id,
            name=product.name,
            description=product.description,
            hero_media_url=product.hero_media_url,
            created_at=product.created_at,
            updated_at=product.updated_at,
            variants=[
                {
                    "id": variant.id,
                    "size": variant.size,
                    "price": float(variant.price),
                    "stock": variant.stock,
                }
                for variant in product.variants
            ],
        )


product_service = ProductService()

__all__ = ["product_service", "ProductService"]
