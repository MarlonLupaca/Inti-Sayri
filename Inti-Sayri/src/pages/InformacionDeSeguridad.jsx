import React from 'react'
import Sliderbar from '../components/Sliderbar'
import Header from '../components/Header'

const InformacionDeSeguridad = () => {
    return (
        <div>
            <Header userName="Marlon"/>
            <Sliderbar />
            <iframe 
                className='pt-[40px] h-[100vh]' 
                src="https://elcomercio.pe/ultimas-noticias/" 
                width="100%" 
                title="El Comercio"
            />
        </div>
    )
}

export default InformacionDeSeguridad
