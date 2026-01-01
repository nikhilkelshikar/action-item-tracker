from google.cloud import firestore
from datetime import datetime
from typing import List, Optional
import os

# Initialize Firestore client
# Assuming GOOGLE_APPLICATION_CREDENTIALS is set or running in an environment with default credentials
try:
    db = firestore.Client()
except Exception as e:
    print(f"Warning: Could not initialize Firestore client: {e}")
    db = None

COLLECTION_NAME = "action_items"

def get_db():
    return db

def create_action_item(data: dict) -> str:
    if not db:
        raise Exception("Firestore not initialized")
    
    # Ensure timestamps are set logically if not provided (though models handle this mostly)
    if "created_time" not in data:
        data["created_time"] = datetime.utcnow()
    
    # Assign defaults if missing (double check, though Pydantic sets defaults)
    if not data.get("assigned_to"):
        data["assigned_to"] = data.get("created_by_name")
        
    update_time, doc_ref = db.collection(COLLECTION_NAME).add(data)
    return doc_ref.id

def get_action_items() -> List[dict]:
    if not db:
        raise Exception("Firestore not initialized")
    
    docs = db.collection(COLLECTION_NAME).stream()
    items = []
    for doc in docs:
        item = doc.to_dict()
        item["id"] = doc.id
        items.append(item)
    return items

def get_action_item(item_id: str) -> Optional[dict]:
    if not db:
        raise Exception("Firestore not initialized")
    
    doc = db.collection(COLLECTION_NAME).document(item_id).get()
    if doc.exists:
        item = doc.to_dict()
        item["id"] = doc.id
        return item
    return None

def update_action_item(item_id: str, updates: dict) -> bool:
    if not db:
        raise Exception("Firestore not initialized")
    
    doc_ref = db.collection(COLLECTION_NAME).document(item_id)
    doc = doc_ref.get()
    if not doc.exists:
        return False
    
    updates["updated_time"] = datetime.utcnow()
    doc_ref.update(updates)
    return True

def get_new_action_items() -> List[dict]:
    if not db:
        raise Exception("Firestore not initialized")
    
    query = db.collection(COLLECTION_NAME).where("status", "==", "New")
    docs = query.stream()
    items = []
    for doc in docs:
        item = doc.to_dict()
        item["id"] = doc.id
        items.append(item)
    return items
