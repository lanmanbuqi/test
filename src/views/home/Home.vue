<template>
	<div id="home" >
		<nav-bar class="home-nav"><div slot="center">购物车</div> </nav-bar>
		<tab-control :titles="['流行','新款','精选']" ref="tabcontrol2" v-show="foo" class="bartop" @tabClick="tabClick"></tab-control>
		<scroll class="content" ref="scroll" :probe-type="3" @position="contentScroll"
		:pull-up-load="true" @pullingUp="loadMore">
			<home-swiper @isload="loada" :banners="banners"></home-swiper>
			<recommends :recommends="recommends"></recommends>
			<feature></feature>
			<tab-control :titles="['流行','新款','精选']" ref="tabcontrol1" class="bartop1" @tabClick="tabClick"></tab-control>
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
				isShowBackTop:false,
				offsetTop:0,
				foo:false,
				saveY:0
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list

			}
		},
		activated() {
			this.$refs.scroll.refresh()
			this.$refs.scroll.scrollTo(0,this.saveY,0)
		},
		deactivated() {
			this.saveY=this.$refs.scroll.scroll.y
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
		destroyed() {
			this.$bus.$off('imgLoad',()=>{
				// this.$refs.scroll && this.$refs.scroll.refresh()
				refresh()
			})
		},
		methods:{

			// 事件监听
			tabClick(index){
				this.currentType=Object.keys(this.goods)[index]
				this.$refs.tabcontrol2.currentIndex=index
				this.$refs.tabcontrol1.currentIndex=index
			},
			backClick(){
				this.$refs.scroll.scrollTo(0,0)
			},
			contentScroll(position){
					this.isShowBackTop = Math.abs(position.y) >1000
					this.foo= Math.abs(position.y) >this.offsetTop
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
			},
			loada(){
				this.offsetTop =this.$refs.tabcontrol1.$el.offsetTop

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

	}
	#home{
		/*margin-top: 44px;*/
		height: 100vh;
		position: relative;

	}
	.showa{
		opacity: 0;
	}
	.bartop1{
		line-height: 44px;
		height: 44px;
	}
	.bartop{
		position: relative;
		z-index: 2;
		height: 44px;
		line-height: 44px;

	}

	.content{
		overflow: hidden;
		position: absolute;
		top:44px;
		bottom:49px;
	}
</style>
