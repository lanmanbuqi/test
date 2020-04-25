import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from "components/common/toast/index";

//安装toast插件

Vue.config.productionTip = false
//创建事件总线
// Vue.prototype.$bus=new Vue()
Vue.prototype.$bus=new Vue()
Vue.use(toast)

new Vue({
  render: h => h(App),
	router,
	store
}).$mount('#app')

