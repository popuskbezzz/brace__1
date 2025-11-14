from __future__ import annotations

from typing import Generic, TypeVar

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from brace_backend.domain.base import BaseModel

ModelT = TypeVar("ModelT", bound=BaseModel)


class SQLAlchemyRepository(Generic[ModelT]):
    """Base class for typed repositories that wrap SQLAlchemy sessions."""

    model: type[ModelT]

    def __init__(self, session: AsyncSession) -> None:
        if not hasattr(self, "model"):
            raise ValueError("Repository subclasses must define 'model'")
        self.session = session

    async def get(self, entity_id) -> ModelT | None:
        return await self.session.get(self.model, entity_id)

    async def list(self, *, offset: int = 0, limit: int = 100) -> list[ModelT]:
        stmt = select(self.model).offset(offset).limit(limit)
        result = await self.session.scalars(stmt)
        return result.unique().all()

    async def add(self, instance: ModelT) -> ModelT:
        self.session.add(instance)
        return instance

    async def delete(self, instance: ModelT) -> None:
        await self.session.delete(instance)
