import logging

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pipelines.image_key import image_key

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/image-key")
async def create_report(request: Request):
    try:
        message = await request.json()
        title = message["title"]
        desciption = message["description"]

        user_input = "Title: " + title + " " + "Description: " + desciption

        messages = [{"role": "user", "content": user_input}]
        result = await image_key(messages)

        messages.append({"role": "system", "content": result})

        return messages

    except Exception as e:
        logger.error(f"❌ Fehler bei /image-key: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
