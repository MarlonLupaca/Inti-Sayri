import React, { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io'; 
import AgregarContactoModal from './AgregarContactoModal';

const ChatHeader = ({ selectedChat, goBack }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="bg-azulAcento mt-[40px] text-white flex items-center justify-between p-3 shadow-md">
            <div className="flex items-center">
                <button
                    onClick={goBack}
                    className="text-white bg-transparent border-2 border-white rounded-full p-2 hover:bg-white hover:text-[#075E54] transition duration-300 ease-in-out mr-2"
                >
                    <IoMdArrowBack size={15} />
                </button>
                <h3 className="text-md font-semibold ml-2">{selectedChat.user}</h3>
            </div>

            <div className="flex items-center">
                <button
                    onClick={handleOpenModal}
                    className="bg-azulOscuro text-white text-sm py-2 px-4 rounded-lg hover:bg-[#1eae58]"
                >
                    Agregar contacto
                </button>
            </div>

            {isModalOpen && <AgregarContactoModal onClose={handleCloseModal} />}
        </div>
    );
};

export default ChatHeader;
