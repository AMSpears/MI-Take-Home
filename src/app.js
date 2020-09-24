import { convertDate } from "./utils";
import axios from 'axios'

const fetchAllData = async () => {
  const currDate = new Date()
  const month =
    currDate.getMonth() + 1 < 10
      ? `0${currDate.getMonth() + 1}`
      : currDate.getMonth() + 1;
  const day =
    currDate.getDay() < 10
    ? `0${currDate.getDay()}`
    : currDate.getDay()
  const year = currDate.getFullYear()
  let city = ''
  let lat = 0
  let long = 0

  // CITY DATA
  const stateZipcode = 20001;
  const response = await axios.get(
    `https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${stateZipcode}`
  )
  city = `${response.data.city}, ${response.data.regionCode}`
  lat = Number(response.data.latitude).toFixed(2)
  long = Number(response.data.longitude).toFixed(1)

}

fetchAllData()
