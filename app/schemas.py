from pydantic import BaseModel

class QuestionRequest(BaseModel):
    name: str
    question: str
