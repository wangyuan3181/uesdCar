<template>
	<div>
		<CarlistLayout ></CarlistLayout>
	</div>
</template>


<script>
	
	import CarlistLayout from "./layout/CarlistLayout.vue";
	export default {
		components : {
			CarlistLayout
		}
	}
</script>

<style lang="less">
	.layer{
		position: fixed;
		width:90%;
		height:90%;
		z-index:109999;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);

		.closebtn{
			position: absolute;
			width:20px;
			height:20px;
			background-color: orange;
			right:-10px;
			top:-10px;
		}
	}
</style>