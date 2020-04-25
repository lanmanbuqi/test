<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button
				:is-checked="isSelectAll"
				class="check-button"
				@click.native="checkClick" />
			<span>全选</span>
		</div>

		<div class="price">
			合计：{{totalPrice}}
		</div>
		<div class="calculate" @click="calcClick">
			去计算({{checkLength}})
		</div>

	</div>

</template>

<script>
	import checkButton from "components/content/checkButton/checkButton";
    export default {
        name: "cartBottomBar",
			components:{
        	checkButton
			},
			methods:{
        	checkClick(){
        		if (this.isSelectAll){
        			this.$store.getters.cartList.forEach(item=>item.checked=false)
						}else{
							this.$store.getters.cartList.forEach(item=>item.checked=true)
						}
					},
					calcClick(){
						if(!this.isSelectAll){
							this.$toast.show('请选择购买的商品',2000)
							}
						if(this.$store.getters.cartList.find(item=>item.checked==true)){
							this.$toast.show('已提交',2000)
						}
		    	}
			},
			computed:{
        	totalPrice(){
						return this.$store.getters.cartList.filter(item=>{
							return item.checked
						}).reduce((preValue,item)=>{
							return preValue + item.price * item.count
						},0).toFixed(2)
					},
					checkLength(){
        		return this.$store.getters.cartList.filter(item=>item.checked).length
					},
				isSelectAll(){
        	// return	!(this.$store.getters.cartList.filter(item=>!item.checked).length)
					if (this.$store.getters.cartList.length === 0) return false;
					return !this.$store.getters.cartList.find(item=>!item.checked)
        	}
			}
    }
</script>

<style scoped>
	.bottom-bar{
		display: flex;
		position: relative;

		height: 40px;
		line-height: 40px;
		background-color: #eee;

		font-size: 14px;
	}
	.check-content{
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: 60px;

	}
	.check-button{
		width: 20px;
		height: 20px;
		line-height: 20px;
	}
	.price{
		margin-left: 40px;
		flex: 1;
	}
	.calculate{
		padding-left: 10px;
		background-color: #ff6699;
		width: 90px;
	}
</style>
