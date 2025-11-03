from typing import List, Optional

from pydantic import BaseModel


class ResearchResult(BaseModel):
    value: Optional[str]
    currency: Optional[str]
    url: str
    snippet: str
    year: str
    is_estimated: bool
