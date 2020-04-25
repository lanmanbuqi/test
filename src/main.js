import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from "components/common/toast/index";
import lazy from "vue-lazyload";

import { Icon } from 'vant';
import { Image } from 'vant';

Vue.use(Image);
Vue.use(Icon);
Vue.use(lazy,{loading:require("assets/img/common/load.png")})
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

