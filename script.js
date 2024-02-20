document.getElementById('send-button').addEventListener('click', function() {
    var userInput = document.getElementById('user-input');
    var message = userInput.value.trim();

    if (message) {
        // Send AJAX POST request to the Flask backend
        fetch('/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            // Display response in chat box
            var chatBox = document.getElementById('chat-box');
            var userMessage = document.createElement('div');
            var botMessage = document.createElement('div');
            
            userMessage.textContent = "You: " + message;
            botMessage.textContent = "Assistant: " + data.response;
            
            userMessage.style.textAlign = 'right';
            botMessage.style.textAlign = 'left';
            
            chatBox.appendChild(userMessage);
            chatBox.appendChild(botMessage);
            
            // Clear the input field
            userInput.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
