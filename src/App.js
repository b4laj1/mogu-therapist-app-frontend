import React, { useState } from 'react';
import { sendMessageToAI } from './services/api'; 
import './App.css';


const App = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return; 

        const userMessage = { sender: 'user', text: message };
        setChat((prevChat) => [...prevChat, userMessage]); 

        setIsTyping(true);

        try {
           
            const botResponse = await sendMessageToAI(message);

            const botMessage = { sender: 'bot', text: botResponse };
            setChat((prevChat) => [...prevChat, botMessage]); 
        } catch (error) {
            setChat((prevChat) => [
                ...prevChat,
                { sender: 'bot', text: 'Something went wrong. Please try again.' },
            ]);
        } finally {
            setIsTyping(false); 
            setMessage('');
        }
    };

    return (
        <div className="app-container">
            <div className="chat-box">
                
                {chat.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                        <div className={`${msg.sender}-avatar`}>
                            {msg.sender === 'user' ? 'U' : <img className="bot-avatar" src="src\assets\cat-hi.gif" alt="bot-avatar" />}
                        </div>
                        <div className="message-text">
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}

                
                {isTyping && (
                    <div className="bot-message">
                        <div className="bot-avatar">
                            <img src="src\assets\cat-hi.gif" alt="bot-avatar" />
                        </div>
                        <div className="typing-indicator"></div>
                    </div>
                )}
            </div>

            <div className="input-box">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}><i className="fas fa-paper-plane"></i></button>
            </div>
        </div>
    );
};

export default App;
