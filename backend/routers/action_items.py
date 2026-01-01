from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
from models import ActionItem, ActionItemCreate, ActionItemUpdate
from services import firestore as db_service
from services import gemini as ai_service
from datetime import datetime


router = APIRouter(
    prefix="/action-items",
    tags=["action-items"]
)

@router.post("/", response_model=ActionItem)
def create_action_item(item: ActionItemCreate):
    try:
        # Pydantic model handles most defaults, but we need to convert to dict for Firestore
        item_dict = item.model_dump()
        
        # Override constructed values if needed or just trust Pydantic
        # Note: 'assigned_to' default logic is in Firestore service or could be here
        # Let's put business logic here for explicit control
        if not item_dict.get("assigned_to"):
             item_dict["assigned_to"] = item_dict.get("created_by_name")
             item_dict["assigned_to_email"] = item_dict.get("created_by_email")
        
        # Firestore expects naive or timezone aware, let's stick to standard handling
        # Add created_time if not in input (it won't be in Create model usually, but let's check)
        item_dict["created_time"] = datetime.utcnow()
        
        doc_id = db_service.create_action_item(item_dict)
        
        # Fetch back to return full object including ID
        created_item = db_service.get_action_item(doc_id)
        if not created_item:
            raise HTTPException(status_code=500, detail="Failed to retrieve created item")
            
        return created_item
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[ActionItem])
def read_action_items():
    try:
        return db_service.get_action_items()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{item_id}", response_model=ActionItem)
def update_action_item(item_id: str, updates: ActionItemUpdate):
    try:
        # Filter out None values
        update_data = updates.model_dump(exclude_unset=True)
        
        if not update_data:
             raise HTTPException(status_code=400, detail="No updates provided")
        
        # Ensure updated_by is provided if it's a real update interaction
        # The prompt says: "Updated_by can be blank if its a new record, when editing an item update this field with the email address of the user making an update"
        # The frontend should send this, but we can enforce or check here.
        # For now, we trust the input.
        
        success = db_service.update_action_item(item_id, update_data)
        if not success:
            raise HTTPException(status_code=404, detail="Item not found")
            
        updated_item = db_service.get_action_item(item_id)
        return updated_item
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/summarize")
def summarize_new_items():
    try:
        new_items = db_service.get_new_action_items()
        summary = ai_service.summarize_items(new_items)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
