from __future__ import annotations

from typing import Any


class AppError(Exception):
    status_code = 400
    code = "app_error"

    def __init__(self, message: str | None = None, *, detail: dict[str, Any] | None = None) -> None:
        self.message = message or "Application error"
        self.detail = detail or {}
        super().__init__(self.message)

    def to_payload(self) -> dict[str, Any]:
        return {"code": self.code, "title": self.message, "detail": self.detail or None}


class NotFoundError(AppError):
    status_code = 404
    code = "not_found"


class ValidationError(AppError):
    status_code = 422
    code = "validation_error"


class AccessDeniedError(AppError):
    status_code = 403
    code = "access_denied"


class ConflictError(AppError):
    status_code = 409
    code = "conflict_error"


class ServiceError(AppError):
    status_code = 500
    code = "service_error"


__all__ = [
    "AccessDeniedError",
    "AppError",
    "ConflictError",
    "NotFoundError",
    "ServiceError",
    "ValidationError",
]
