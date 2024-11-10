import React, { useEffect, useState } from 'react';
import Sliderbar from '../components/Sliderbar';
import Header from '../components/Header';
import ContactCard from '../components/ContactCard';
import { useGlobalContext } from '../context/GlobalContext'; 
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import AddContactForm from '../components/AddContactForm';

const ContactosClave = () => {
    const { nombreUsuario } = useGlobalContext(); 
    const [contacts, setContacts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/location-favoritos/${nombreUsuario}/get-locations`);
                if (!response.ok) {
                    throw new Error('Error al obtener los contactos');
                }
                const data = await response.json();
                setContacts(data); 
            } catch (error) {
                toast.error(error.message); 
            } finally {
                setLoading(false); 
            }
        };

        if (nombreUsuario) {
            fetchContacts();
        }
    }, [nombreUsuario]); 

    const handleAddContact = (newContact) => {
        setContacts([...contacts, newContact]);
        setIsModalOpen(false);
        toast.success('Contacto agregado exitosamente');
    };

    return (
        <div>
            <Header userName={nombreUsuario} />
            <Sliderbar />
            <main className="p-6 bg-azulBlanco min-h-screen pt-[40px]">
                <h2 className="text-3xl font-bold text-azulOscuro mb-6 pt-2">Contactos Clave</h2>
                <input
                    type="text"
                    placeholder="Buscar contactos..."
                    className="w-full p-3 mb-6 rounded-lg shadow-md border focus:outline-none focus:border-azulAcento"
                />
                
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-azulMedio text-white rounded-md mb-6"
                >
                    Agregar Contacto
                </button>

                {loading ? (
                    <p className="text-center text-azulOscuro">Cargando contactos...</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {contacts.length > 0 ? (
                            contacts.map(contact => (
                                <ContactCard
                                    key={contact.id}
                                    name={contact.name}
                                    location={contact.address} 
                                    phone={contact.phone}
                                />
                            ))
                        ) : (
                            <p>No se encontraron contactos.</p>
                        )}
                    </div>
                )}
            </main>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <AddContactForm onSubmit={handleAddContact} onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}

export default ContactosClave;
