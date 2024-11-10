import React from 'react';
import { AlertCircle } from 'lucide-react';

const ListaAlertas = ({ alertas }) => (
    <div className="mt-4 space-y-2">
        {alertas.length > 0 ? (
            alertas.map((alerta, index) => {
                let priorityColor = "";
                let priorityBg = "";

                if (alerta.prioridad === "alta") {
                    priorityColor = "text-red-600";
                    priorityBg = "bg-red-100 text-red-700";
                } else if (alerta.prioridad === "media") {
                    priorityColor = "text-orange-600";
                    priorityBg = "bg-orange-100 text-orange-700";
                } else if (alerta.prioridad === "baja") {
                    priorityColor = "text-green-600";
                    priorityBg = "bg-green-100 text-green-700";
                }

                return (
                    <div
                        key={index}
                        className={`flex items-center gap-2 ${priorityColor}`}
                    >
                        <AlertCircle size={20} />
                        <span className="font-medium">{alerta.mensaje}</span>
                        <span
                            className={`text-xs ${priorityBg} px-2 py-1 rounded-full`}
                        >
                            {alerta.prioridad}
                        </span>
                    </div>
                );
            })
        ) : (
            <p className="text-gray-600">No hay alertas en esta zona.</p>
        )}
    </div>
);

export default ListaAlertas;
