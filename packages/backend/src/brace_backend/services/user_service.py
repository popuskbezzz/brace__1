from __future__ import annotations

from brace_backend.core.exceptions import ValidationError
from brace_backend.core.security import TelegramInitData
from brace_backend.db.uow import UnitOfWork
from brace_backend.domain.user import User


class UserService:
    async def sync_from_telegram(self, uow: UnitOfWork, init_data: TelegramInitData) -> User:
        payload = init_data.user
        telegram_id = payload.get("id")
        if telegram_id is None:
            raise ValidationError("Telegram payload is missing the `id` field.")

        user = await uow.users.get_by_telegram_id(int(telegram_id))
        if user:
            await uow.users.update_from_payload(user, payload)
        else:
            user = User(
                telegram_id=int(telegram_id),
                first_name=payload.get("first_name"),
                last_name=payload.get("last_name"),
                username=payload.get("username"),
                language_code=payload.get("language_code"),
            )
            await uow.users.add(user)

        await uow.commit()
        await uow.refresh(user)
        return user


user_service = UserService()

__all__ = ["user_service", "UserService"]
