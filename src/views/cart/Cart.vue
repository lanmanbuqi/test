<template>
	<div class="cart">
<!--		导航-->
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{length}})</div>
		</nav-bar>
<!--	商品的列表-->
		<cart-list></cart-list>
<!--		底部汇总-->
		<cart-bottom-bar/>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
	import cartList from "./childComps/cartList";
	import cartBottomBar from "./childComps/cartBottomBar";
	import {mapGetters} from 'vuex'

	export default {
		name:'Cart',
		components:{
			NavBar,
			cartList,
			cartBottomBar
		},
		computed:{
			//两种用法
			// ...mapGetters(['cartLength','cartList'])
			...mapGetters({
				length:'cartLength',
			})
		}
	}
</script>

<style>
	.cart{
		height: 100vh;
	}
	.nav-bar{
		background-color: var(--color-tint);
		color: #fff;
		font-weight: 700;
	}
</style>
