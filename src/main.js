import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
const app = createApp(App).use(router)

app.config.globalProperties.$bulidMode = "DEVELOP"
app.config.globalProperties.$userToken = "";

if(app.config.globalProperties.$bulidMode == "DEVELOP"){
    axios.defaults.baseURL="http://localhost:9988"
}
if(app.config.globalProperties.$bulidMode == "RELEASE"){
    axios.defaults.baseURL="http://www.twogenesis.com:8585"
}

app.config.globalProperties.$http = axios;
app.mount('#app')
