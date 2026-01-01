from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from routers import action_items

app = FastAPI(title="Action Item Minder API")

app.include_router(action_items.router)


# Configure CORS
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",
    "*" # For development convenience, refine in production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Action Item Minder API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
