import React, { useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Sliderbar from '../components/Sliderbar';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MapContainer from '../components/MapContainer';
import NearbyResults from '../components/NearbyResults';

const CentrosDeAyuda = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBpCefRKrNut7ZrQPgVuLTkdWXmc556Lm4",
        libraries: ["places"],
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [autocomplete, setAutocomplete] = useState(null);
    const [results, setResults] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        const savedResults = localStorage.getItem('nearbyResults');
        if (savedResults) {
            setResults(JSON.parse(savedResults));
        } else {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    fetchNearbyPlaces(latitude, longitude);
                },
                () => alert("No se pudo obtener la ubicación.")
            );
        }
    }, []);

    const fetchNearbyPlaces = (lat, lng) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch(
            { location: { lat, lng }, radius: 5000, keyword: 'comisaría' },
            (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const places = results.map((place) => ({
                        id: place.place_id,
                        name: place.name,
                        address: place.vicinity,
                        isOpen: place.opening_hours?.isOpen(),
                        phone: place.formatted_phone_number,
                        location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
                    }));
                    setResults(places);
                    localStorage.setItem('nearbyResults', JSON.stringify(places));
                } else {
                    console.error("Error al obtener lugares:", status);
                }
            }
        );
    };

    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const location = {
                    id: place.place_id,
                    name: place.name,
                    address: place.formatted_address,
                    isOpen: place.opening_hours?.isOpen(),
                    phone: place.formatted_phone_number,
                    location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
                };
                setResults([location]);
                setSelectedPlace(location);
            } else {
                alert("No se encontró la ubicación especificada.");
            }
        }
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const toggleFavorite = (id) => setFavorites((prev) => prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="w-full h-full">
            <Header userName="Marlon" />
            <Sliderbar />
            <main className="pt-[40px] p-6 w-full">
                <h2 className="text-3xl font-bold text-azulOscuro mb-2 pt-2">Centros de ayuda</h2>
                <SearchBar
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                />
                <MapContainer
                    center={selectedPlace ? selectedPlace.location : currentLocation || { lat: -16.409, lng: -71.537 }}
                    selectedPlace={selectedPlace}
                />
                <NearbyResults results={results} favorites={favorites} toggleFavorite={toggleFavorite} />
            </main>
        </div>
    );
};

export default CentrosDeAyuda;
