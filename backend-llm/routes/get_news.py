import logging

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pipelines.get_news import get_news

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/get-news")
async def get_news_route(request: Request):
    try:
        messages = await request.json()  # direkt das Array
        logger.info(f"📥 Eingehende Nachrichten für /get-news: {messages}")

        result = await get_news(messages)
        return result

    except Exception as e:
        logger.error(f"❌ Fehler bei /get-news: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
