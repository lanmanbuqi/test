<template>
	<div id ='detail' >
		<detail-nav-bar @titleClick="titleClick" ref="nav" />
		<scroll class="content"
						ref="scroll"
						@position="contentScroll"
						:probe-type="3">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-images-info :images-info="detailInfo"/>
			<detail-param-info ref="params" :param-info="paramInfo"/>
			<detail-eval-info ref="eval" :comment-info="EvalInfo"/>
			<detail-recommend ref="commend"/>
			<goods-list  :goods="recommends"/>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
		<detail-bottom-bar @addCart="addToCart"/>

	</div>
</template>

<script>
		import DetailNavBar from "./childComps/DetailNavBar";
   	import DetailSwiper from "./childComps/DetailSwiper";
		import {getDetail,Goods,getRecommend ,Shop,GoodsParam} from "network/detail";
		import DetailBaseInfo from './childComps/DetailBaseInfo'
		import DetailShopInfo from "./childComps/DetailShopInfo";
		import Scroll from "components/common/scroll/Scroll";
		import DetailImagesInfo from "./childComps/DetailImagesInfo";
		import DetailParamInfo from "./childComps/DetailParamInfo";
		import {debounce} from "common/utils";
		import DetailEvalInfo from "./childComps/DetailEvalInfo";
		import DetailRecommend from "./childComps/DetailRecommend";
		import GoodsList from "components/content/goods/GoodsList";
		import DetailBottomBar from "./childComps/DetailBottomBar";
		import {backTopMixin} from 'common/mixin.js'


		export default {
			name: "Detail",
			mixins:[backTopMixin],
			components: {
				DetailNavBar,
				DetailSwiper,
				DetailBaseInfo,
				DetailShopInfo,
				Scroll,
				DetailImagesInfo,
				DetailParamInfo,
				DetailEvalInfo,
				DetailRecommend,
				GoodsList,
				DetailBottomBar,

			},
			data(){
        	return{
        		iid:null,
						topImages:[],
						goods:{},
						shop:{},
						detailInfo:{},
						paramInfo:{},
						detailimgLoad:null,
						detailImgLoad:null,
						EvalInfo:{},
						recommends:[],
						themeTopYs:[],
						getThemetopY:null,
						currentIndex:0

					}
			},
			methods:{
				addToCart(){
					const  product={};
					product.image=this.topImages[0];
					product.title=this.goods.title;
					product.desc=this.goods.desc;
					product.price=this.goods.realPrice;
					product.iid=this.iid;

					//添加到仓库
					this.$store.dispatch('addCart',product).then(res=>{
						this.$toast.show(res,1500)
					})

				},



				//监听滚动位置存储在themeTopYs中
				titleClick(index){
					this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
				},
				//滚动控制title的变化
				contentScroll(position){
					let length=this.themeTopYs.length
					const positionY =-position.y

					for(let i=0;i<length;i++){
						if(this.currentIndex !==i && (i < length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
							||(i == length-1 && positionY>this.themeTopYs[i])){
							this.currentIndex=i;
							this.$refs.nav.currentIndex=this.currentIndex
						}
					}

					this.isShowBackTop = Math.abs(position.y) >1000
				}
			},
			created() {
				//获取iid
        	this.iid=this.$route.params.iid

				//根据iid请求详情数据
				getDetail(this.iid).then(res=>{


					//获取顶部的图片轮播数据
					const data=res.result;
					this.topImages=res.result.itemInfo.topImages
					//获取商品信息
					this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

					//创建店铺信息
					this.shop=new Shop(data.shopInfo)

					//报错商品详情数据
					this.detailInfo=data.detailInfo;

					//获取参数信息
					this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

					//获取评价信息
					if (data.rate.list.length!=0) {
						this.EvalInfo = data.rate.list[0];
						// console.log(this.EvalInfo);
					}

				})

				//请求推荐数据
				getRecommend().then(res=>{
						this.recommends=res.data.list
				})


				this.getThemetopY=debounce(()=>{
					//把titles里各个主键的y值加入themeTopYs数组
					this.themeTopYs=[]
					this.themeTopYs.push(0)
					this.themeTopYs.push(this.$refs.params.$el.offsetTop);
					this.themeTopYs.push(this.$refs.eval.$el.offsetTop);
					this.themeTopYs.push(this.$refs.commend.$el.offsetTop);

				},100)
			},
			mounted(){
				const refresh=debounce(this.$refs.scroll && this.$refs.scroll.refresh,200)
				//监听图片加载完成
				this.detailimgLoad=()=>{
					// this.$refs.scroll && this.$refs.scroll.refresh()
					this.getThemetopY()
					refresh()
				}
				this.$bus.$on('detailimgLoad',this.detailimgLoad)
				this.detailImgLoad=()=>{
					// this.$refs.scroll && this.$refs.scroll.refresh()
					refresh()
				}
				this.$bus.$on('detailImgLoad',	this.detailImgLoad)




			},
			destroyed(){
				//  	取消监听全局事件
				this.$bus.$off('detailimgLoad',this.detailimgLoad)
				this.$bus.$off('detailImgLoad',this.detailImgLoad)
			}
		}
</script>

<style scoped>

	#detail{
		position: relative;
		z-index: 11;
		background-color: #fff;
		height: 100vh;
	}
	.content{
		overflow: hidden;
		position: absolute;
		top:44px;
		bottom:49px;
	}

</style>
