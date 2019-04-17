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
  			<div class="favorite" @click="toggleFavorite">
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
  					<span class="icon" :class="classMap[index]"></span>
  					<span class="text">{{item.description}}</span>
  				</li>
  			</ul>
  		</div>
  		<split></split>
  		<div class="pics">
  			<h1 class="title">商家实景</h1>
  			<div class="pic-wrapper" ref="picWrapper">
  				<ul class="pic-list" ref="picList">
  					<li class="pic-item" v-for="pic in seller.pics">
  						<img :src="pic" width="120" height="90" alt="">
  					</li>
  				</ul>
  			</div>
  		</div>
  		<split></split>
  		<div class="info">
  			<h1 class="title">商家信息</h1>
  			<ul>
  				<li class="info-item borde-1px" v-for="item in seller.infos">{{item}}</li>
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
	const ERR_OK = 0;

	export default {
		components:{star,split},
		data() {
		  	return {
		  		favorite:(()=>{
		  			return loadFromLocal(this.seller.id,'favorite',false);
		  		}),
		  		seller:{
		  			type:Object
		  		}
		  	}
		},
		created(){
			// 活动样式设置
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			// 加载seller数据
			this.$http.get('/api/seller').then((res) => {
                if (res.data.errno === ERR_OK) {
                    this.seller = res.data.data;
                    // 页面整体滚动
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.seller, {
                            click: true
                        });
                    });
                     // 商家图片横向滚动
                    if (this.seller.pics) {
		                let picWidth = 120;
		                let margin = 6;
		                let width = (picWidth + margin) * this.seller.pics.length - margin;
		                this.$refs.picList.style.width = width + 'px';
		                this.$nextTick(() => {
		                    this.picScroll = new BScroll(this.$refs.picWrapper, {
		                        scrollX: true,
		                        eventPassthrough: 'vertical'
		                    });
		                });
		            }
                }
            });
		},
		computed:{
			favoriteText(){
				return this.favorite ? '收藏' : '已收藏';
			}
		},
		methods:{
			toggleFavorite(){
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id,'favorite',this.favorite);
			}
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
					width:50px;
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
			.bulletin{
				padding:18px;
				.title{
					font-size:14px;
				}
				.content-wrapper{
					border-bottom: 1px solid rgba(7,17,27,.1);
					.content{
						font-size:12px;
						line-height:24px;
						color:rgb(240,20,20);
						padding:8px 12px 16px 12px;
					}
				}
				.supports{
					.support-item{
						padding:16px 12px;
						border-bottom: 1px solid rgba(7,17,27,.1);
						&:last-child{
							border:none;
						}
						.icon{
							display: inline-block;
							vertical-align: top;
							width:16px;
							height: 16px;
							margin-right: 6px;
							background-size: 16px 16px;
							&.decrease{
								.bg-image('../../assets/images/goods/decrease_3');
							}
							&.discount{
								.bg-image('../../assets/images/goods/discount_3');
							}
							&.guarantee{
								.bg-image('../../assets/images/goods/guarantee_3');
							}
							&.invoice{
								.bg-image('../../assets/images/goods/invoice_3');
							}
							&.special{
								.bg-image('../../assets/images/goods/special_3');
							}
						}
						.text{
							font-size:12px;
							line-height: 16px;
						}
					}
				}

			}
			.pics{
				padding:18px;
				.title{
					font-size:14px;
					color: rgb(7, 17, 27);
					margin-bottom: 12px;
				}
				.pic-wrapper{
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					.pic-list{
						font-size:0;
						.pic-item{
							display: inline-block;
							margin-right: 6px;
							width: 120px;
							height:90px;
							&:last-child{
								margin:0;
							}
						}
						
					}
				}
			}
			.info{
				padding:18px;
				color: rgb(7, 17, 27);
				.title{
					font-size:14px;
					padding-bottom: 12px;
					.border-1px(7, 17, 27, .1);
				}
				.info-item{
					.border-1px(7,17,27,.1);
					padding:16px 12px;
					font-size: 12px;
					line-height:16px;
					&:last-child{
						.border-none();
					}
				}
			}
		}
	}
</style>