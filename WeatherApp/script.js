let formulario = document.getElementById('formulario');
let spinner = document.getElementById('loader');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    spinner.classList.remove('loader-none');
    spinner.classList.add('loader');
    let datos = new FormData(formulario);
    let ciudad = datos.get('ciudad');
    formulario.reset();

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ciudad+'&appid=9b7496c53ae26b414665cf8469ce92ea')
    .then(res => res.json())
    .then(data => {
        spinner.classList.remove('loader');
        if(data.cod == "404"){
            document.getElementById('resultado-datos').classList.add('resultado-datos-none');
            document.getElementById('resultado-datos').classList.remove('resultado-datos');
            document.getElementById('error').classList.remove('error-none');
            document.getElementById('error').classList.add('error');
            return;
        }

        let temperatura = data.main.temp - 273.15;
        let humedad = data.main.humidity;
        let max = data.main.temp_max - 273.15;
        let min = data.main.temp_min - 273.15;
        let sensacion = data.main.feels_like - 273.15;
        let ciudad = data.name;

        document.getElementById('error').classList.remove('error');
        document.getElementById('error').classList.add('error-none');
        document.getElementById('resultado-datos').classList.remove('resultado-datos-none');
        document.getElementById('resultado-datos').classList.add('resultado-datos');
        document.getElementById('ciudad-nombre').innerHTML = ciudad;
        document.getElementById('ciudad-temperatura').innerHTML = temperatura.toFixed(0) + "°";
        document.getElementById('ciudad-humedad').innerHTML = 'Humedad: ' + humedad + "%";
        document.getElementById('ciudad-max').innerHTML = 'Max. ' + max.toFixed(0) + "°";
        document.getElementById('ciudad-min').innerHTML = 'Min. ' + min.toFixed(0) + "°";
        document.getElementById('ciudad-sensacion').innerHTML = 'Sensacion Termica: ' + sensacion.toFixed(0) + "°";
    })
});