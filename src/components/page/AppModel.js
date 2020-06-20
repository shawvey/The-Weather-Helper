import WeatherConfiguration from './WeatherConfiguration.js'

import CurrentWeatherModel from '../models/CurrentWeatherModel.js'
import DayForecastModel from '../models/DayForecastModel.js'
import HourForecastModel from '../models/HourForecastModel.js'

import WeatherApi from './OpenWeatherApiAdapter.js'

function tabulateHourWeatherIntoDayHourMatrix(hourlyRecords){
	let currentIndex = -1
	let currentDay
	let array = []
	hourlyRecords
	.forEach((hourlyRecord) => {
		if(hourlyRecord.date.getDate() !== currentDay) {
			currentDay = hourlyRecord.date.getDate()
			currentIndex++
			array[currentIndex] = []
		}
		array[currentIndex].push(hourlyRecord)
	})
	return array
}

export default {
	assignCityAndUnitFamily(){
		WeatherConfiguration.updateCity();
		WeatherConfiguration.updateUnitFamily();
		this.refresh();
	},
	refresh(){
        let city = sessionStorage.getItem('ms_city')
        let unitFamily = sessionStorage.getItem('ms_unit')
		WeatherApi.retrieveCurrentWeatherInfo(city,unitFamily)
		.then((result) => {
			CurrentWeatherModel.updateBasicWeatherInfo(result)
		})
		WeatherApi.retrieveWeatherTemperatureAndConditionForNextHours(city,unitFamily,5)
		.then((result) => {
			HourForecastModel.updateHourlyForecast(result)
		})
		WeatherApi.retrieveWeatherTemperatureAndConditionForNextHours(city,unitFamily,30)
		.then((result) => {
			DayForecastModel.updateDailyWeatherForecast(
				tabulateHourWeatherIntoDayHourMatrix(result)
			)
		})
	}
}
