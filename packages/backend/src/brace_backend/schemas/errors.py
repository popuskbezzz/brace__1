from typing import Any

from pydantic import BaseModel, Field


class ErrorObject(BaseModel):
    status: int = Field(..., ge=100, le=599)
    code: str
    title: str
    detail: str | None = None
    trace_id: str | None = None
    meta: dict[str, Any] | None = None


class ErrorResponse(BaseModel):
    errors: list[ErrorObject]
