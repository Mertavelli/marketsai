import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(override=True)
from routes.buyout_cdd import router as buyout_cdd_router
from routes.chat_route import router as chat_router
from routes.generate_text import router as generate_text_router
from routes.get_news import router as get_news_router
from routes.image_key import router as image_key_router
from routes.investment_memo import router as investment_memo_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(investment_memo_router)
app.include_router(generate_text_router)
app.include_router(image_key_router)
app.include_router(get_news_router)
app.include_router(buyout_cdd_router)

# Deaktivieren in Production
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
