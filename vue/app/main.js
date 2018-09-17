import Vue from "vue";
import Vuex from "vuex";
import iview from "iview";

import App from "./App.vue";
import store from "./store/store.js";

//使用插件
Vue.use(Vuex);
//使用插件，注册的所有的组件都是全局的。如同div、section标签一样，随处可用。
Vue.use(iview);		

new Vue({
	el : "#app",
	components : {
		App
	},
	render(h){
		return h(App);
	},
	store : new Vuex.Store(store)
});