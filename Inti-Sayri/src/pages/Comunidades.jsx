import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { toast } from 'react-toastify';
import Sliderbar from '../components/Sliderbar';
import Header from '../components/Header';
import ChatUnico from '../components/ChatUnico';

const Comunidades = () => {
    const { nombreUsuario } = useGlobalContext(); 
    const [chats, setChats] = useState([]); 
    const [searchText, setSearchText] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChat, setNewChat] = useState({ title: '' });

    useEffect(() => {
        
        const fetchCommunities = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/communities/by-user/${nombreUsuario}`);
                const data = await response.json();
                if (response.ok) {
                    
                    const communities = data.map(community => ({
                        id: community.id,
                        user: community.title,  
                        lastMessage: '', 
                        time: 'Justo ahora' 
                    }));
                    setChats(communities);
                } else {
                    throw new Error('Error al obtener las comunidades');
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        if (nombreUsuario) {
            fetchCommunities();
        }
    }, [nombreUsuario]);

    const handleChatClick = (chat) => setSelectedChat(chat);
    const handleGoBack = () => setSelectedChat(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewChat({ title: '' });
    };

    const handleAddChat = async () => {
        if (newChat.title) {
            try {
                const response = await fetch(`http://localhost:8080/api/communities/by-user/${nombreUsuario}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: newChat.title }),
                });

                if (!response.ok) {
                    throw new Error('Error al crear la comunidad');
                }

                const message = await response.text();
                
                setChats([...chats, { id: chats.length + 1, user: newChat.title, lastMessage: '', time: 'Justo ahora' }]);
                
                toast.success("Se agregó correctamente");
                handleCloseModal(); 
            } catch (error) {
                toast.error(error.message); 
            }
        }
    };

    const filteredChats = chats.filter((chat) =>
        chat.user.toLowerCase().includes(searchText.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchText.toLowerCase())
    );

    if (selectedChat) {
        return <ChatUnico selectedChat={selectedChat} goBack={handleGoBack} />;
    }

    return (
        <div className="flex flex-col h-screen">
            <Header userName="Marlon" />

            <main className='mt-[40px] px-5 py-4 bg-azulBlanco'>
                <div className="flex justify-between items-center mx-2 mb-4">
                    <h2 className="text-3xl font-bold text-azulOscuro">Comunidades</h2>
                    <button
                        onClick={handleOpenModal}
                        className="bg-[#25D366] text-white text-sm py-2 px-4 rounded-lg hover:bg-[#1eae58]"
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>

                <div className="p-2">
                    <input
                        type="text"
                        placeholder="🔍 Buscar o iniciar un chat"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            className="flex items-center p-4 bg-white rounded-lg mb-2 shadow-md cursor-pointer hover:bg-[#f5f6f7]"
                            onClick={() => handleChatClick(chat)}
                        >
                            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-xl">
                                {chat.user.charAt(0)}
                            </div>
                            <div className="flex-1 ml-4 border-b border-gray-200 pb-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-md font-semibold text-gray-800">{chat.user}</h3>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-xl font-semibold mb-4">Agregar Nuevo Chat</h3>
                        <input
                            type="text"
                            placeholder="Nombre de la comunidad"
                            value={newChat.title}
                            onChange={(e) => setNewChat({ ...newChat, title: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                        />
                        <div className="flex justify-end">
                            <button onClick={handleCloseModal} className="mr-2 text-gray-500">Cancelar</button>
                            <button onClick={handleAddChat} className="bg-[#25D366] text-white p-2 rounded">Agregar</button>
                        </div>
                    </div>
                </div>
            )}

            <Sliderbar />
        </div>
    );
};

export default Comunidades;
