<template>
	<div>
		<h3>共{{$store.state.carlist.count}}个车符合条件</h3>

		<div class="h10"></div>

		<Row>
			<Col :span="2">
				颜色
			</Col>
			<Col :span="22">
				<CheckboxGroup v-model="color">
			        <Checkbox label="红">
			            <span>红</span>
			        </Checkbox>
			        <Checkbox label="白">
			            <span>白</span>
			        </Checkbox>
			        <Checkbox label="蓝">
			            <span>蓝</span>
			        </Checkbox>
			        <Checkbox label="绿">
			            <span>绿</span>
			        </Checkbox>
			        <Checkbox label="粉">
			            <span>粉</span>
			        </Checkbox>
			        <Checkbox label="咖啡">
			            <span>咖啡</span>
			        </Checkbox>
			    </CheckboxGroup>
			</Col>
		</Row>
		<Row>
			<Col :span="2">
				座位数
			</Col>
			<Col :span="22">
				<CheckboxGroup v-model="seat">
			        <Checkbox label="2">
			            <span>2</span>
			        </Checkbox>
			        <Checkbox label="3">
			            <span>3</span>
			        </Checkbox>
			        <Checkbox label="4">
			            <span>4</span>
			        </Checkbox>
			        <Checkbox label="5">
			            <span>5</span>
			        </Checkbox>
			        <Checkbox label="7">
			            <span>7</span>
			        </Checkbox>
			        <Checkbox label="20">
			            <span>20</span>
			        </Checkbox>
			    </CheckboxGroup>
			</Col>
		</Row>
		<Row>
			<Col :span="2">
				发动机
			</Col>
			<Col :span="22">
				<CheckboxGroup v-model="engine">
			        <Checkbox label="1.0">
			            <span>1.0</span>
			        </Checkbox>
			        <Checkbox label="1.2">
			            <span>1.2</span>
			        </Checkbox>
			        <Checkbox label="1.4">
			            <span>1.4</span>
			        </Checkbox>
			        <Checkbox label="1.6T">
			            <span>1.6T</span>
			        </Checkbox>
			        <Checkbox label="2.0">
			            <span>2.0</span>
			        </Checkbox>
			    </CheckboxGroup>
			</Col>
		</Row>
		<Row>
			<Col :span="2">售价（万元）</Col>
			<Col :span="22">
				<Slider :value="price" range @on-change="changePrice" :min="0" :max="100"></Slider>
			</Col>
		</Row>
		<Row>
			<Col :span="2">公里（万公里）</Col>
			<Col :span="22">
				<Slider :value="km" range @on-change="changeKm"  :min="0" :max="100"></Slider>
			</Col>
		</Row>


		<div class="h10"></div>

		<Tag v-for="item in $store.state.carlist.filters" :key="item.k" closable @on-close="removefilter(item.k)">
			{{showTagKV(item.k , item.v)}}
		</Tag>

		<div class="h10"></div>

		<Table :columns="colinfo" :data="$store.state.carlist.results" @on-sort-change="changesort"></Table>
		
		<div class="h10"></div>

		<Page :total="$store.state.carlist.count" :page-size="$store.state.carlist.pagesize" :current="$store.state.carlist.page" @on-change="changepage" @on-page-size-change="changepagesize" show-sizer :page-size-opts="[2,3,5,10,20,50]"/>
	</div>
</template>


