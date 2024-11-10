import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapContainer = ({ center, selectedPlace }) => (
    <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} zoom={15} center={center}>
        {selectedPlace && <Marker position={selectedPlace.location} title={selectedPlace.name} />}
    </GoogleMap>
);

export default MapContainer;
