import React, { useState } from 'react';
import Sliderbar from '../components/Sliderbar';
import FormularioAlerta from '../components/FormularioAlerta';
import TarjetaZona from '../components/TarjetaZona';
import Header from '../components/Header';

const Alertas = () => {
    const [isCentroHistoricoOpen, setCentroHistoricoOpen] = useState(false);
    const [isBarrioResidencialOpen, setBarrioResidencialOpen] = useState(false);
    const [isZonaIndustrialOpen, setZonaIndustrialOpen] = useState(false);
    
    const [alertas, setAlertas] = useState({
        "Centro Histórico": [
            { mensaje: "Robo de celulares en plaza principal", prioridad: "alta" },
            { mensaje: "Sospechoso merodeando cerca de escuelas", prioridad: "media" },
        ],
        "Barrio Residencial Norte": [],
        "Zona Industrial": []
    });

    const [nuevaAlerta, setNuevaAlerta] = useState({ mensaje: "", prioridad: "alta", zona: "Centro Histórico" });
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaAlerta({ ...nuevaAlerta, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAlertas({
            ...alertas,
            [nuevaAlerta.zona]: [...alertas[nuevaAlerta.zona], { mensaje: nuevaAlerta.mensaje, prioridad: nuevaAlerta.prioridad }]
        });
        setNuevaAlerta({ mensaje: "", prioridad: "alta", zona: "Centro Histórico" });
        setIsModalOpen(false); 
    };

    return (
        <div>
            <Header userName="Marlon Diego Lupaca Mendoza" />
            <Sliderbar />
            <main className="p-6 pt-[40px] bg-gray-50 pb-[40px]">
                <div className="max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl font-bold text-azulOscuro pt-3">Alertas de inseguridad</h2>
                    

                    <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="bg-azulMedio text-white py-2 px-4 rounded-md"
                    >
                        Crear nueva alerta
                    </button>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-azulBlanco rounded-lg p-6 w-full sm:w-96 mx-4">

                                <h3 className="text-xl text-azulOscuro font-semibold mb-4">Crear Alerta</h3>

                                <FormularioAlerta 
                                    nuevaAlerta={nuevaAlerta} 
                                    handleChange={handleChange} 
                                    handleSubmit={handleSubmit} 
                                />
                                
                                <div className='flex justify-end'>
                                    <button 
                                        onClick={() => setIsModalOpen(false)} 
                                        className="mt-4 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 py-2 px-4 rounded-md transition-all duration-200"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                                

                            </div>
                        </div>
                    )}

                    <TarjetaZona 
                        zona="Centro Histórico"
                        alertas={alertas["Centro Histórico"]}
                        isOpen={isCentroHistoricoOpen}
                        toggleOpen={() => setCentroHistoricoOpen(!isCentroHistoricoOpen)}
                    />
                    <TarjetaZona 
                        zona="Barrio Residencial Norte"
                        alertas={alertas["Barrio Residencial Norte"]}
                        isOpen={isBarrioResidencialOpen}
                        toggleOpen={() => setBarrioResidencialOpen(!isBarrioResidencialOpen)}
                    />
                    <TarjetaZona 
                        zona="Zona Industrial"
                        alertas={alertas["Zona Industrial"]}
                        isOpen={isZonaIndustrialOpen}
                        toggleOpen={() => setZonaIndustrialOpen(!isZonaIndustrialOpen)}
                    />
                </div>
            </main>
        </div>
    );
};

export default Alertas;
