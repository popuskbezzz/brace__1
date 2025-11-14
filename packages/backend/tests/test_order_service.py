import pytest

from brace_backend.core.exceptions import ValidationError
from brace_backend.schemas.cart import CartItemCreate
from brace_backend.schemas.orders import OrderCreate
from brace_backend.services.cart_service import cart_service
from brace_backend.services.order_service import order_service


@pytest.mark.asyncio
async def test_create_order_consumes_cart(
    uow, session, user_factory, product_factory, product_variant_factory
):
    user = user_factory()
    product = product_factory()
    variant = product_variant_factory(product=product, size="S")
    product.variants.append(variant)
    session.add_all([user, product])
    await session.flush()

    await cart_service.add_item(
        uow,
        user_id=user.id,
        payload=CartItemCreate(product_id=product.id, size="S", quantity=2),
    )

    created = await order_service.create_order(uow, user_id=user.id, payload=OrderCreate())
    assert created.total_amount == pytest.approx(variant.price * 2)
    assert len(created.items) == 1

    orders = await order_service.list_orders(uow, user.id)
    assert len(orders.items) == 1

    cart = await cart_service.get_cart(uow, user.id)
    assert cart.total_amount == 0


@pytest.mark.asyncio
async def test_create_order_requires_items(uow, user_factory):
    user = user_factory()
    with pytest.raises(ValidationError):
        await order_service.create_order(uow, user_id=user.id, payload=OrderCreate())
