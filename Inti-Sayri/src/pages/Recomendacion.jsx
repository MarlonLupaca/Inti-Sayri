import React from 'react'
import Sliderbar from '../components/Sliderbar'
import Header from '../components/Header'

const Recomendacion = () => {
    return (
        <div>
            <Header userName="Marlon"/>
            <Sliderbar/>
            <main className='pt-[40px]'>
                <img src="./Recomen.png" alt="" />
            </main>
        </div>
    )
}

export default Recomendacion
