import React, { useEffect, useState } from 'react';
import Sliderbar from '../components/Sliderbar';
import Header from '../components/Header';
import { useGlobalContext } from '../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const { nombreUsuario } = useGlobalContext();
    const [socket, setSocket] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [keyPressCount, setKeyPressCount] = useState(0);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ñ' || event.key === 'a') 
                setKeyPressCount(prevCount => prevCount + 1);
        };

        const resetKeyPressCount = () => {
            setKeyPressCount(0); 
        };

        window.addEventListener('keydown', handleKeyPress);
        const resetTimer = setInterval(resetKeyPressCount, 1000); 

        
        if (keyPressCount >= 3) {
            if (nombreUsuario && socket) {
                socket.send(JSON.stringify({
                    alertMessage: `¡Alerta de emergencia de ${nombreUsuario}!`,
                    userId: nombreUsuario
                }));
                toast.success('¡Alerta enviada!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setKeyPressCount(0); 
        }

        return () => {
            clearInterval(resetTimer); 
            window.removeEventListener('keydown', handleKeyPress); 
        };
    }, [keyPressCount, nombreUsuario, socket]);

    const handleEmergencyClick = () => {
        if (nombreUsuario && socket) {
            socket.send(JSON.stringify({
                alertMessage: `¡Alerta de emergencia de ${nombreUsuario}!`,
                userId: nombreUsuario
            }));
            toast.success('¡Alerta enviada!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('No estás registrado. Por favor, inicia sesión.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        if (nombreUsuario) {
            const newSocket = new WebSocket(`ws://localhost:8080/alerts?userId=${nombreUsuario}`);
            setSocket(newSocket);

            newSocket.onopen = () => {
                console.log('Conexión WebSocket establecida');
            };

            newSocket.onmessage = (event) => {
                console.log('Alerta recibida:', event.data);
                setAlertMessage(event.data);
                setModalVisible(true);
            };

            return () => {
                newSocket.close();
                console.log('Conexión WebSocket cerrada');
            };
        }
    }, [nombreUsuario]);

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <Header userName={nombreUsuario} />
            <Sliderbar />
            <ToastContainer />

            <main className='relative h-[100vh] pt-[40px] flex flex-col items-center justify-center z-0 '>
                <span className='text-[12px] text-gray-500 absolute top-[45px] w-[300px] text-center'>Presiona <span className='font-bold'>tres veces</span> el boton de apagado para enviar una alerta</span>

                <div className='flex flex-col items-center mt-[10px]'>
                    <button
                        onClick={handleEmergencyClick}
                        className='bg-red-500 text-white font-bold text-5xl p-10 rounded-full shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105 h-[150px] w-[150px] flex justify-center items-center'
                    >
                        SOS
                    </button>
                    <p className='text-gray-700 mt-4 text-lg'>
                        ¿Estás en una emergencia?
                    </p>
                    <p className='text-gray-500 text-sm'>
                        Presiona el botón para enviar una alerta al CA Municipal
                    </p>
                </div>

                <div className='grid grid-cols-2 gap-6 mt-10 w-full px-10'>
                    <button className='bg-yellow-400 p-3 rounded-lg shadow-md text-white font-semibold hover:bg-yellow-500 transition flex flex-col items-center '>
                        <span>Policía Nacional del Perú</span>
                        <div className='flex items-center mt-2'>
                            <i className='fa-solid fa-phone mr-2'></i> 105
                        </div>
                    </button>
                    <button className='bg-orange-500 p-4 rounded-lg shadow-md text-white font-semibold hover:bg-orange-600 transition flex flex-col items-center justify-center'>
                        <span>Bomberos</span>
                        <div className='flex items-center mt-2'>
                            <i className='fa-solid fa-phone mr-2'></i> 116
                        </div>
                    </button>
                    <button className='bg-pink-600 p-4 rounded-lg shadow-md text-white font-semibold hover:bg-pink-700 transition flex flex-col items-center'>
                        <span>Emergencia Policía Carreteras</span>
                        <div className='flex items-center mt-2'>
                            <i className='fa-solid fa-phone mr-2'></i> 110
                        </div>
                    </button>
                    <button className='bg-blue-500 p-4 rounded-lg shadow-md text-white font-semibold hover:bg-blue-600 transition flex flex-col items-center justify-center'>
                        <span>Defensa Civil</span>
                        <div className='flex items-center mt-2'>
                            <i className='fa-solid fa-phone mr-2'></i> 115
                        </div>
                    </button>
                </div>
            </main>

            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                        <h2 className="text-xl font-semibold mb-4">¡Alerta Recibida!</h2>
                        <p className="text-gray-700 mb-6">{alertMessage}</p>
                        <button
                            onClick={closeModal}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
