from fastapi import FastAPI, Query, HTTPException, status
import uvicorn
from typing import List, Dict
from pydantic import ValidationError
from collections import defaultdict
import json
import uuid
from openai import OpenAI
from app.config import settings
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse

client = OpenAI(api_key=settings.openai_api_key)

from app.models import Trade, TradeInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

trades: List[Trade] = []
# simple, in memory storage for now

@app.get("/trades")
async def get_trades(page: int = Query(1, ge=1), size: int = Query(10, ge=1)):
    total = len(trades)
    start = (page - 1) * size
    end = start + size
    paginated_trades = trades[start:end] # slicing is safe, so no further checks

    return {"trades": paginated_trades, "total": total}

@app.post("/trades", status_code=status.HTTP_201_CREATED)
async def post_trades(new_trade: TradeInput):
    volume = new_trade.quantity * new_trade.price
    trades.append(Trade(**new_trade.dict(), volume=volume))
    return

@app.delete("/trades", status_code=status.HTTP_204_NO_CONTENT)
async def delete_trades():
    trades.clear()
    return

@app.get("/insights")
async def get_insights():
    total_volume = defaultdict(float)
    price_sum = defaultdict(float)
    count = defaultdict(int)
    trader_volume = defaultdict(float)

    for t in trades:
        total_volume[t.commodity] += t.quantity * t.price
        price_sum[t.commodity] += t.price
        count[t.commodity] += 1
        trader_volume[t.traderId] += t.quantity * t.price

    average_price = {k: (price_sum[k] / count[k] if count[k] > 0 else 0) for k in price_sum}

    top_traders = sorted(
        [{"traderId": k, "volume": v} for k, v in trader_volume.items()],
        key=lambda x: x["volume"], reverse=True,
    )
    return {
        "totalVolumeByCommodity": dict(total_volume),
        "averagePriceByCommodity": average_price,
        "topTradersByVolume": top_traders,
    }

@app.get("/ai-insights")
async def get_ai_insights(question: str):
    data = [t.dict() for t in trades]
    prompt = (
        f"Here is the trades data:\n{json.dumps(data, indent=2)}\n"
        f"Please answer the following question based on this data:\n{question}"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful data analyst."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=300,
        temperature=0.7,
        stream=True
    )
    def stream_answer():
        for chunk in response:
            content = chunk.choices[0].delta.get("content")
            if content:
                yield content
    return StreamingResponse(stream_answer(), media_type="text/plain")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)