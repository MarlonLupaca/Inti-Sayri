import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const { setNombreUsuario } = useGlobalContext();
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor ingrese ambos campos.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/authUsusarios/login/${email}/${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                console.log('Inicio de sesión exitoso:', data.nombreUsuario);
                setError('');
                
                setNombreUsuario(data.nombreUsuario);
                
                navigate("/home");
                
                setEmail('');
                setPassword('');
            } else {
                setError(data.message || 'Correo o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setError('Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo.');
        }
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div className="relative h-screen flex flex-col justify-center items-center bg-azulBlanco">
            <div className='flex justify-center items-center mb-2'>
                <img src="./logo.svg" alt="logo" className='z-0 top-0 h-[100px]'/>
                <span className='pr-4 font-bold text-azulOscuro text-[30px]'>Inti Sayri</span>
            </div>
            
            <div className="z-20 w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-azulOscuro">Iniciar sesión</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-azulMedio">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 mt-2 border border-azulMedio rounded-md"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-azulMedio">Contraseña</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="w-full p-2 mt-2 border border-azulMedio rounded-md"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 cursor-pointer text-azulMedio"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-azulMedio text-white rounded-md hover:bg-azulAcento focus:outline-none"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <span className="text-azulOscuro">¿No tienes una cuenta? </span>
                    <button 
                        className="text-azulMedio hover:underline"
                        onClick={handleRegisterClick}
                    >
                        Regístrate aquí
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
