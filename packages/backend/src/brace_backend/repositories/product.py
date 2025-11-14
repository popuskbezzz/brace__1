from __future__ import annotations

from typing import Sequence
from uuid import UUID

from sqlalchemy import Select, select
from sqlalchemy.orm import selectinload

from brace_backend.domain.product import Product
from brace_backend.repositories.base import SQLAlchemyRepository


class ProductRepository(SQLAlchemyRepository[Product]):
    model = Product

    def _base_stmt(self) -> Select[tuple[Product]]:
        return select(Product).options(selectinload(Product.variants))

    async def list_products(self, *, offset: int, limit: int) -> Sequence[Product]:
        stmt = self._base_stmt().offset(offset).limit(limit).order_by(Product.created_at.desc())
        result = await self.session.scalars(stmt)
        return result.unique().all()

    async def get_with_variants(self, product_id: UUID) -> Product | None:
        stmt = self._base_stmt().where(Product.id == product_id)
        result = await self.session.scalars(stmt)
        return result.unique().one_or_none()
