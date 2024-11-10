import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext'; 
import { toast } from 'react-toastify'; 

const AddContactForm = ({ onClose, onSubmit }) => {
    const { nombreUsuario } = useGlobalContext();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name && phone && address) {
            // Creamos el objeto de datos
            const contactData = {
                name,
                phone,
                address
            };

            try {
                setIsLoading(true); // Activamos el estado de carga

                // Hacemos la solicitud POST a la API con el nombre de usuario desde el contexto
                const response = await fetch(`http://localhost:8080/api/location-favoritos/${nombreUsuario}/add-location`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contactData),
                });

                if (!response.ok) {
                    throw new Error('Error al agregar contacto');
                }

                const message = await response.text();
                
                onSubmit(contactData); 
                
                toast.success(message); 
                setIsLoading(false); 
                
                setName('');
                setPhone('');
                setAddress('');
                
                // Cerramos el modal
                onClose();

            } catch (error) {
                console.error('Error al agregar contacto:', error);
                setIsLoading(false); 
                toast.error(error.message); 
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-azulOscuro mb-4">Agregar Contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-azulMedio">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-2 mt-2 border border-azulMedio rounded-md"
                        placeholder="Nombre del contacto"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-azulMedio">Teléfono</label>
                    <input
                        type="text"
                        id="phone"
                        className="w-full p-2 mt-2 border border-azulMedio rounded-md"
                        placeholder="Teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-azulMedio">Dirección</label>
                    <input
                        type="text"
                        id="address"
                        className="w-full p-2 mt-2 border border-azulMedio rounded-md"
                        placeholder="Dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded-md"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-azulMedio text-white rounded-md"
                        disabled={isLoading} // Deshabilitamos el botón mientras se carga
                    >
                        {isLoading ? 'Cargando...' : 'Agregar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddContactForm;
