from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["health"])

# GET /api/health
@router.get("/health")
def health():
    return {"ok": True}

# GET /api/version
@router.get("/version")
def version():
    return {"service": "ai-resume", "version": "0.1.0"}

# POST /api/echo
class EchoIn(BaseModel):
    msg: str

@router.post("/echo")
def echo(body: EchoIn):
    return {"echo": body.msg}
