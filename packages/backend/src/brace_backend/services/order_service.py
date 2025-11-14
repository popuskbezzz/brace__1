from __future__ import annotations

from decimal import Decimal
from uuid import UUID

from brace_backend.core.exceptions import ValidationError
from brace_backend.db.uow import UnitOfWork
from brace_backend.domain.order import Order
from brace_backend.schemas.orders import OrderCollection, OrderCreate, OrderRead


class OrderService:
    async def list_orders(self, uow: UnitOfWork, user_id: UUID) -> OrderCollection:
        orders = await uow.orders.list_for_user(user_id)
        return OrderCollection(items=[self._to_schema(order) for order in orders])

    async def create_order(
        self,
        uow: UnitOfWork,
        *,
        user_id: UUID,
        payload: OrderCreate,
    ) -> OrderRead:
        cart_items = await uow.carts.get_for_user(user_id)
        if not cart_items:
            raise ValidationError("Cannot create an order with an empty cart.")

        order = await uow.orders.create(user_id=user_id)
        total_amount = Decimal("0.0")

        for item in cart_items:
            line_total = Decimal(item.quantity) * Decimal(item.unit_price)
            total_amount += line_total
            await uow.orders.add_item(
                order,
                product_id=item.product_id,
                size=item.size,
                quantity=item.quantity,
                unit_price=float(item.unit_price),
            )
            await uow.session.delete(item)

        order.total_amount = total_amount
        await uow.commit()
        await uow.session.refresh(order, attribute_names=["items"])
        return self._to_schema(order)

    def _to_schema(self, order: Order) -> OrderRead:
        return OrderRead(
            id=order.id,
            status=order.status,
            total_amount=float(order.total_amount),
            created_at=order.created_at,
            items=[
                {
                    "id": item.id,
                    "product_id": item.product_id,
                    "size": item.size,
                    "quantity": item.quantity,
                    "unit_price": float(item.unit_price),
                }
                for item in order.items
            ],
        )


order_service = OrderService()

__all__ = ["order_service", "OrderService"]
