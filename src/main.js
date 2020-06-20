import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
import SIdentify from './components/page/Identify';    //自定义组件
import "babel-polyfill";
import axios from 'axios';
Vue.use(axios);
Vue.component("SIdentify",SIdentify);
Vue.use(ElementUI);
Vue.use(axios);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
