import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
    const [nombreUsuario, setNombreUsuario] = useState(null);

    return (
        <GlobalContext.Provider value={{ nombreUsuario, setNombreUsuario }}>
            {children}
        </GlobalContext.Provider>
    );
};
