from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sandbox import is_code_safe
from tracer import run_with_trace

# FastAPI 앱 생성
app = FastAPI()

# CORS (Cross-Origin Resource Sharing) 설정
# 프론트엔드(Next.js)가 다른 포트에서 실행되므로 3000을 허용해야 함
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 요청 body 구조 정의
class TraceReq(BaseModel):
    code: str
    entry: str | None = None
    args: dict | None = None

# /trace 엔드포인트 정의
@app.post("/trace")
async def trace_endpoint(body: TraceReq):
    # 위험한 코드인지 먼저 검사
    if not is_code_safe(body.code):
        raise HTTPException(400, "Forbidden names in code")
    # 안전하면 코드 실행 및 추적
    return run_with_trace(body.code, body.entry, body.args)
