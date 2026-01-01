from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from datetime import datetime

class ActionItemBase(BaseModel):
    assigned_to: Optional[str] = None
    assigned_to_email: Optional[EmailStr] = None
    created_by_email: EmailStr
    created_by_name: str
    status: Literal["New", "Complete", "Pending", "Discard"] = "New"
    summary: str
    context: Optional[str] = None
    title: str
    priority: Literal["P0", "P1", "P2"] = "P1"

class ActionItemCreate(ActionItemBase):
    pass

class ActionItemUpdate(BaseModel):
    assigned_to: Optional[str] = None
    assigned_to_email: Optional[EmailStr] = None
    status: Optional[Literal["New", "Complete", "Pending", "Discard"]] = None
    summary: Optional[str] = None
    context: Optional[str] = None
    title: Optional[str] = None
    updated_by: Optional[EmailStr] = None
    priority: Optional[Literal["P0", "P1", "P2"]] = None

class ActionItem(ActionItemBase):
    id: str
    created_time: datetime
    updated_by: Optional[EmailStr] = None
    updated_time: Optional[datetime] = None

    class Config:
        from_attributes = True
