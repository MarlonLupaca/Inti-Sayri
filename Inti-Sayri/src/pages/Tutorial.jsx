import React from 'react'
import Sliderbar from '../components/Sliderbar'
import Header from '../components/Header'

const Tutorial = () => {
    return (
        <div>
            <Header userName="Marlon"/>
            <Sliderbar/>
            <main className='pt-[40px]'>
                <img src="./tutorial.svg" alt="" />
            </main>
        </div>
    )
}

export default Tutorial
