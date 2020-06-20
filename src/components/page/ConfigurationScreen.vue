<template>
	<div class='config-screen'>
        <div class='top-right-buttons'>
		    <button class='top-button' @click='signup()'>Sign up</button>
            <button class='top-button' @click='login()'>Login</button>
        </div>
		<div class='branding'>
			<img src='static/img/logo.svg'  />
			<div class='product-name'>
				<span>The<br>Weather<br>Helper</span>
			</div>
		</div>
		<div class='controls'>
			<div class='border-circled'>			
				<input class='city-input' v-model='city' placeholder='City (i.e. Bristol)'></input>
                <button class='search-button' @click='changeCityForCurrentWeatherModel()'>
                    <img src='/static/img/send.svg'/>
                </button>
			</div>
			<toggle-view class='temperature-unit-selecter' @optionChanged='unitOptionChanged' first-option='°C' second-option='°F' />
		</div>
	</div>
</template>

<script type="text/javascript">

import AppModel from './AppModel.js';
import ToggleView from './ToggleView.vue'
import Weather from './Weather.vue'
import CompositeDashboardModel from '../models/CompositeDashboardModel.js'

let unitToFamilyMap = {
	'°C': 'metric',
	'°F': 'imperial'
}

export default {
  name: 'configuration-screen',
  components: {
	'toggle-view': ToggleView
  },
  data () {
    return {
     	city: '',
	    unit: ''
    }
  },
  methods: {
	signup: function () {
		this.$router.push("/register").catch(error => {
			if (error.name != "NavigationDuplicated") {
				throw error;
            }
        });

	},

	login: function () {
		this.$router.push("/login").catch(error => {
			if (error.name != "NavigationDuplicated") {
				throw error;
            }
        });

	},

	changeCityForCurrentWeatherModel(){
        sessionStorage.setItem('ms_city',this.city)
        sessionStorage.setItem('ms_unit',unitToFamilyMap[this.unit])
		AppModel.assignCityAndUnitFamily();
	},
	unitOptionChanged(newOption){
		this.unit = newOption;
	}
  },
  beforeRouteLeave(to, from, next) {
	    if (to.path == "/index") {
		  to.meta.keepAlive = true;
	    } else {
			 to.meta.keepAlive = false;
		}
		next();
	},
  computed: {
	unitFamily(){
		return unitToFamilyMap[this.unit];
	}
  },
  mounted(){
			CompositeDashboardModel.onchange(() => { this.$router.push({path: '/weather'})
})
}
  
}
</script>

<style>
	.config-screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
        
	}

	.config-screen .branding *{
		vertical-align: middle;
        align-items: center;
	}

	.config-screen .branding .product-name {		
		font-weight: bold;
		display: inline-block;
        margin-top:60px;
	}

	.config-screen .branding img {
        margin-top:60px;
		filter: drop-shadow(-4px 4px 0px #120E52);
	}
    
    .dashboard-main .branding .emblem-image-wrapper img {
	   display: block;
	   text-align: right;
    
}

	.config-screen .branding .product-name span{
		display:block;
		margin-left: 30px;
		color: #5789B4;
		font-size:400%;
		text-shadow: -0.07em 0.07em 0px #120E52;
		line-height: 100%;
	}

	.config-screen .controls * {
		vertical-align: middle;
        
	}

	.config-screen .controls .border-circled {
        width: 500px;
        border-bottom: 2px solid #5789B4;
	}

	.config-screen .controls .city-input {
		box-sizing: content-box;
		width: 400px;
  		font-size: 133%;
		height: 30px;
 		padding-left: 6px;
        padding-top: 3px;
		border: none;
		outline: none;
		background-color: transparent;
		color: #5789B4;
		text-align: center;
        
	}
    
    .config-screen .controls button {
        background-color: transparent;
        border-style:none;
        outline:none;
    }
    
    .config-screen .controls .search-button img {
        max-width:40px;
        max-height:40px;
        border-style:none;
    }
    
    .config-screen .controls .search-button img:hover {
        cursor:pointer;
        filter: invert(12%) sepia(23%) saturate(5451%) hue-rotate(230deg) brightness(88%) contrast(125%);
    }
    
    .config-screen .controls button:hover{
        cursor:pointer;
    }
    

	.config-screen .controls .city-input::placeholder {
		color: #5789B4;
		opacity: 0.7;
	}

	.config-screen .controls .temperature-unit-selecter {
		display: block;
		text-align: center;
		margin-top: 30px;
	}
     .top-right-buttons{
        display:inline-block;
        position: fixed;
        top: 2%;
        right: 7%;
    }
    
    .top-right-buttons button{
        height: 50px;
        background-color: transparent;
        border-style:none;
        outline: none;
        color:#5789B4;
        font-size: 12px;
        font-weight: bold;
        margin:8px;
    }
    .top-right-buttons button:hover{
        height: 20px;
        background-color: #FFCB3C;
        border-radius:3px;
        color:#FBF9EB;
        cursor:pointer;
    }
    
    .config-screen{ 
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:100%;
        background-image:url("/static/img/bg.png"); 
        background-position: center 0;
        background-repeat: no-repeat;
        background-attachment:fixed;
        background-size: cover;
        -webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */
        -o-background-size: cover;/* 兼容Opera */
        zoom: 1;    
        }
    
    
</style>

