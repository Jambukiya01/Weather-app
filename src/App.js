import { Form } from 'react-router-dom';
import './App.css';
import Search from './Assets/search.png';
import cloud from './Assets/cloud.png';
import humidity from './Assets/humidity.png';
import wind from './Assets/wind.png';
import clear from './Assets/clear.png';
import drizzle from './Assets/drizzle.png';
import rain from './Assets/rain.png';
import snow from './Assets/snow.png';
import { useState } from 'react';

function App() {

  let API_KEY = "b550e5c58bc81fcf11e194cfa7b8e130";

  const [wicon, setwicon] = useState(cloud);

  const search = async () => {
    const element = document.getElementsByClassName("input");
      if(element[0].value===" "){
        return 0;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`;

      let responce = await fetch(url);
      let data = await responce.json();

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity+ " %";
      wind[0].innerHTML = Math.floor(data.wind.speed)+ " km/h";
      temprature[0].innerHTML = Math.floor(data.main.temp) + " °C";
      location[0].innerHTML = data.name;

      if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
        setwicon(clear);
      }
      else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setwicon(cloud);
      }
      else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
        setwicon(drizzle);
      }
      else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setwicon(drizzle);
      }
      else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
        setwicon(rain);
      }
      else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
        setwicon(rain);
      }
      else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
        setwicon(snow);
      }
      else{
        setwicon(clear);
      }
  };

  return (
   <div className='Container'>
    <div className='Top-bar'>
      <input type="text" className='input' placeholder='Enter a City Name' />
      <div className='Search-icon' onClick={() => {search()}}>
        <img src={Search}/>
      </div>
    </div>

   <div className='weather-image'>
    <img src={cloud} />
   </div>
   <div className='weather-temp'>
    24 °C
   </div>
   <div className='weather-location'>Botad</div>
   <div className='data-container'>
    <div className='element'>
      <img src={humidity} className='icon' />
      <div className='data'>
        <div className='humidity-percent'>64 %</div>
        <div className='text'>Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img src={wind} className='icon' />
      <div className='data'>
        <div className='wind-rate'>64 km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
    </div>
   </div>
   </div>
  );
}

export default App;
