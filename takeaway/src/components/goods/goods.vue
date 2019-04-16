<template>
  <div class="goods">
  	<!-- 左侧导航菜单 -->
  	<div class="menu-wrapper" ref="menuWrapper">
  		<ul>
  			<li v-for="(item,index) in goods"
  				class="menu-item"
  				:class="{'current': currentIndex === index}"
  				@click="menuClick(index,$event)"
  				 >
				<span class="text border-1px">
					<span v-show="item.type>0"
					 	  class="icon"
					 	  :class="classMap[item.type]"
					 	  ></span>
					 	{{item.name}}  
				</span>
  			</li>
  		</ul>
  	</div>
  	<!-- 右侧商品列表 -->
  	<div class="foods-wrapper" ref="foodWrapper">
  		<ul>
  			<li v-for="item in goods" class="food-list food-list-hook">
				<h1 class="title">{{item.name}}</h1>
				<ul>
					<li @click="selectFood(food)" v-for="(food,index) in item.foods" class="food-item border-1px">
						<div class="icon">
							<img :src="food.icon" width="57" height="57" alt="">
						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span class="count">月售{{food.sellCount}}</span>
								<span>好评率{{food.rating}}%</span>
							</div>
							<div class="price">
								<span class="now">￥{{food.price}}</span>
								<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
							</div>
						</div>
					</li>
				</ul>
  			</li>
  		</ul>
  	</div>
  	<cart :select-foods="selectFoods"
  		  :delivery-price="seller.deliveryPrice"
          :min-price="seller.minPrice"
          ref="cart"></cart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
	import BScroll from 'better-scroll';
	import cart from 'components/cart/cart';
	import food from 'components/food/food';
	import cartcontrol from 'components/common/cartcontrol/cartcontrol';
	const ERR_OK = 0;
	export default {
	  data() {
	  	return {
	  		goods:[],
	  		listHeight:[], //记录右侧滚动的位置高度
	  		scrollY:0,
	  		selectedFood:{}
	  	}
	  },
	  components:{
	  	cart,
	  	cartcontrol,
	  	food
	  },
	  props:{
	  	seller:{
	  		type:Object
	  	}
	  },
	  computed:{
	  	currentIndex(){
	  		for(let i = 0;i < this.listHeight.length; i++){
	  			// 当前高度
	  			let height1 = this.listHeight[i];
	  			// 下一个高度
	  			let height2 = this.listHeight[i + 1];
	  			if( !height2 ||(this.scrollY >= height1 && this.scrollY < height2)){
	  				return i;
	  			}
	  		}
	  		return 0;
	  	},
	  	selectFoods(){
	  		let foods =[];
	  		this.goods.forEach((good)=>{
	  			good.foods.forEach((food)=>{
	  				if(food.count) {
	  					foods.push(food);
	  				}
	  			})
	  		})
	  		return foods;
	  	}
	  },
	  created(){
	  	this.$http.get('api/goods')
	  		.then((res)=>{
	  			if(res.data.errno == ERR_OK){
	  				this.goods = res.data.data;
	  				// console.log(this.goods);
	  				// DOM 更新了 操作dom时一定要在$nextTick里
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
	  			}else{
	  				console.log('网络故障，请稍后重试');
	  			}
	  			
	  		})
	  		.catch((err)=>{
	  			console.log(err);
	  		})
	  	// 样式设置
	  	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	  },
	  methods:{
	  	menuClick(index,event){
	  		 // better-scroll 可以监听到此事件，浏览器原生不能监听到  防止pc端出现两次点击
	  		 // if(!event._consttucted){
	  		 // 	return;
	  		 // }
	  		 // 获取foodList的列表
	  		 let foodList  = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
	  		 let el = foodList[index];
	  		 // 调用better-scrool方法滚动到响应位置
	  		 this.foodScroll.scrollToElement(el,300);

	  	},
	  	// 初始化better-scroll 参数dom option
	  	_initScroll(){
	  		this.menuScroll = new BScroll(this.$refs.menuWrapper,{
	  			click:true
	  		});

	  		this.foodScroll = new BScroll(this.$refs.foodWrapper,{
	  			click:true,
	  			probeType:3 //监测实时滚动的位置
	  		});

	  		this.foodScroll.on('scroll',(pos)=>{
	  			// 拿到实时的坐标 转换为正值，返回绝对值Math.abs
	  			this.scrollY = Math.abs(Math.round(pos.y))
	  		})

	  	},
	  	_calculateHeight(){
	  		//记录右侧滚动的位置高度
	  		let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            // 第一个区块高度
            this.listHeight.push(height);
            // 其他区块高度
            for(let i=0;i<foodList.length;i++){
            	let item = foodList[i];
            	height += item.clientHeight;
            	this.listHeight.push(height);
            }

	  	},
	  	
	  	// 子组件事件触发
	  	// drop(target){
	  	// 	this.$refs.cart.drop(target);
	  	// },
	  	cartAdd(el){
	  		this.$nextTick(()=>{
	  			this.$refs.cart.drop(el);
	  		})
	  	},
	  	selectFood(food){
	  		this.selectedFood = food;
	  		// 调用food组件的show函数
	  		this.$refs.food.show();
	  	}
	  }
	}
</script>

<style lang="less">
	@import '../../assets/css/mixin.less';
	.goods{
		display: flex;
		position: absolute;
		top: 176px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu-wrapper{
			width:80px;
			flex:0 0 80px;
			background: #f3f5f7;
			.menu-item{
				display: table;
				width:56px;
				height: 54px;
				font-size:12px;
				line-height: 14px;
				padding:0 12px;
				&.current{
					position: relative;
					margin-top:-1px;
					z-index:10;
					background: #fff;
					font-weight: 700;
					.text{
						.border-none();
					}
				}
				.icon{
					display: inline-block;
					vertical-align: top;
					width:12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
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
					display: table-cell;
					width:56px;
					vertical-align: middle;
					font-size:12px;
					.border-1px(7,17,27,.1);
				}
			}
		}
		.foods-wrapper{
			flex: 1;
			.title{
				padding-left: 14px;
				height:26px;
				line-height:26px;
				border-left:2px solid #d9dde1;
				font-size:12px;
				color: rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item{
				display: flex;
				margin:18px;
				padding-bottom: 18px;
				.border-1px(7,17,27,.1);
				&:last-child{
					.border-none();
					margin-bottom: 0;
				}
				.icon{
					flex: 0 0 57px;
					margin-right:10px;
				}
				.content{
					flex: 1;
					.name{
						margin:2px 0 8px;
						line-height:14px;
						font-size:14px;
						color: rgb(7,17,27);
					}
					.desc,.extra{
						font-size:10px;
						color: rgb(147,153,159);
					}
					.desc{
						line-height:12px;
						margin-bottom: 8px;
					}
					.extra{
						line-height:10px;
						.count{
							margin-right:12px;
						}
					}
					.price{
						font-weight:700;
						line-height:24px;
						.now{
							margin-right:8px;
							font-size:14px;
							color:rgb(240,20,20);
						}
						.old{
							text-decoration: line-through;
							font-size:10px;
							color:rgb(147,153,159);
						}
					}
					.cartcontrol-wrapper{
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
</style>