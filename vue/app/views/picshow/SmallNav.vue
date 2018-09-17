<template>
	<div class="smallnav_wrap">
		<div class="unit" ref="unit" :style="'left:' + -290 * Math.floor(this.nowidx / 4) + 'px'">
			<ul v-for="i in totalPageAmount" :key="i">
				<li v-for="j in 4" :class="{'cur' : (i - 1) * 4 + j - 1 == nowidx}" :data-idx=" (i - 1) * 4 + j - 1" :key="j">
					<img v-if="images[(i - 1) * 4 + j - 1] != undefined" :src="`http://127.0.0.1:3000/images/carimages_small/${id}/${nowalbum}/${images[(i - 1) * 4 + j - 1]}`" alt="">
				</li>
			</ul>
		</div>
		<div class="circles" ref="circles">
			<span v-for="i in totalPageAmount" :style="'width:' + 270 / totalPageAmount + 'px'"  :class="{'cur' : Math.floor(nowidx / 4) == (i - 1)}" :key="i"></span>
		</div>
	</div>
</template>

<script>
	export default{
		mounted(){
			var self = this;
			//事件委托
			$(this.$refs.circles).delegate("span" , "click" , function(){
				$(self.$refs.unit).stop(true).css({"left" : -290 * $(this).index()});
				$(this).addClass("cur").siblings().removeClass("cur");
			});

			$(this.$refs.unit).delegate("li" , "click" , function(){
				var nowidx = $(this).data("idx");
				self.$store.commit("picshow/changeNowidx" , {nowidx});
			})
		},
		computed : {
			id(){
				return this.$store.state.picshow.id;
			},
			nowidx(){
				return this.$store.state.picshow.nowidx;
			},
			nowalbum(){
				return this.$store.state.picshow.nowalbum;
			},
			images(){
				return this.$store.state.picshow.carimages[this.nowalbum];
			},
			//总页数
			totalPageAmount(){
				return Math.ceil(this.images.length / 4);
			}
		}
	}
</script>

<style lang="less">
	.smallnav_wrap{
		padding-left:10px;
		overflow: hidden;

		.circles{
			span{
				float: left;
				width:270/4px;
				box-sizing:border-box;
				border-right:3px solid black;
				height:12px;
				background-color: #eee;
				&:last-child{
					border-right-color:#eee;
 					
 					&.cur{
 						border-right-color: gold;
 					}
				}

				&.cur{
					background-color: gold;
				}
			}
		}

		.unit{
			position: relative;
			width:50000px;
			transition:all .5s ease 0s;

			ul{
				list-style:none;
				width:290px;
				overflow: hidden;
				float: left;

				li{
					width:130px;
					float: left;
					margin-right: 10px;
					position: relative;

					&:nth-child(2n){
						margin-right: 0;
					}

					img{
						width:100%;
					}

					&.cur::before{
						background-color: rgba(0,0,0,0);
					}

					&::before{
						content:"";
						position: absolute;
						width:100%;
						height:100%;
						background-color: rgba(0,0,0,.5);
					}
				}
			}
		}
	}
</style>