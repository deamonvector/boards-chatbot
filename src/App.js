import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const initialMessages = [
      { message: "Welcome to the Message Boards Bot!", type: 'bot' },
      { message: "How can I assist you today?", type: 'bot' }
    ];
    useEffect(() => {
        setChatHistory(initialMessages);
    }, []);

    const sendMessage = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('message', message);

            const response = await axios.post('http://localhost:5000/message', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            setChatHistory([...chatHistory, { message: message+"/n"+response.data, type: 'bot' }]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

    const clearMessages = () => {
        setChatHistory([]);
        setChatHistory(initialMessages);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)' }}>
            <div style={{ maxWidth: '600px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', background: 'white' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Message Boards Bot</h1>
                <div>
                    {chatHistory.map((chat, index) => (
                        <p key={index}>{chat.type}: {chat.message}</p>
                    ))}
                </div>
                <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={sendMessage} style={{ width: '48%', padding: '10px', borderRadius: '5px', border: 'none', background: '#4CAF50', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Send</button>
                    <button onClick={clearMessages} style={{ width: '48%', padding: '10px', borderRadius: '5px', border: 'none', background: '#f44336', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Clear</button>
                </div>
            </div>
        </div>
    );
}

export default App;
