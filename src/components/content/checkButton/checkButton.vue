<template>
	<div class="check-button" :class="{check:isChecked}">
		<img src="~assets/img/cart/tick.svg"/>
	</div>
</template>

<script>
    export default {
        name: "checkButton",
			props:{
        	isChecked:{
        		type:Boolean,
						default:true
					}
			}
		}

</script>

<style scoped>
.check-button{

	border-radius: 50%;
	border: 2px solid #aaaa;
}
	.check{
		border-color: red;
		background-color: red;
	}
</style>
