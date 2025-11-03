from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pipelines.clarification import clarification

router = APIRouter()


@router.post("/chat")
async def create_report(request: Request):
    try:
        body = await request.json()
        messages = body.get("messages")
        page_slug = body.get("pageSlug")

        if not isinstance(messages, list):
            return JSONResponse(
                content={
                    "error": "Invalid message format – expected a list under 'messages'"
                },
                status_code=400,
            )

        print("📄 Page Slug:", page_slug)
        result = await clarification(messages, page_slug)
        return result

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
