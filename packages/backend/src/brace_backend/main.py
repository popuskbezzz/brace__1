from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from brace_backend.api import api_router
from brace_backend.core.config import settings
from brace_backend.core.error_handlers import register_exception_handlers
from brace_backend.core.logging import configure_logging
from brace_backend.core.middleware import ObservabilityMiddleware

configure_logging(settings)
limiter = Limiter(key_func=get_remote_address, default_limits=[settings.rate_limit])


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, version="0.2.0")

    # SlowAPI expects limiter on app.state for middleware/exception handlers.
    app.state.limiter = limiter
    app.add_middleware(ObservabilityMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(SlowAPIMiddleware)

    app.include_router(api_router, prefix="/api")
    register_exception_handlers(app)

    @app.exception_handler(RateLimitExceeded)
    async def rate_limit_handler(request: Request, exc: RateLimitExceeded):  # type: ignore[override]
        return limiter._rate_limit_exceeded_handler(request, exc)

    return app


app = create_app()
