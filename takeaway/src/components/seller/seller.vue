<template>
  <div class="seller" ref="seller">
  	<div class="seller-content">
  		<div class="overview">
  			<h1 class="title">{{seller.name}}</h1>
  			<div class="desc border-1px">
  				<star :size="36" :score="seller.score"></star>
  				<span class="text">({{seller.ratingCount}})</span>
  				<span class="text">月售{{seller.sellCount}}</span>
  			</div>
  			<ul class="remark">
  				<li class="block">
					<h2>起送价</h2>
					<div class="content">
						<span class="stress">{{seller.minPrice}}</span>元
					</div>
  				</li>
  				<li class="block">
					<h2>商家配送</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryPrice}}</span>元
					</div>
  				</li>
  				<li class="block">
					<h2>平均配送时间</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryTime}}</span>分钟
					</div>
  				</li>
  			</ul>
  			<div class="favorite">
  				<i class="icon-favorite" :class="{'active': favorite}"></i>
  				<span class="text">{{favoriteText}}</span>
  			</div>
  		</div>
  		<split></split>
  		<div class="bulletin">
  			<h1 class="title">公告与活动</h1>
  			<div class="content-wrapper border-1px">
			<p class="content">{{seller.bulletin}}</p>
  			</div>
  			<ul class="supports" v-if="seller.supports">
  				<li class="support-item border-1px" v-for="(item,index) in seller.supports">
  					<span class="icon"></span>
  					<span class="text">{{item[index].description}}</span>
  				</li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script>
	import star from 'components/common/star/star'
	import split from 'components/common/split/split'
	import BScroll from 'better-scroll'
	import { saveToLocal, loadFromLocal } from 'assets/js/store.js'
	export default {
		components:{star,split},
		props:{
			seller:{
				type:Object
			}
		},
		data() {
		  	return {
		  		favorite:(()=>{
		  			return loadFromLocal(this.seller.id,'favorite',false);
		  		})
		  	}
		},
		created(){
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		computed:{
			favoriteText(){
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		mounted(){
			 // 页面整体滚动
            this.scroll = new BScroll(this.$refs.seller, {
                click: true
            });
		}
	}
</script>

<style lang="less">
	@import '../../assets/css/mixin.less';
	.seller{
		position: fixed;
		top: 174px;
		bottom:0;
		left:0;
		width:100%;
		overflow: hidden;
		.seller-content{
			.overview{
				padding:18px;
				position: relative;
				.title{
					font-size: 14px;
					line-height: 14px;
				}
				
				.desc{
					font-size:10px;
					line-height:18px;
					padding: 8px 0 18px 0;
					font-size:0;
					.border-1px(7,17,27,.1);
					.star{
						display: inline-block;
						margin-right: 8px;
						vertical-align: top;
					}
					.text{
						display: inline-block;
						font-size:10px;
						vertical-align: top;
						margin-right: 12px;
						line-height: 18px;
						color: rgb(77, 85, 93);
					}
				}
				.remark{
					padding:18px 0;
					display: flex;
					.block{
						flex: 1;
						display: inline-block;
						text-align: center;
						border-right: 1px solid rgba(7, 17, 27, .1);
						&:last-child{
							border:none;
						}
						h2{
							margin-bottom: 4px;
							font-size: 10px;
							color:rgb(147,153,159);
							line-height:10px;
						}
						.content{
							line-height:24px;
							font-size: 10px;
							color:rgb(7,17,27);
							margin-top:4px;

							.stress{
								font-size:24px;
							}
						}
					}
				}
				.favorite{
					position: absolute;
					top: 18px;
					right: 12px;
					// width:50px;
					text-align: center;
					.icon-favorite{
						display: block;
						font-size:24px;
						line-height:24px;
						color: #d4d6d9;
						&.active{
							color:rgb(240,20,20);
						}
					}
					.text{
						font-size:10px;
						line-height:10px;
						margin-top:4px;
						color: rgb(77, 85, 93);
					}
				}
			}
		}
	}
</style>