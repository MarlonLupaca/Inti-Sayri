import React from 'react';
import { Users, ChevronDown, ChevronUp, UserPlus } from 'lucide-react';
import ListaAlertas from './ListaAlertas';

const TarjetaZona = ({ zona, alertas, isOpen, toggleOpen }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <div
            className="grid grid-cols-3 items-center gap-2 cursor-pointer"
            onClick={toggleOpen}
        >
            <div className="col-span-2 flex items-center gap-2">
                <Users className="text-gray-500" />
                <div>
                    <h2 className="font-bold text-lg">{zona}</h2>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {alertas.length} alertas
                    </span>
                </div>
            </div>
            <div className="flex justify-end items-center gap-2">
                <button className="flex items-center gap-1 text-blue-600 border px-3 py-1 rounded-md">
                    <UserPlus size={16} />
                    {zona === "Centro Histórico" ? "Unido" : "Unirse"}
                </button>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
        </div>
        {isOpen && <ListaAlertas alertas={alertas} />}
    </div>
);

export default TarjetaZona;
