import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ChatWindow() {
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [speechEnabled, setSpeechEnabled] = useState(true);
    const messagesEndRef = useRef(null);
    const audioRef = useRef(null);

    const appendMessage = (text, from) => {
        setMessages(prev => [...prev, { text, from }]);
        if (from === 'bot' && speechEnabled) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
    };

    const handleSend = async () => {
        const text = inputText.trim();
        if (text) {
            appendMessage(text, 'user');

            try {                
                const response = await axios.post('http://localhost:5000/api/get-response',
                    {
                        message: text,
                        audio: true
                    }
                );
                console.log(response.data.text);
                const audio = new Audio(response.data.audioUrl);
                audioRef.current = audio;
                audio.play();
                appendMessage('Audio playing...', 'bot');

                setTimeout(() => appendMessage(response.data.text, 'bot'), 500);
                
            } catch (error) {
                console.error('Error sending message:', error); 
            }

            setInputText('');
        }
    };

    const handleMic = () => {
        if (window.recognition) window.recognition.start();
    };

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                appendMessage(transcript, 'user');
            };
            window.recognition = recognition;
        } else {
            window.recognition = null;
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col max-w-3xl mx-auto h-[80vh] bg-blue-200 shadow-lg rounded-lg overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded-md max-w-xs ${msg.from === 'user' ? 'bg-orange-200 self-end' : 'bg-gray-200 self-start'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-orange-100 flex items-center space-x-2">
                <img
                    src="/nyan-cat.avif"
                    alt="Hologram"
                    className="w-12 h-12"
                />
                <input
                    type="text"
                    className="flex-1 p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                    Send
                </button>
                <button
                    onClick={handleMic}
                    disabled={!window.recognition}
                    className="bg-orange-400 text-white px-3 py-2 rounded hover:bg-orange-500"
                >
                    🎤
                </button>
                <label className="flex items-center space-x-1 text-sm">
                    <input
                        type="checkbox"
                        checked={speechEnabled}
                        onChange={(e) => setSpeechEnabled(e.target.checked)}
                    />
                    <span>Voice</span>
                </label>
            </div>
        </div>
    );
}

export default ChatWindow;