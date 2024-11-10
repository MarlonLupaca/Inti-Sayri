import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';  

const Header = () => {
    const { nombreUsuario } = useGlobalContext(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/'); 
    };

    return (
        <header className="w-full z-[100] h-[40px] py-3 px-4 flex items-center justify-end fixed top-0 right-0"
            style={{
                backgroundImage: 'linear-gradient(to right, #024873, #0477BF)',  
                color: '#EAF2FA'
            }}
        >
            <div className="flex items-center gap-2">
                <FaUserCircle className="text-[20px]" />
                <span className="text-[15px]">{nombreUsuario}</span>
            </div>

            <button 
                onClick={handleLogout}
                className="ml-4 text-[15px] text-azulBlanco hover:text-white transition duration-300 ease-in-out"
            >
                <FaSignOutAlt className="mr-2" />
            </button>
        </header>
    );
};

export default Header;
