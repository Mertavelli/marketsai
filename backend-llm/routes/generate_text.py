import logging

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pipelines.generate_text import generate_text

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/generate-text")
async def create_report(request: Request):
    try:
        message = await request.json()
        user_input = message["input"]

        messages = [{"role": "user", "content": user_input}]
        result = await generate_text(messages)

        messages.append({"role": "system", "content": result})  # 👈 AI-Antwort anhängen

        return messages

    except Exception as e:
        logger.error(f"❌ Fehler bei /generate-text: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
