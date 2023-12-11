from fastapi import FastAPI
from pydantic import BaseModel
from botmain import NCbuddy
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

class ChatMessage(BaseModel):
    chatQry: str

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "http://127.0.0.1:8765",
    "http://localhost:8785"
]

NCbud = NCbuddy()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
def chat(message: ChatMessage):
    # Process the message and generate a reply
    # print(message.model_dump_json())
    reply = NCbud.process_chat_message(message.chatQry)
    return {"reply": reply}

def start_server():
    # print('Starting Server...')       

    uvicorn.run(
        "RESTApi:app",
        host="0.0.0.0",
        port=8765,
        log_level="debug",
        reload=True,
    )
    # webbrowser.open("http://127.0.0.1:8765")

if __name__ == "__main__":
    start_server()