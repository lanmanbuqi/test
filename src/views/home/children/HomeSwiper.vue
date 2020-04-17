<template>
	<swiper>
		<swiper-item v-for="item in banners" :key="item.index">
			<a :href='item.link'>
				<img :src="item.image" @load="isload" alt="">
			</a>
		</swiper-item>
	</swiper>

</template>

<script>
	import {Swiper, SwiperItem} from 'components/common/swiper';
    export default {
			name: "HomeSwiper",
			data(){
				return{
					isload1:true
				}
			},
			props:{
					banners:{
						type:Array,
						default(){
							return[]
						}
					}
			},
			components:{
				Swiper,
				SwiperItem
			},
			methods:{
				isload(){
					if(this.isload1){
						this.$emit('isload')
						this.isload1=false
					}

				}
			}

    }

</script>

<style scoped>

</style>
