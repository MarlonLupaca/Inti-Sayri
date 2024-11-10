import React, { useState } from 'react';
import ChatHeader from '../components/ChatHeader'; 
import Sliderbar from './Sliderbar';
import Header from './Header';

const ChatUnico = ({ selectedChat, goBack }) => {
    const [messages, setMessages] = useState([
        { user: selectedChat.user, text: selectedChat.lastMessage },
        { user: 'Marlon', text: 'Hola, ¿cómo va todo?' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { user: 'Marlon', text: newMessage }]);
            setNewMessage('');
        }
    };

    return (
        <div className="h-full flex flex-col">
            <Header/>
            <Sliderbar />
            
            
            <main className="flex flex-col h-[100vh]">
                <ChatHeader selectedChat={selectedChat} goBack={goBack} />
                <div className="flex-grow p-4 flex flex-col  bg-white">
                    <div className="flex-grow flex flex-col w-[100%] justify-between items-center h-[100%] ">
                        <div className="w-[100%] h-[100px] flex-grow overflow-y-auto space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.user === 'Marlon' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-lg max-w-xs ${
                                            message.user === 'Marlon' ? 'bg-verdeAzulado text-white' : 'bg-gray-300 text-black'
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-[100%] mt-4 flex items-center space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={handleMessageChange}
                                className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Escribe tu mensaje..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="p-2 bg-verdeAzulado text-white rounded-r-lg"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChatUnico;
