from __future__ import annotations

from typing import Sequence
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from brace_backend.domain.order import Order, OrderItem
from brace_backend.repositories.base import SQLAlchemyRepository


class OrderRepository(SQLAlchemyRepository[Order]):
    model = Order

    def _base_stmt(self):
        return select(Order).options(selectinload(Order.items))

    async def list_for_user(self, user_id: UUID) -> Sequence[Order]:
        stmt = self._base_stmt().where(Order.user_id == user_id).order_by(Order.created_at.desc())
        result = await self.session.scalars(stmt)
        return result.unique().all()

    async def create(self, *, user_id: UUID, status: str = "pending") -> Order:
        order = Order(user_id=user_id, status=status)
        await self.add(order)
        await self.session.flush()
        return order

    async def add_item(
        self,
        order: Order,
        *,
        product_id: UUID,
        size: str,
        quantity: int,
        unit_price: float,
    ) -> OrderItem:
        item = OrderItem(
            order_id=order.id,
            product_id=product_id,
            size=size,
            quantity=quantity,
            unit_price=unit_price,
        )
        self.session.add(item)
        return item
