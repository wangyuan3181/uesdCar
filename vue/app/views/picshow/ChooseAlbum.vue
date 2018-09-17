<template>
	<div  class="choosealbum_wrap">
		<ul>
			<li @click="changeAlbum('view')" :class="{'cur' : nowalbum == 'view'}">外观（{{carimages.view.length}}）</li>
			<li @click="changeAlbum('inner')" :class="{'cur' : nowalbum == 'inner'}">内饰（{{carimages.inner.length}}）</li>
			<li @click="changeAlbum('engine')" :class="{'cur' : nowalbum == 'engine'}">发动机（{{carimages.engine.length}}）</li>
			<li @click="changeAlbum('more')" :class="{'cur' : nowalbum == 'more'}">更多（{{carimages.more.length}}）</li>
		</ul>
	</div>
</template>

<script>
	export default{
		computed : {
			carimages(){
				return this.$store.state.picshow.carimages;
			},
			nowalbum(){
				return this.$store.state.picshow.nowalbum;
			}
		},
		methods : {
			changeAlbum(nowalbum){
				this.$store.dispatch("picshow/changeAlbum" , {nowalbum});
			}
		}
	}
</script>

<style lang="less">
	.choosealbum_wrap{
		padding-left: 12px;

		ul{
			list-style: none;

			li{
				float: left;
				width:125px;
				height:40px;
				border:1px solid #eee;
				margin-right: 10px;
				margin-bottom: 10px;
				line-height: 40px;
				text-align: center;
				font-size:16px;
				cursor: pointer;

				&.cur{
					background-color: gold;
					color:#333;
				}
				&:hover{
					background-color: #eee;
					color:#333;
				}
			}
		}
	}
</style>