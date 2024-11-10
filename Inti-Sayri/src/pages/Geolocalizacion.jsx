import React, { useEffect, useState } from 'react';
import Sliderbar from '../components/Sliderbar';
import Header from '../components/Header';
import { Share2, Eye } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Geolocalizacion = () => {
    const userName = "Marlon";

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBpCefRKrNut7ZrQPgVuLTkdWXmc556Lm4", 
    });

    useEffect(() => {
        const getLocation = async () => {
            try {
                if (!navigator.geolocation) {
                    throw new Error("La geolocalización no está soportada por este navegador.");
                }

                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    });
                });

                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
                await fetchAddress(latitude, longitude);
                setError(null);
            } catch (err) {
                let errorMessage = "Error al obtener la ubicación: ";
                switch (err.code) {
                    case 1:
                        errorMessage += "Permiso denegado.";
                        break;
                    case 2:
                        errorMessage += "Ubicación no disponible.";
                        break;
                    case 3:
                        errorMessage += "Tiempo de espera agotado.";
                        break;
                    default:
                        errorMessage += err.message;
                }
                setError(errorMessage);
                console.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        getLocation();
    }, []);

    const fetchAddress = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=TU_API_KEY`
            );
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor de geocodificación');
            }
            const data = await response.json();
            if (data.status === 'OK' && data.results && data.results[0]) {
                setAddress(data.results[0].formatted_address);
            } else {
                throw new Error("No se encontró una dirección para esta ubicación.");
            }
        } catch (error) {
            setError(`Error al obtener la dirección: ${error.message}`);
            console.error("Error al obtener la dirección:", error);
        }
    };


    const handleShareLocation = async () => {
        if (location) {
            const locationUrl = `https://maps.google.com/?q=${location.lat},${location.lng}`;
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: "Mi ubicación",
                        text: "Aquí está mi ubicación actual:",
                        url: locationUrl,
                    });
                } else {
                    await navigator.clipboard.writeText(locationUrl);
                    alert("Ubicación copiada al portapapeles");
                }
            } catch (error) {
                console.error("Error al compartir la ubicación:", error);
                alert("Error al compartir la ubicación");
            }
        }
    };

    if (loadError) return <div>Error al cargar el mapa</div>;
    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <div className="h-[100vh] bg-azulBlanco">
            <Header userName={userName} />
            <Sliderbar />
            <main className="p-4 bg-azulBlanco pt-[40px] py-[40px]">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
                        <div className="bg-verdeAzulado p-4 text-white flex justify-between items-center">
                            <h2 className="text-lg font-medium">Mi Ubicación</h2>
                            <span className="text-[18px]">{userName}</span>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-100 text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="h-64">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <p>Cargando ubicación...</p>
                                </div>
                            ) : location ? (
                                <GoogleMap
                                    center={location}
                                    zoom={15}
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    options={{
                                        zoomControl: true,
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: true,
                                    }}
                                >
                                    <Marker position={location} />
                                </GoogleMap>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-center text-gray-500">
                                        No se pudo obtener la ubicación.
                                        <br />
                                        Por favor, verifica los permisos de ubicación.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <p className="text-gray-700 text-sm">
                                {isLoading ? "Obteniendo dirección..." : address || "No se pudo obtener la dirección"}
                            </p>
                        </div>

                        <div className="p-4">
                            <button
                                onClick={handleShareLocation}
                                className="w-full bg-verdeAzulado text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 disabled:opacity-50"
                                disabled={!location}
                            >
                                <Share2 size={20} />
                                <span>Compartir mi ubicación</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Geolocalizacion;