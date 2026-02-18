import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

PROMPT = """
You are a support ticket classifier.
Classify the ticket into:
category: billing, technical, account, general
priority: low, medium, high, critical
Return JSON only.
"""

def classify_ticket(description):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": PROMPT},
                {"role": "user", "content": description}
            ]
        )
        return eval(response.choices[0].message.content)
    except Exception:
        return {"category": "general", "priority": "low"}
