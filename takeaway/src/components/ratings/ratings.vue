<template>
  <div class="ratings" ref="ratings">
  	<div class="ratings-content">
  		<div class="overview">
  			<div class="overview-left">
  				<h1 class="score">{{seller.score}}</h1>
  				<div class="title">
  					综合评分
  				</div>
  				<div class="rank">
  					高于周边商家{{ seller.rankRate }}%
  				</div>
  			</div>
  			<div class="overview-right">
  				<div class="score-wrapper">
  					<span class="title">服务态度</span>
  					<star :size="36" :score="seller.serviceScore"></star>
  					<span class="score">{{ seller.serviceScore }}</span>
  				</div>
  				<div class="score-wrapper">
  					<span class="title">商品评价</span>
  					<star :size="36" :score="seller.foodScore"></star>
  					<span class="score">{{ seller.foodScore }}</span>
  				</div>
  				<div class="delivery-wrapper">
  					<span class="title">送达时间</span>
  					
  					<span class="delivery">{{ seller.deliveryTime }}分钟</span>
  				</div>
  			</div>
  		</div>
  		<split></split>
  		<!-- 评论组件 -->
        <rating-select  :select-type="selectType" 
                          :only-content="onlyContent"     
                          :desc="desc"
                          :ratings="ratings"
                          @select="select" 
                          @onlyContent2="onlyContent2"
        ></rating-select>
        <div class="rating-wrapper">
            <ul>
                <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)">
                    <div class="avatar">
                        <img :src="rating.avatar" width="28" height="28">
                    </div>
                    <div class="content">
                        <h1 class="name">{{ rating.username }}</h1>
                        <div class="star-wrapper">
                            <star :size="24" :score="rating.score"></star>
                            <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                        </div>
                        <p class="text">{{ rating.text }}</p>
                        <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                            <i class="icon-thumb_up"></i>
                            <span v-for="item in rating.recommend" class="item">{{ item }}</span>
                        </div>
                        <div class="time">
                            {{ rating.rateTime | formatDate }}
                        </div>
                    </div>
                </li>
            </ul>
       	</div>
  	</div>
  </div>
</template>

<script>
	import star from 'components/common/star/star'
	import split from 'components/common/split/split'
	import ratingSelect from 'components/common/ratingSelect/ratingSelect'
	import {formatDate} from 'assets/js/date.js'
	import BScroll from 'better-scroll'

	const ALL = 2;
    const ERR_OK = 0;

	export default {
		components:{star,split,ratingSelect},
		props:{
			seller:{
				type:Object
			}
		},
	  	data() {
		  	return {
		  		ratings: [],
                selectType: ALL,
                onlyContent: true,
                desc: {
		            all: '全部',
		            positive: '满意',
		            negative: '不满意'
		        }
		  	}
	  	},
	  	created(){
	  		this.$http.get('/api/ratings').then((res) => {
                if (res.data.errno === ERR_OK) {
                    this.ratings = res.data.data;
                    // console.log(this.$refs.ratings);
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.ratings, {
                            click: true
                        });
                    });
                }
            });
	  	},
	  	methods: {
            select(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            onlyContent2(onlyContent) {
                this.onlyContent = onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        }
	}
</script>

<style lang="less">
 	@import '../../assets/css/mixin.less';
 	@import '../../assets/css/base.less';
	.ratings{
		position: fixed;
		top: 174px;
		bottom:0;
		left:0;
		width:100%;
		overflow: hidden;
		.ratings-content{
			.overview{
				display: flex;
				.overview-left{
					flex:0 0 137px;
					padding:18px 0;
					text-align: center;
					.score{
						font-size: 24px;
						line-height: 28px;
						color:rgb(255,153,0);
					}
					.title{
						font-size: 12px;
						margin:6px 0 8px 0;
						// color: rgb(7,17,27);
						// line-height:12px;
					}
					.rank{
						font-size: 10px;
						line-height:10px;
						color: rgb(147,153,159);
					}
				}
				.overview-right{
					flex: 1;
					padding:18px 24px;
					@media only screen and (max-width: 320px) {
	                    padding-left: 6px;
	                }
					.score-wrapper{
						margin-bottom: 8px;
						font-size:0;
						.title{
							display: inline-block;
							font-size:12px;
							margin-bottom: 8px;
							vertical-align: top;
							line-height:18px;
						}
						.star{
							display: inline-block;
							margin:0 12px;
							vertical-align: top;
						}
						.score{
							display: inline-block;
							font-size:12px;
							color:rgb(255,153,0);
							line-height:18px;
							vertical-align: top;
						}
					}
					.delivery-wrapper{
						font-size: 0;
						.title{
							font-size:12px;
							margin-bottom: 8px;
						}
						.delivery{
							margin-left: 12px;
							font-size:12px;
							color: rgb(147,153,159);
						}
					}
				}
			}
			.rating-wrapper{
				font-size:0;
				padding:0 18px;
				.rating-item{
					padding:18px;
					display: flex;
					margin-right: 12px;
					.border-1px(7,17,27,.1);
					.avatar{
						flex: 0 0 56px;
						width:56px;
						height:56px;
						img{
							border-radius: 50%;
						}
						
					}
					.content{
						flex: 1;
						position: relative;
						.name{
							font-size:10px;
							line-height:12px;
						}
						.star-wrapper{
							.star{
								margin:4px 6px 6px 0;
								display: inline-block;
							}
							.delivery{
								display: inline-block;
								font-size: 10px;
								line-height:12px;
								color:rgb(147,153,159);
							}
						}
						.text{
							font-size:12px;
							line-height:18px;
						}
						.recommend{
							.icon-thumb_up{
								display: inline-block;
								color: rgb(0,160,220);
								font-size:12px;
								margin-top:8px;

							}
							.item{
								display: inline-block;
								padding:0 6px;
								margin-top: 6px;
								margin-left: 8px;
								font-size:9px;
								line-height:16px;
								border:1px solid rgba(7,17,27,.1);
								border-radius:2px;
								background: rgb(255,255,255);
								color: rgb(147,153,159);
							}
						}
						.time{
							position: absolute;
							top: 0;
							right: 0;
							font-size: 10px;
							line-height: 12px;
							color: rgb(147,153,159);
						}
					}
				}
			}
		}

	}
</style>