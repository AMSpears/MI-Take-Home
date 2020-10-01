import { convertDate } from "./utils";
import axios from 'axios'
import cloudy from '../img/cloudy.png'
import rain from "../img/rain.png"
import snow from "../img/snow.png"
import sunny from "../img/sunny.png"


const addData = (initialDays, city) => {
  const currDate = new Date()
  const title = document.getElementById('title')
  const subTitle = document.getElementsByClassName('weekday')
  const iconImg = document.getElementsByTagName('img')
  const weatherDescription = document.getElementsByClassName('weather-description')
  const weatherTemp = document.getElementsByClassName('weather-temp')

  title.innerText = `WEATHER FORECAST FOR ${city.toUpperCase()}`

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  weekdays.map((weekday, idx) => {
    if (idx === 0) {
      subTitle[0].innerText = 'Today:'
    }
    if (idx === currDate.getDay()) {
      subTitle[1].innerText = `${weekday}:`
    }
    if (idx === currDate.getDay() + 1) {
      subTitle[2].innerText = `${weekday}:`
    }
  })

  initialDays.map((day, idx) => {
    if (day.icon === 'cloudy') {
      iconImg[idx].src = cloudy
      weatherDescription[idx].innerText = `${day.icon.slice(0, 1).toUpperCase()}${day.icon.slice(1)}`

      weatherTemp[idx].innerText = `${day.temperatureHigh.toFixed(0)}°/ ${day.temperatureLow.toFixed(0)}° F`
    } else if (day.icon === 'rain') {
      iconImg[idx].src = rain
      weatherDescription[idx].innerText = `${day.icon.slice(0, 1).toUpperCase()}${day.icon.slice(1)}`
      weatherTemp[idx].innerText = `${day.temperatureHigh.toFixed(0)}°/ ${day.temperatureLow.toFixed(0)}° F`
    } else if (day.icon === 'sunny') {
      iconImg[idx].src = sunny
      weatherDescription[idx].innerText = `${day.icon.slice(0, 1).toUpperCase()}${day.icon.slice(1)}`
      weatherTemp[idx].innerText = `${day.temperatureHigh.toFixed(
        0
      )}°/ ${day.temperatureLow.toFixed(0)}° F`
    } else {
      iconImg[idx].src = snow
      weatherDescription[idx].innerText = `${day.icon.slice(0, 1).toUpperCase()}${day.icon.slice(1)}`
      weatherTemp[idx].innerText = `${day.temperatureHigh.toFixed(0)}°/ ${day.temperatureLow.toFixed(0)}° F`
    }
  })
}

const fetchAllData = async () => {
  let currDate = new Date()
  currDate = convertDate(currDate)
  let city = ''
  let lat = 0
  let long = 0

  // CITY DATA
  const stateZipcode = 20001
  const response = await axios.get(
    `https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${stateZipcode}`
  )
  city = `${response.data.city}, ${response.data.regionCode}`
  lat = Number(response.data.latitude).toFixed(2)
  long = Number(response.data.longitude).toFixed(1)


  // CITY WEATHER DETAILS
  const detailsResponse = await axios.get(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${lat}&longitude=${long}&date=${currDate}`)
  const initialDays = detailsResponse.data.daily.data.filter( (data, idx) => idx < 3)

  addData(initialDays, city)

}

fetchAllData()
