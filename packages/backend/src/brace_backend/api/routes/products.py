from uuid import UUID

from fastapi import APIRouter, Depends

from brace_backend.api.deps import get_uow
from brace_backend.db.uow import UnitOfWork
from brace_backend.schemas.common import ListResponse, Pagination, ResourceResponse
from brace_backend.schemas.products import ProductRead
from brace_backend.services.product_service import product_service

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=ListResponse[ProductRead])
async def list_products(
    pagination: Pagination = Depends(),
    uow: UnitOfWork = Depends(get_uow),
) -> ListResponse[ProductRead]:
    return await product_service.list_products(uow, pagination)


@router.get("/{product_id}", response_model=ResourceResponse[ProductRead])
async def get_product(
    product_id: UUID,
    uow: UnitOfWork = Depends(get_uow),
) -> ResourceResponse[ProductRead]:
    return await product_service.get_product(uow, product_id)
