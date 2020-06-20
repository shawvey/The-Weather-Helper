<template>
<div :class='chosenStylingPreset'>
	<img :src='appropriateConditionArt' />
</div>
</template>
<script>

let weatherConditionToConditionArtMap = {
	'clear': require('../../../static/img/clear.svg'),
	'clear_night': require('../../../static/img/clear_night.svg'),
	'clouds': require('../../../static/img/clouds.svg'),
	'few_clouds': require('../../../static/img/few_clouds.svg'),
	'few_clouds_night': require('../../../static/img/few_clouds_night.svg'),
	'rain': require('../../../static/img/rain.svg')
}

export default {
	name:'weather-condition-art',
	props: ['preset','condition'],
	computed: {
		chosenStylingPreset(){
			return { 'weather-condition-art-large': this.preset === 'large',
				 'weather-condition-art-medium': this.preset === 'medium',
				 'weather-condition-art-small': this.preset === 'small' }
		},
		appropriateConditionArt(){
			return weatherConditionToConditionArtMap[this.condition];
		}
	}
}
</script>
<style scoped>
img {
	width: 100%;
}
</style>
