from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv('XAI_API_KEY'),
    base_url="https://api.x.ai/v1"
)

def get_ai_insights(health_record):
    try:
        prompt = f"""
        Analyze this pet health data and provide insights:
        Weight: {health_record.weight}
        Activity Level: {health_record.activity_level}
        Diet Notes: {health_record.diet_notes}
        Hydration: {health_record.hydration}
        Symptoms: {health_record.symptoms}
        Behavioral Notes: {health_record.behavioral_notes}
        """
        
        completion = client.chat.completions.create(
            model="grok-2-latest",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        return completion.choices[0].message.content
    except Exception as e:
        return "Unable to generate insights at this time."