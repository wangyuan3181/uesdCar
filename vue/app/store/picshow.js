export default {
	//https://vuex.vuejs.org/guide/modules.html
	namespaced: true,
	//数据
	state: {
		id : 1000001 ,
		nowalbum : "view",
		nowidx : 0,
		carinfo : {} ,
		carimages : {
			view : [],
			more : [],
			engine : [],
			inner : [],
		}
	},
	//同步，唯一能够更改state的地方
	mutations: {
		setId(state , {id}){
			state.id = id;
		},
		setCarinfo(state , {carinfo}){
			state.carinfo = carinfo;
		},
		setCarimages(state , {carimages}){
			state.carimages = carimages;
		},
		changeNowalbum(state , {nowalbum}){
			state.nowalbum = nowalbum;
		},
		changeNowidx(state , {nowidx}){
			state.nowidx = nowidx;
		}
	},
	//有副作用的地方，延时、异步、if语句都算是“副作用side effects”
	actions: {
		setId({commit , state}, {id}){
			commit("setId" , {id});
			commit("changeNowalbum" , {nowalbum : "view"});
			commit("changeNowidx" , {nowidx : 0});
		},
		async init({commit , state}){
			//请求
			const {carimages} = await fetch("/api/carimages/" + state.id).then(data=>data.json());
			const {carinfo} = await fetch("/api/carinfo/" + state.id).then(data=>data.json());
			//改变
			commit("setCarinfo" , {carinfo});
			commit("setCarimages" , {carimages});
		},
		//改变图集
		changeAlbum({commit , state} , {nowalbum}){
			//改变图集
			commit("changeNowalbum" , {nowalbum});
			//改变序号
			commit("changeNowidx" , {nowidx : 0});
		},
		//下一张图片
		goNext({commit , state}){
			var nowidx = state.nowidx;
			//看看有没有到这个图集的尾巴
			if(nowidx < state.carimages[state.nowalbum].length - 1){
				commit("changeNowidx" , {nowidx : nowidx + 1});
			}else{
				commit("changeNowidx" , {nowidx : 0});
				
				if(state.nowalbum == "view"){
					commit("changeNowalbum" , {nowalbum : "inner"});
				}else if(state.nowalbum == "inner"){
					commit("changeNowalbum" , {nowalbum : "engine"});
				}else if(state.nowalbum == "engine"){
					commit("changeNowalbum" , {nowalbum : "more"});
				}else if(state.nowalbum == "more"){
					commit("changeNowalbum" , {nowalbum : "view"});
				}
			}
		}
	}
}