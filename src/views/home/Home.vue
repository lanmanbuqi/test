<template>
	<div id="home" >
		<nav-bar class="home-nav"><div slot="center">购物车</div> </nav-bar>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
		:pull-up-load="true" @pullingUp="loadMore">
			<home-swiper :banners="banners"></home-swiper>
			<recommends :recommends="recommends"></recommends>
			<feature></feature>
			<tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
			<goods-list :goods="showGoods" />
		</scroll>
<!--		@click.native 监听一个组件的原生事件，必须要给对应事件加上。native修饰符-->
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>

	import HomeSwiper from "views/home/children/HomeSwiper";
	import NavBar from "components/common/navbar/NavBar";
	import {
		getHomeMultidata,
		getHomeGoods
	} from "network/home";
	import Recommends from "views/home/children/Recommends";
	import feature from "views/home/children/feature";
	import TabControl from "components/content/tabcontrol/TabControl";
	import GoodsList from "components/content/goods/GoodsList";
	import Scroll from "components/common/scroll/Scroll";
	import BackTop from "components/content/backtop/BackTop";
	import {debounce} from "common/utils";


	export default{
		name:'Home',
		components: {
			NavBar,
			HomeSwiper,
			Recommends,
			feature,
			TabControl,
			GoodsList,
			Scroll,
			BackTop

		},
		data(){
			return{
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]},

				},
				currentType:'pop',
				isShowBackTop:false
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list

			}
		},
		created() {
			//1.请求多个数据
			this.getHomeMultidata()
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			 const refresh=debounce(this.$refs.scroll && this.$refs.scroll.refresh,300)
			//监听图片加载完成
			this.$bus.$on('imgLoad',()=>{
				 // this.$refs.scroll && this.$refs.scroll.refresh()
				 refresh()
			})
		},
		methods:{

			// 事件监听
			tabClick(index){
				this.currentType=Object.keys(this.goods)[index]
			},
			backClick(){

				this.$refs.scroll.scrollTo(0,0)
			},
			contentScroll(position){
					this.isShowBackTop = Math.abs(position.y) >1000
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
			},
			// 网络请求
			getHomeMultidata(){
				getHomeMultidata().then(res=>{
					this.banners=res.data.banner.list
					this.recommends=res.data.recommend.list
				})
			},
			getHomeGoods(type){
				const page=this.goods[type].page+1
				getHomeGoods(type,page).then(res=>{
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page ++

					this.$refs.scroll.finishPullUp()
				})
			}
		}

	}
</script>

<style scoped>
	.home-nav{
		background-color: var(--color-tint);
		color:white;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}
	#home{
		/*margin-top: 44px;*/
		height: 100vh;
		position: relative;

	}
	.tab-control{
		height: 48px;
		line-height: 44px;
		position: sticky;
		top:44px;
		z-index: 9;
	}
	.content{
		overflow: hidden;
		position: absolute;
		top:44px;
		bottom:49px;
	}
</style>
