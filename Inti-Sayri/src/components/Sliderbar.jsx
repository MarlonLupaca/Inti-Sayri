import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sliderbar = () => {
    const [isVisible, setIsVisible] = useState(false); 

    const toggleSlider = () => {
        setIsVisible(!isVisible);
    };

    const handleLinkClick = () => {
        setIsVisible(false);  
    };

    return (
        <div className={`fixed z-[100] ${!isVisible ? 'pointer-events-none' : ''} `}>
            <div 
                className={` fixed inset-0 bg-black bg-opacity-50 z-0 transition-opacity duration-300 ${!isVisible ? 'opacity-0 pointer-events-none ' : 'opacity-100'}`}
                onClick={toggleSlider}
            ></div>

            <div 
                className={`h-[100vh] w-[200px] relative  bg-azulOscuro z-50 rounded-br-[10px] transition-all duration-300 ${isVisible ? 'left-0 ' : '-left-[200px]'}`}
            >
                <div 
                    className='absolute top-0 right-[-30px] bg-azulOscuro z-50 h-[40px] w-[35px] flex justify-center items-center rounded-br-[10px] cursor-pointer'
                    onClick={toggleSlider}
                >
                    <i 
                        className={`fa-solid fa-angle-up text-azulBlanco pointer-events-auto text-[20px] p-0 ml-[5px] rotate-90 ${isVisible ? 'rotate-90' : '-rotate-90'}`}
                    ></i>
                </div>

                <div className='h-[8vh] flex justify-center items-center text-azulBlanco text-[25px] font-[800]  py-2 sticky top-0 bg-azulOscuro rounded-tr-[10px]'>
                    <div className=' flex justify-center items-center mt-1'>
                        <img src="./logo.svg" alt="logo"  className=' z-0 top-0 h-[40px]'/>
                        <span className='pr-4 font-bold text-azulBlanco text-[20px]'>Inti Sayri</span>
                    </div>
                </div>

                <div className='h-[90vh] pl-6 pt-3 overflow-y-auto'>
                    <div>
                        <span className='text-azulClaro text-[14px] mb-3 block'>
                            NAVEGACIÓN
                        </span>
                        <nav className='text-azulBlanco text-[14px]'>
                            <ul>
                                <Link to="/home" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-home"></i><span>Home</span>
                                    </li>
                                </Link>
                                <Link to="/centros-de-ayuda" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-question-circle"></i><span>Centros de Ayuda</span>
                                    </li>
                                </Link>
                                <Link to="/contactos-clave" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-address-book"></i><span>Contactos Clave</span>
                                    </li>
                                </Link>
                                <Link to="/alerts" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-bell"></i><span>Alertas</span>
                                    </li>
                                </Link>
                                <Link to="/comunidades" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-users"></i><span>Comunidades</span>
                                    </li>
                                </Link>
                                
                                <Link to="/geolocalizacion" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-map-marker-alt"></i><span>Geolocalización</span>
                                    </li>
                                </Link>
                                <Link to="/informacion-de-seguridad" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-shield-alt"></i><span>Noticias Nacionales</span>
                                    </li>
                                </Link>
                                <Link to="/recomendaciones" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-lightbulb"></i><span>Recomendaciones</span>
                                    </li>
                                </Link>

                                <Link to="/tutorial" onClick={handleLinkClick}>
                                    <li className='py-3 flex items-center gap-3 hover:text-[#fdf4ef] cursor-pointer'>
                                        <i className="fas fa-chalkboard-teacher"></i><span>Tutorial</span>
                                    </li>
                                </Link>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sliderbar;
