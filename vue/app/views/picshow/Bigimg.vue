<template>
	<div class="bigimg_wrap">
		<img :width="picW" :style="'left:' + picLeft + 'px'" :src="`http://127.0.0.1:3000/images/carimages/${id}/${nowalbum}/${images[nowidx]}`" alt="">
		<button>左</button>
		<button @click="goNext()">右</button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				picW : 0,
				picLeft : 0
			}
		},
		mounted(){
			//得到浏览器窗口宽度、高度
			var windowW = document.documentElement.clientWidth;
			var windowH = document.documentElement.clientHeight;

			//设置图片的宽度
			this.picW = (windowW - 301) * 0.70;
			//设置图片的left
			this.picLeft = ((windowW - 301) - this.picW) / 2

			var self = this;

			window.onresize = function(){
				windowW = document.documentElement.clientWidth;
				windowH = document.documentElement.clientHeight;

				//设置图片的宽度
				self.picW = (windowW - 301) * 0.85;
				//设置图片的left
				self.picLeft = ((windowW - 301) - self.picW) / 2
			}
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
		},
		methods : {
			goNext(){
				this.$store.dispatch("picshow/goNext");
			}
		}
	}
</script>

<style lang="less">
	.bigimg_wrap{
		color:white;
		height:100%;

		img{
			position: absolute;
			top:50%;
			transform:translateY(-50%);
		}
	}
</style>