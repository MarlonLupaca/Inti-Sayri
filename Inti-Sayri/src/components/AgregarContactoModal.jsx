import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const AgregarContactoModal = ({ onClose }) => {
    const { nombreUsuario } = useGlobalContext();
    const [searchText, setSearchText] = useState('');
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/location-favoritos/${nombreUsuario}/get-locations`);
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        if (nombreUsuario) {
            fetchContacts();
        }
    }, [nombreUsuario]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleAddContact = () => {
        console.log(`Buscar contacto: ${searchText}`);
        onClose();
    };

    const handleSelectContact = (contact) => {
        setSearchText(contact.name);
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-xl text-azulOscuro font-semibold mb-4">Buscar Contacto</h3>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Buscar contacto"
                    className="w-full p-2 border rounded mb-4 text-black"
                />
                {filteredContacts.length > 0 && (
                    <ul className="max-h-40 overflow-y-auto mb-4">
                        {filteredContacts.map((contact) => (
                            <li
                                key={contact.id}
                                onClick={() => handleSelectContact(contact)}
                                className="cursor-pointer p-2 hover:bg-gray-200 text-black"
                            >
                                {contact.name}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Cancelar
                    </button>
                    <button onClick={handleAddContact} className="bg-azulOscuro text-white p-2 rounded">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgregarContactoModal;
