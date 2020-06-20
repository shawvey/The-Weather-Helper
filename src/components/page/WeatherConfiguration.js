import createObservable from './Observable.js'
import MeasureIndependentUnitsCorrespondent from './MeasureIndependentUnitsCorrespondent.js'
import MeasureDependentUnitsCorrespondent from './MeasureDependentUnitsCorrespondent.js'

let unitFamiliesToMeasureUnitsMap = {
	imperial: {
		temperature: '°F',
		speed: 'mph'
	},
	metric: {
		temperature: '°C',
		speed: 'm/s'
	}
}

export default {
	__proto__: createObservable(),
	city: 'N/A',
	unitFamily: 'N/A',
	units: {
		temperature: 'N/A',
		speed: 'N/A',
		timeFormat: '24-hour',
		precipitation: 'mm',
		humidity: '%'
	},
	updateCity(){
		this.city = sessionStorage.getItem('ms_city');
		this.inform();
	},
	updateUnitFamily(){
		this.unitFamily = sessionStorage.getItem('ms_unit');
		this.inform();
	},
	retrieveUnitForMeasure(measure){
        this.city = sessionStorage.getItem('ms_city');
        this.unitFamily = sessionStorage.getItem('ms_unit');
		if(MeasureIndependentUnitsCorrespondent.isUnitSystemIndependentMeasure(measure))
			return MeasureIndependentUnitsCorrespondent.retrieveUnitFamilyIndependentMeasureUnit(measure);
		else return MeasureDependentUnitsCorrespondent.retrieveUnitFamilyDependentMeasureUnit(this.unitFamily,measure);
	}
}
