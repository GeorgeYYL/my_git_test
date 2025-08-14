# backend/app/main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#1)create FastAPI app
app = FastAPI(title="Resume API (minimal)")
#2)configure CORS
cors_env = os.getenv("CORS_ORIGINS", "http://localhost:3000")

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
#3) Loading routes
from app.routers import health  # noqa: E402
app.include_router(health.router, prefix="/api")
