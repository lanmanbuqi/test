<template>
	<div id ='detail' >
		<detail-nav-bar ></detail-nav-bar>
		<scroll class="content" ref="scroll">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-images-info :imagesInfo="detailInfo"/>
			<detail-param-info :param-info="paramInfo"/>
			<detail-eval-info :commentInfo="EvalInfo"/>
			<detail-recommend/>
			<goods-list :goods="recommends"/>
		</scroll>
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
		export default {
			name: "Detail",
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
				GoodsList
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
						recommends:[]
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

			},
			mounted(){
				const refresh=debounce(this.$refs.scroll && this.$refs.scroll.refresh,200)
				//监听图片加载完成
				this.detailimgLoad=()=>{
					// this.$refs.scroll && this.$refs.scroll.refresh()
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
		bottom:0px;
	}
</style>
