from typing import List, Optional

from pydantic import BaseModel


class NewsPaper(BaseModel):
    source: str
    title: str
    snippet: str
    url: str