<script>
	export default {
		beforeCreate(){
			this.$store.dispatch("carlist/init");
		},
		data(){
			return {
				 
			}
		},
		methods : {
			changepage(page){
				this.$store.dispatch("carlist/changepage" , {page});
			},
			changesort({column , key , order}){
				this.$store.dispatch("carlist/changesort" , {key , order});
			},
			changePrice(v){
				this.$store.dispatch("carlist/changeFilter" , {k : "price" , v});
			},
			changeKm(v){
				v = v.map(item => item * 10000);
				this.$store.dispatch("carlist/changeFilter" , {k : "km" , v});
			},
			changepagesize(pagesize){
				this.$store.dispatch("carlist/changepagesize" , {pagesize});
			},
			showTagKV(k , v){
				if(k == "color"){
					return "颜色：" + v.map(item => item + "色").join(" 或 ");
				}else if(k == "seat"){
					return "座位数：" + v.map(item => item + "座").join(" 或 ");
				}else if(k == "engine"){
					return "发动机：" + v.join(" 或 ");
				}else if(k == "price"){
					return "售价：" + v.map(item => item + "万元").join(" 或 ");
				}else if(k == "km"){
					return "公里数：" + v.map(item => item / 10000 + "万公里").join(" 或 ");
				}
			},
			removefilter(k){
				this.$store.dispatch("carlist/removefilter" , {k});
			}
		},
		computed : {
			colinfo(){
				//这里可以写语句
				return [
					{
						title : "缩略图",
						key : "avatar",
						render(h , {row}){
							return h({
								template : `<div class="rowrow"><img :data-id="${row.id}" :width="80" src=http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar} /></div>`
							});
						}
					},
					{
						title : "id",
						key : "id",
						sortable: 'custom'
					},
					{
						title : "品牌",
						key : "brand"
					},
					{
						title : "车系",
						key : "series"
					},
					{
						title : "价格（万元）",
						key : "price",
						sortable: 'custom'
					},
					{
						title : "公里数（万公里）",
						key : "km",
						sortable: 'custom',
						render(h , {row}){
							//四舍五入
							var km = row.km;
							km = Math.round(km / 1000) / 10;
							//h是createElement的意思，创建一个新元素的意思
							return h({
								template : "<div>" + km + "</div>"
							});
						}
					},
					{
						title : "发动机",
						key : "engine"
					},
					{
						title : "座位数",
						key : "seat"
					},
					{
						title : "颜色",
						key : "color"
					}
				].map(item => {
					if(item.key != this.$store.state.carlist.sortby){
						return item;
					}else{
						return {
							...item ,
							sortType : this.$store.state.carlist.sortdirection == 1 ? "asc" : "desc"
						}
					}
				});
			},
			color : {
				get(){
					if(this.$store.getters["carlist/getfilter"]("color")){
						return this.$store.getters["carlist/getfilter"]("color").v;
					}
					return [];
				},
				set(v){
					this.$store.dispatch("carlist/changeFilter" , {k : "color" , v});
				}
			},
			seat : {
				get(){
					if(this.$store.getters["carlist/getfilter"]("seat")){
						return this.$store.getters["carlist/getfilter"]("seat").v;
					}
					return [];
				},
				set(v){
					this.$store.dispatch("carlist/changeFilter" , {k : "seat" , v});
				}
			},
			engine : {
				get(){
					if(this.$store.getters["carlist/getfilter"]("engine")){
						return this.$store.getters["carlist/getfilter"]("engine").v;
					}
					return [];
				},
				set(v){
					this.$store.dispatch("carlist/changeFilter" , {k : "engine" , v});
				}
			},
			price : {
				get(){
					if(this.$store.getters["carlist/getfilter"]("price")){
						return this.$store.getters["carlist/getfilter"]("price").v;
					}
					return [0,100];
				}
			},
			km : {
				get(){
					if(this.$store.getters["carlist/getfilter"]("km")){
						return this.$store.getters["carlist/getfilter"]("km").v.map(item => item / 10000);
					}
					return [0,100];
				}
			}
		},
		//上树
		mounted(){
			//事件委托，小图片的点击事件
			var self = this;
			$("body").delegate(".rowrow img" , "click" , function(){
				self.$emit("showlayer" , $(this).data("id"));
			});
		}
	}
</script>

<style lang="less">
	.h10{
		height:10px;
	}
	.ivu-row {
		height: 35px;
	}
</style>