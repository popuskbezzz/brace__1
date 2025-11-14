from __future__ import annotations

import asyncio
import os
import sys
import tempfile
from collections.abc import AsyncIterator
from pathlib import Path

import pytest
from pytest_factoryboy import register
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from brace_backend.db.uow import UnitOfWork
from brace_backend.domain.base import Base
from tests.factories import (
    CartItemFactory,
    OrderFactory,
    OrderItemFactory,
    ProductFactory,
    ProductVariantFactory,
    UserFactory,
)

register(UserFactory)
register(ProductFactory)
register(ProductVariantFactory)
register(CartItemFactory)
register(OrderFactory)
register(OrderItemFactory)

if os.name == "posix":
    fallback_tmp = "/tmp"
    windows_tmp = os.environ.get("TMP", "")
    if windows_tmp.startswith("/mnt/") and os.path.isdir(fallback_tmp):
        os.environ["TMP"] = os.environ["TEMP"] = os.environ["TMPDIR"] = fallback_tmp
        tempfile.tempdir = fallback_tmp

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.append(str(SRC))


@pytest.fixture(scope="session")
async def async_engine():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", future=True)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    await engine.dispose()


@pytest.fixture
def session_factory(async_engine):
    return async_sessionmaker(bind=async_engine, expire_on_commit=False, class_=AsyncSession)


@pytest.fixture
async def session(session_factory) -> AsyncIterator[AsyncSession]:
    async with session_factory() as session:
        try:
            yield session
        finally:
            if session.in_transaction():
                await session.rollback()


@pytest.fixture
async def uow(session: AsyncSession) -> UnitOfWork:
    return UnitOfWork(session)
