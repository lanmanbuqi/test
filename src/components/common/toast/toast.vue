<template>
	<div class="toast">
		<div class="toast" v-show="isShow" :class="{show:isShow}">
			<div>{{message}}</div>
		</div>
	</div>
</template>

<script>
    export default {
			name: "toast",
			// props:{
			// 	message{
			// 		type:String,
			// 		default:''
			// 	},
			// 	show:{
			// 		type:Boolean,
			// 		default:false
			// 	}
			// }
			data(){
				return{
					message:'',
					isShow:false
				}
			},
			methods:{
				show(message,duration=2000){
					this.isShow=true
					this.message=message
					setTimeout(()=>{
						this.isShow=false;
						this.message=''
					},duration)
				}
			}
    }
</script>

<style scoped>
	.toast{
		position: fixed;
		white-space: nowrap;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		color: white;
		background-color: rgba(0,0,0,.75);
		z-index: 90;

	}
	.show{
		padding: 8px 10px;
	}
</style>
