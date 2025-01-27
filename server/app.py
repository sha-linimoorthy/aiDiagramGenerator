from fastapi import FastAPI, WebSocket, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import time
import logging
from ollama import chat
from concurrent.futures import ThreadPoolExecutor
import uuid
from datetime import datetime

logging.basicConfig(
    filename='server.log', 
    level=logging.DEBUG,    
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'  
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    
@app.post("/generate/diagram")
async def generate_diagram(request: Request):
    try:
        # Parse the JSON request body
        data = await request.json()
        model = data.get("Model")
        input_text = data.get("input")
        syntax_name = data.get("syntaxName")
        syntax_doc = data.get("syntaxDoc")
        selected_template = data.get("selectedTemplate")

        if not all([input_text, syntax_name, syntax_doc, selected_template]):
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Construct the prompt
        formatted_prompt = f"""
        Study this {syntax_name} syntax: {syntax_doc}.
        Using this syntax and the rules of UML, write a {selected_template} diagram based on this text: {input_text}.
        - use different shapes, colors, and icons whenever possible as specified in the syntax.
        - strict rules: do not use notes, return only the code in the specified syntax, do not explain the code or add any other text except the code itself.
        - do not use box for sequence diagrams.
        - do not use brackets inside blocks.
        """

        # Generate the response using the model
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            executor, generate_ollama_response_uml, model, formatted_prompt
        )

        logging.info(f"Processed request for syntax: {syntax_name}")
        logging.info(f"response: {response}")
        return JSONResponse(content={"response": response})

    except Exception as e:
        # Log the error and return a response
        logging.error(f"Error processing /generate/diagram: {str(e)}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, port=5000)

#uvicorn main:app --reload


