<template>
	<div class="cart-list">
		<Scroll class="content" ref="scroll">
			<cart-list-item
				v-for="(item,index) in cartList"
				:key='index'
				:item-info="item"/>
		</Scroll>
	</div>
</template>

<script>
	import Scroll from "components/common/scroll/Scroll";
	import cartListItem from "./cartListItem";
	import {mapGetters} from 'vuex'
    export default {
			name: "cartList",
			components:{
				Scroll,
				cartListItem
			},
			computed:{
        	...mapGetters(['cartList'])
			},
			activated() {
				this.$refs.scroll.refresh()
			}
		}
</script>

<style scoped>
	.cart-list{
		height: calc(100% - 84px - 49px);
	}
	.content{
		height:100%;
		overflow:hidden;
	}
</style>
