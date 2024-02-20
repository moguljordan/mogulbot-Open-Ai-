from flask import Flask, request, jsonify, render_template  # Added render_template
from dotenv import load_dotenv
import os
from flask_cors import CORS

from openai import OpenAI, completions
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Configure logging
logging.basicConfig(level=logging.INFO)

# API endpoint to send messages
@app.route('/sendMessage', methods=['POST'])
def send_message():
    try:
        # Get user message from request
        data = request.json
        user_message = data['message']
        logging.info(f"Received message: {user_message}")

        # Call OpenAI API
        chat_completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": user_message}
            ]
        )

        # Get response from OpenAI
        response_message = chat_completion.choices[0].message.content
        return jsonify({"response": response_message})

    except Exception as e:
        # Log and return any errors
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Route for serving the main HTML page
@app.route('/') 
def index():
    return render_template('index.html')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
