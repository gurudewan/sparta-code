from enum import Enum
from pydantic import BaseModel, Field
import uuid
from datetime import datetime

class Commodity(str, Enum):
    GOLD = "Gold"
    OIL = "Oil"
    SILVER = "Silver"

class TradeInput(BaseModel):
    commodity: Commodity
    traderId: str
    price: float
    quantity: float

class Trade(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    commodity: Commodity
    traderId: str
    price: float
    quantity: float
    volume: float
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())