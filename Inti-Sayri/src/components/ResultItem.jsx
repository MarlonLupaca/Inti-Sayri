import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import FavoritesButton from './FavoritesButton';
import { useGlobalContext } from '../context/GlobalContext';
import { toast } from 'react-toastify'; 

const ResultItem = ({ result, isFavorite, toggleFavorite }) => {
    const [showMap, setShowMap] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [inputNumber, setInputNumber] = useState('');
    const { nombreUsuario } = useGlobalContext();  

    const handleShowMap = () => setShowMap(!showMap);

    const handleToggleFavorite = () => {
        if (!isFavorite) {
            setShowModal(true); 
        } else {
            toggleFavorite(result.id); 
        }
    };

    const handleInputChange = (e) => {
        setInputNumber(e.target.value);
    };

    const handleSaveFavorite = async () => {
        if (!inputNumber) {
            toast.error('Por favor ingrese un número');
            return;
        }

        const body = {
            name: result.name,
            address: result.address,
            phone: inputNumber, 
        };

        try {

            const response = await fetch(`http://localhost:8080/api/location-favoritos/${nombreUsuario}/add-location`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const textResponse = await response.text(); 

            if (response.ok) {
                toast.success('Ubicación guardada como favorita');
                toggleFavorite(result.id); 
                setShowModal(false); 
                setInputNumber(''); 
            } else {
                toast.error('Error al guardar la ubicación: ' + textResponse);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('Hubo un error al guardar la ubicación');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setInputNumber(''); 
    };

    return (
        <div key={result.id} className="result-item p-4 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-azulOscuro font-bold text-lg">{result.name}</h3>
                    <p className="text-azulMedio">{result.address}</p>
                    <p className={result.isOpen ? 'text-green-500' : 'text-red-500'}>
                        {result.isOpen ? 'Abierto las 24 horas' : 'Cerrado'}
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <FavoritesButton isFavorite={isFavorite} toggleFavorite={handleToggleFavorite} />
                </div>
            </div>

            <button
                onClick={handleShowMap}
                className="bg-verdeAzulado text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full mt-4"
            >
                Ver en el Mapa
            </button>

            {showMap && (
                <div className="mt-4">
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "400px" }}
                        zoom={15}
                        center={result.location}
                    >
                        <Marker position={result.location} title={result.name} />
                    </GoogleMap>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h3 className="text-lg font-bold mb-2">{result.name}</h3>
                        <p className="mb-4">{result.address}</p>
                        <label className="block text-sm font-medium text-gray-700">
                            Ingrese un número:
                        </label>
                        <input
                            type="text"
                            value={inputNumber}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveFavorite}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultItem;
