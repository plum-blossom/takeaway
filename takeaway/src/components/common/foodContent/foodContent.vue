<template>
  <div>
  	<div class="content">
		<h1 class="title">{{food.name}}</h1>
		<div class="detail">
			<span class="sell-count">月售{{food.sellCount}}</span>
			<span class="rating">好评率{{food.rating}}%</span>
		</div>
		<div class="price">
			<span class="now">￥{{food.price}}</span>
			<span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
		</div>
		<div class="cartcontrol-wrapper">
			<cartcontrol :food="food"></cartcontrol>
		</div>
		<transition name="fade" v-show="showFoodCont">
			<div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">
				加入购物车
			</div>
		</transition>
	</div>
  </div>
</template>

<script>
	export default {
		props:{
			food:{
				type:Object
			},
			showFoodCont:{
				type:String
			}
		},
		methods:{
			addFirst(){

			}
		}
	}
</script>

<style>

</style>