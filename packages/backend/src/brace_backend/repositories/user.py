from __future__ import annotations

from typing import Any

from sqlalchemy import select

from brace_backend.domain.user import User
from brace_backend.repositories.base import SQLAlchemyRepository


class UserRepository(SQLAlchemyRepository[User]):
    model = User

    async def get_by_telegram_id(self, telegram_id: int) -> User | None:
        stmt = select(User).where(User.telegram_id == telegram_id)
        return await self.session.scalar(stmt)

    async def update_from_payload(self, user: User, payload: dict[str, Any]) -> User:
        user.first_name = payload.get("first_name")
        user.last_name = payload.get("last_name")
        user.username = payload.get("username")
        user.language_code = payload.get("language_code")
        return user
