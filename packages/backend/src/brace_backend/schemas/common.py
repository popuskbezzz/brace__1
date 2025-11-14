from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field


class Pagination(BaseModel):
    limit: int = Field(default=20, ge=1, le=100)
    offset: int = Field(default=0, ge=0)


class PageMeta(BaseModel):
    limit: int
    offset: int
    total: int | None = None


class InitDataPayload(BaseModel):
    init_data: str


T = TypeVar("T")


class ListResponse(BaseModel, Generic[T]):
    data: list[T]
    meta: PageMeta | None = None


class ResourceResponse(BaseModel, Generic[T]):
    data: T
    meta: dict[str, Any] | None = None
