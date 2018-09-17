<template>
	<div class="carinfo_wrap">
		<h3>
			{{carinfo.brand}}{{carinfo.series}}<small>
			<br>{{carinfo.price}}万元{{km}}万公里{{carinfo.color}}色排量{{carinfo.engine}}</small>
		</h3>
	</div>
</template>

<script>
	export default{
		computed : {
			carinfo(){
				return this.$store.state.picshow.carinfo;
			},
			km(){
				return Math.round(this.carinfo.km / 1000) / 10;
			}
		}
	}
</script>

<style lang="less">
	.carinfo_wrap{
		padding:10px 12px;

		h3{
			font-size:22px;

			small{
				font-size:16px;
			}
		}
	}
</style>