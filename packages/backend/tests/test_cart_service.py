import pytest

from brace_backend.core.exceptions import NotFoundError, ValidationError
from brace_backend.schemas.cart import CartItemCreate
from brace_backend.services.cart_service import cart_service


@pytest.mark.asyncio
async def test_add_item_merges_existing(uow, session, user_factory, product_factory, product_variant_factory):
    user = user_factory()
    product = product_factory()
    variant = product_variant_factory(product=product, size="M")
    product.variants.append(variant)
    session.add_all([user, product])
    await session.flush()

    payload = CartItemCreate(product_id=product.id, size="M", quantity=1)
    await cart_service.add_item(uow, user_id=user.id, payload=payload)
    added = await cart_service.add_item(uow, user_id=user.id, payload=payload)

    assert added.quantity == 2


@pytest.mark.asyncio
async def test_get_cart_returns_total(uow, session, user_factory, product_factory, product_variant_factory):
    user = user_factory()
    product = product_factory()
    variant = product_variant_factory(product=product, size="L")
    product.variants.append(variant)
    session.add_all([user, product])
    await session.flush()

    payload = CartItemCreate(product_id=product.id, size="L", quantity=3)
    await cart_service.add_item(uow, user_id=user.id, payload=payload)

    cart = await cart_service.get_cart(uow, user.id)

    assert cart.total_amount == pytest.approx(variant.price * 3)
    assert cart.items[0].product_name == product.name


@pytest.mark.asyncio
async def test_remove_item_raises_for_missing(uow, user_factory):
    user = user_factory()
    with pytest.raises(NotFoundError):
        await cart_service.remove_item(uow, user_id=user.id, item_id=user.id)


@pytest.mark.asyncio
async def test_add_item_validates_variant(uow, session, user_factory, product_factory):
    user = user_factory()
    product = product_factory()
    session.add_all([user, product])
    await session.flush()

    payload = CartItemCreate(product_id=product.id, size="XXL", quantity=1)
    with pytest.raises(ValidationError):
        await cart_service.add_item(uow, user_id=user.id, payload=payload)
