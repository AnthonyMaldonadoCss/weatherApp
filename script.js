'use strict';

const contenedorPrincipal = document.querySelector('.contenedor_principal');
const body = document.querySelector('.cuerpo');
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

            // console.log(URL)

        fetch(URL)
            .then( response => {return response.json()})
            .then(data => {
                // console.log(data)

                //pais
                let country = data.sys.country
                //velocidad del viento
                let {speed, deg} = data.wind
                //temperatura
                let temp = Math.round(data.main.temp)
                //Ubicacion Proxima
                let name = data.name
                //Icono
                let icon = data.weather[0].main
                //codigos clima
                // Thunderstorm - Drizzle - Rain - Snow - Atmosphere - Clear - Clouds
                
                let [{main, description}] = data.weather
                
                temperatureValor.textContent =  `${temp} C`
                temperatureDescription.textContent = description

                ubicacion.textContent = `${name}, Pais ${country}`

                velocidadViento.textContent = `${speed} M/S`

                console.log(icon)

                //Seleccion del icono

                switch(icon){
                    case`Thunderstorm`:
                        iconoAnimado.src = 'animated/thunder.svg'
                        cuerpo.src = 'img/thunderStorm-min.jpg'
                        break;
                    
                    case`Drizzle`:
                        iconoAnimado.src = 'animated/rainy-4.svg'
                        break;
                    
                    case`Rain`:
                        iconoAnimado.src = 'animated/rainy-6.svg'
                        break; 
                        
                    case`Snow`:
                        iconoAnimado.src = 'animated/snowy-6.svg'
                        break;
                    
                    case`Atmosphere`:
                        iconoAnimado.src = 'animated/cloudy-day-3.svg'
                        break;
                    
                    case`Clear`:
                        iconoAnimado.src = 'animated/day.svg'
                        break;
                
                    case `Clouds`:
                        iconoAnimado.src = 'animated/cloudy.svg'
                        break;
                }
            
            })
            .catch( error => {
                console.log(error)
            })
        })
    }
})