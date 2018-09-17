<template>
	<div class="picshow_wrap">
		<Bigimg></Bigimg>

		<div class="right_part">
			<Carinfo></Carinfo>
			<div class="cl"></div>
			<ChooseAlbum></ChooseAlbum>
			<div class="cl"></div>
			<SmallNav></SmallNav>
		</div>
	</div>
</template>

<script>
	import Carinfo from "./Carinfo.vue";
	import ChooseAlbum from "./ChooseAlbum.vue";
	import SmallNav from "./SmallNav.vue";
	import Bigimg from "./Bigimg.vue";
	export default{
		//最早的生命周期，一定负责发出init命令
		beforeCreate(){
			this.$store.dispatch("picshow/init");
		},
		components : {
			Carinfo,
			ChooseAlbum,
			SmallNav,
			Bigimg
		}
	}
</script>

<style lang="less">
	*{
		margin:0;
		padding:0;
	}
	.cl{
		clear: both;
	}
	.picshow_wrap{
		position: absolute;
		width:100%;
		height:100%;
		top:0;
		left:0;
		background : black;

		.right_part{
			position: absolute;
			right:0;
			top:0;
			width:300px;
			height:100%;
			border-left:1px solid #ccc;
			color:white;
		}
	}
</style>