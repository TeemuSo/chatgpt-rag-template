from typing import List
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from approaches.vanilla import VanillaApproach
from approaches.call_functions import CallFunctionApproach
from fastapi.middleware.cors import CORSMiddleware

import logging
import uvicorn
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    history: List[dict]
    approach: str


origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

templates = Jinja2Templates(directory="./templates")

app.mount("/static", StaticFiles(directory="./static/assets/"), name="static")

@app.get("/")
async def serve_spa(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
async def chat(request: ChatRequest):
    print("NIGGA!")
    try:
        # impl = VanillaApproach()
        # impl = FormulateThenRetrieveApproach()
        impl = CallFunctionApproach()
        if not impl:
            return JSONResponse(content={"error": "unknown approach"}, status_code=400)
        r = await impl.run(await request.json()["history"])
        return JSONResponse(content=r)
    except Exception as e:
        logging.exception("Exception in /chat")
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", reload=True, port=8000)