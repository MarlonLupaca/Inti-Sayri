import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const CardCentro = ({ name, location, phone, email }) => {
    return (
        <div className="bg-azulBlanco p-4 rounded-lg shadow-md w-full max-w-xs">
            <div className="flex items-center mb-4">
                <div className="bg-azulClaro rounded-full p-2">
                    <FaUser className="text-azulMedio text-2xl" />
                </div>
                <div className="ml-4">
                    <h3 className="text-azulOscuro font-bold text-lg">{name}</h3>
                    <p className="text-azulMedio">{location}</p>
                </div>
            </div>
            <div className="flex items-center text-azulOscuro mb-2">
                <FaPhone className="mr-2 text-azulAcento" />
                <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
            </div>
            <div className="flex items-center text-azulOscuro mb-4">
                <FaEnvelope className="mr-2 text-azulAcento" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </div>
            <button className="bg-verdeAzulado text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full">
                <FaMapMarkerAlt className="mr-2" /> Ver en el Mapa
            </button>
        </div>
    );
};