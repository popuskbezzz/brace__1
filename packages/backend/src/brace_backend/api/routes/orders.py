from fastapi import APIRouter, Depends

from brace_backend.api.deps import get_current_user, get_uow
from brace_backend.db.uow import UnitOfWork
from brace_backend.domain.user import User
from brace_backend.schemas.orders import OrderCollection, OrderCreate, OrderRead
from brace_backend.services.order_service import order_service

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.get("", response_model=OrderCollection)
async def list_orders(
    current_user: User = Depends(get_current_user),
    uow: UnitOfWork = Depends(get_uow),
) -> OrderCollection:
    return await order_service.list_orders(uow, current_user.id)


@router.post("", response_model=OrderRead, status_code=201)
async def create_order(
    payload: OrderCreate,
    current_user: User = Depends(get_current_user),
    uow: UnitOfWork = Depends(get_uow),
) -> OrderRead:
    return await order_service.create_order(uow, user_id=current_user.id, payload=payload)
