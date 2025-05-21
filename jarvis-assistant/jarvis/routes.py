from flask import Blueprint, render_template, request, jsonify

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/api/message', methods=['POST'])
def handle_message():
    data = request.json
    user_input = data.get("message", "")

    # Placeholder response logic
    response = f"Hello, you said: {user_input}"

    return jsonify({"response": response})

# get_response
    # speech to text
    # LLM response
    # text to speech