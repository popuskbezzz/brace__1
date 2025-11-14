from fastapi import APIRouter, Depends

from brace_backend.api.deps import get_current_user
from brace_backend.domain.user import User
from brace_backend.schemas.common import ResourceResponse
from brace_backend.schemas.users import UserProfile

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=ResourceResponse[UserProfile])
async def get_me(current_user: User = Depends(get_current_user)) -> ResourceResponse[UserProfile]:
    profile = UserProfile.model_validate(current_user)
    return ResourceResponse[UserProfile](data=profile)
