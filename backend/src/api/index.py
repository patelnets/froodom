from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from api.product.views import router

app = FastAPI()

origins = [
    "https://froodom-frontend.vercel.app",
    "https://froodom.org",
    "https://www.froodom.org",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def get_root():
    return {"message": "Hello World"}


app.include_router(router)

handler = Mangum(app)
