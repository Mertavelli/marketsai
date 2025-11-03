import logging

from buyout_cdd.flow import CDDFlow
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@router.post("/buyout-cdd")
async def start_buyout_cdd(request: Request):
    try:
        messages = await request.json()

        if not isinstance(messages, list):
            return JSONResponse(
                content={"error": "Invalid message format – expected a list"},
                status_code=400,
            )

        # 🔵 Logge die empfangenen Messages
        logger.info(f"Received messages: {messages}")

        result = await CDDFlow().kickoff_async(inputs={"messages": messages})

        return result

    except Exception as e:
        logger.error(f"Error in /buyout-cdd: {str(e)}", exc_info=True)
        return JSONResponse(content={"error": str(e)}, status_code=500)
