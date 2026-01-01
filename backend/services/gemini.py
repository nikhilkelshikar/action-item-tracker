import google.generativeai as genai
import os
from typing import List

# Configure Gemini
# Use GEMINI_API_KEY environment variable
api_key = os.environ.get("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    print("Warning: GEMINI_API_KEY not found in environment variables")

def summarize_items(items: List[dict]) -> str:
    if not api_key:
        return "Gemini API Key not configured. Unable to summarize."
    
    if not items:
        return "No new items to summarize."

    model = genai.GenerativeModel('gemini-2.0-flash')
    
    prompt = "Here are the new action items:\n"
    for item in items:
        prompt += f"- Title: {item.get('title')}, Summary: {item.get('summary')}, Priority: {item.get('priority')}\n"
    
    prompt += "\nPlease provide a concise summary of these action items and highlight the key updates that need to be done."
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating summary: {e}")
        return "Error occurred while generating summary."
