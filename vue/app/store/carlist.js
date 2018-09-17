//公用函数请求服务器 
async function fetchServer(state){
	const {results , count} = await fetch("/api/car" , {
		method: "POST" ,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}, 
		body : JSON.stringify({
			page : state.page,
			pagesize : state.pagesize,
			sortdirection : state.sortdirection,
			sortby : state.sortby,
			filters : state.filters
		})
	}).then(data=>data.json());

	return {results , count}
}

import Vue from "vue";

export default {
	//https://vuex.vuejs.org/guide/modules.html
	namespaced: true,
	//数据
	state: {
		//当前页
		page : 1,
		//页面尺寸
		pagesize : 3,
		//排序
		sortby : "id",
		//方向
		sortdirection : 1,
		//过滤器
		filters : [
			 
		],
		//汽车的结果数据
		results : [],
		//数据总数
		count : 0
	},
	//同步，唯一能够更改state的地方
	mutations: {
		setResults(state , {results}){
			state.results = results;
		},
		setCount(state , {count}){
			state.count = count;
		},
		setPage(state , {page}){
			state.page = page;
		},
		setPagesize(state , {pagesize}){
			state.pagesize = pagesize;
		},
		setSortby(state , {sortby}){
			state.sortby = sortby;
		},
		setSortdirection(state , {sortdirection}){
			state.sortdirection = sortdirection;
		},
		//增加一个过滤
		addFilter(state , {k , v}){
			//Vue2以来，数组、对象基本没有视图更新问题了。学习这个知识就是为了面试
			//https://cn.vuejs.org/v2/api/#vm-set
			Vue.set(state.filters , state.filters.length , {k , v})

			//这里当然可以push：
			// state.filters.push({k , v})
		},
		//删除一个过滤
		removeFilter(state , {k}){
			state.filters = state.filters.filter(item => item.k != k);
		},
		//更改一个过滤
		updateFilter(state , {k , v}){
			state.filters = state.filters.map(item => item.k == k ? {k , v} : item);
		}
	},
	//有副作用的地方，延时、异步、if语句都算是“副作用side effects”
	actions: {
		//初始化
		async init({commit , state}){
			//发请求
			const {results , count} = await fetchServer(state);
			//改变结果
			commit("setResults" , {results});
			//改变数量
			commit("setCount" , {count});
		},
		//改变页码
		async changepage({commit , state} , {page}){
			//改变页码
			commit("setPage" , {page});
			//发请求
			const {results , count} = await fetchServer(state);
			//改变结果
			commit("setResults" , {results});
			//改变数量
			commit("setCount" , {count});
		},
		//改变排序
		async changesort({commit , state} , {key , order}){
			//改变页码
			commit("setPage" , {page : 1});
			//改变排序
			commit("setSortby" , {sortby : key});
			//改变排序方向
			commit("setSortdirection" , {sortdirection : order == "asc" ? 1 : -1});
			//发请求
			const {results , count} = await fetchServer(state);
			//改变结果
			commit("setResults" , {results});
			//改变数量
			commit("setCount" , {count});
		},
		//改变过滤器
		async changeFilter({commit , state} , {k , v}){
			if(Array.isArray(v) && v.length == 0){
				//删除过滤器
				commit("removeFilter" , {k});
			}else{
				//判断当前的k是否已经存在
				var isExist = false;	//假设不存在
				for(let i = 0 ; i < state.filters.length ; i++){
					if(state.filters[i].k == k){
						isExist = true;
						break;
					}
				}
				if(isExist){
					//如果这个项存在，就更改
					commit("updateFilter" , {k , v})
				}else{
					commit("addFilter" , {k , v});
				}
			}

			//发请求
			const {results , count} = await fetchServer(state);
			//改变结果
			commit("setResults" , {results});
			//改变数量
			commit("setCount" , {count});
		},
		async removefilter({commit , state} , {k , v}){
			//删除过滤器
			commit("removeFilter" , {k});
			//发请求
			const {results , count} = await fetchServer(state);
			//改变结果
			commit("setResults" , {results});
			//改变数量
			commit("setCount" , {count});
		},
		async changepagesize({commit , state} , {pagesize}){
			commit("setPage" , {page : 1});
			commit("setPagesize" , {pagesize});
			//发请求
			const {results , count} = await fetchServer(state);
			//改变结果
			commit("setResults" , {results});
			//改变数量
			commit("setCount" , {count});
		}
	},
	//就相当于组件中的computed，计算后的
	//https://vuex.vuejs.org/guide/getters.html
	getters : {
		getfilter : (state) => (k) => {
    		return state.filters.filter(item => item.k == k)[0];
		}
	}
}