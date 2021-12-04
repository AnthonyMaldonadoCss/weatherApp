'use strict';

const contenedorPrincipal = document.querySelector('.contenedor_principal');
const caja1 = document.querySelector('.caja_1');
const caja2 = document.querySelector('.caja_2');
const caja3 = document.querySelector('.caja_3');
const temperatureValor = document.querySelector('.temp_valor');
const temperatureDescription = document.querySelector('.temp_descripcion');
const ubicacion = document.querySelector('.ubicacion')
const iconoAnimado = document.querySelector('.icono_animado');
const velocidadViento = document.querySelector('.velocidad_viento')


const API_KEY = 'ab5569b31f3407c6cbed2c58e478277d'

window.addEventListener('load', function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            
            const {latitude, longitude} = position.coords
            console.log(latitude, longitude)
            console.log(position.coords)

            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

            console.log(URL)

        fetch(URL)
            .then( response => {return response.json()})
            .then(data => {
                console.log(data)

                //pais
                let country = data.sys.country
                //velocidad del viento
                let {speed, deg} = data.wind
                //temperatura
                let temp = Math.round(data.main.temp)
                //Ubicacion Proxima
                let name = data.name
                
                let [{main, description}] = data.weather
                console.log(`Pais: ${country}, Velocidad del viento: ${speed} y ${deg}, Temperatura: ${temp}, Localizacion casi exacta: ${name}, Tipo de cielo: ${main} y ${description}`)
                
                temperatureValor.textContent =  `${temp} C`
                temperatureDescription.textContent = description

                ubicacion.textContent = `Localizacion: ${name}, Pais ${country}`

                velocidadViento.textContent = `${speed} M/S`
            
            })
            .catch( error => {
                console.log(error)
            })
        })
    }
})