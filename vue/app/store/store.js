import picshow from "./picshow.js";
import carlist from "./carlist.js";
import createLogger from 'vuex/dist/logger';

export default {
	modules: {
		picshow,
		carlist
	},
	//https://vuex.vuejs.org/guide/plugins.html
	plugins: [createLogger()]
}