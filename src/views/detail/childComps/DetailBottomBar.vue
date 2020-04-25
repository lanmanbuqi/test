<template>
	<div id="bottom-bar">
		<div class="bar-item bar-left">
			<div>
				<i class="service"></i>
				<span class="text">客服</span>
			</div>
			<div>
				<i class="shop"></i>
				<span class="text">店铺</span>
			</div>
			<div>
				<i class="select"></i>
				<span class="text">收藏</span>
			</div>
		</div>
			<div class="bar-item bar-right">
				<div class="cart" @click="addToCart">加入购物车</div>
				<div class="buy">购买</div>
			</div>

	</div>

</template>

<script>
    export default {
			name: "DetailBottomBar",
			methods:{
				addToCart(){
					this.$emit('addCart')

				}
		}
    }
</script>

<style scoped>
	#bottom-bar{
		height: 49px;
		position: fixed;
		background-color: #fff;
		left: 0px;
		right: 0px;
		bottom: 0px;
		display: flex;
		text-align: center;
	}
	.bar-item{
		flex:1;
		display: flex;
	}
	.bar-item>div{
		flex: 1;
	}
	.bar-left .text{
		font-size: 13px;
	}
	.service{
		display: block;
		width: 22px;
		height: 22px;
		margin: 5px auto 3px;
		background: url("~assets/img/detail/people.svg")0 0/100%;
	}
	.shop{
		display: block;
		width: 22px;
		height: 22px;
		margin: 5px auto 3px;
		background: url("~assets/img/detail/bottom.svg")0 0/100%;
	}
	.select{
		display: block;
		width: 22px;
		height: 22px;
		margin: 5px auto 3px;
		background: url("~assets/img/detail/nice.svg")0 0/100%;

	}

	.bar-right{
		font-size:15px;
		color: #fff;
		line-height: 49px;
	}
	.bar-right .cart{
		background-color: #ffe817;
		color: #333;
	}
	.bar-right .buy{
		background-color: #f69;
	}
	.sport-ball{
		position: absolute;
		left: 255px;
		bottom: 20px;
	}
</style>
