# backend/app/main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Resume API (minimal)")

cors_env = os.getenv("CORS_ORIGINS", "http://localhost:3000")
# 若用户误设成列表或其他类型，也强制转成字符串再 split
if not isinstance(cors_env, str):
    cors_env = str(cors_env)

allow_origins = [o.strip() for o in cors_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"ok": True}
