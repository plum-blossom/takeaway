<template>
	<!-- 增减商品控件 -->
  <div class="cartcontrol">
  	<transition name="move">
	  	<div class="cart-derease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
	  		<span class="inner icon-remove_circle_outline"></span>
	  	</div>
  	</transition>
  	<div class="cart-count" v-show="food.count > 0">
  		{{food.count}}
  	</div>
  	<div class="cart-add icon-add_circle" @click.stop.prevent="addCart">
  		
  	</div>
  </div>
</template>

<script>
	import Vue from 'vue';
	import Bus from 'assets/js/bus.js';

	export default {
	  data() {
	  	return {
	  	}
	  },
	  props:{
	  	food:{
	  		type:Object
	  	}
	  },
	  created(){
	  	// console.log(this.food);
	  },
	  methods:{
	  	// 点击增加商品操作
	  	addCart(event){
	  		if(!this.food.count){
	  			Vue.set(this.food,'count',1);
	  		}else{
	  			this.food.count ++;
	  		}
	  		Bus.$emit('cart.add',event.target);
	  	},
	  	// 点击减少商品操作
	  	decreaseCart(){
	  		if(this.food.count){
	  			this.food.count --;
	  		}
	  	}
	  }
	}
</script>

<style lang="less">
	.cartcontrol{
		font-size:0;
		.cart-derease{
			display: inline-block;
			padding:6px;
			.inner{
				display: inline-block;
				line-height:24px;
				font-size:24px;
				color:rgba(0,160,220);
			}
			&.move-enter-active, &.move-leave-active {
				transition: all .5s;
                transform: translate3d(0, 0, 0);
                .inner{
                    transition: all .5s;
                    transform: rotate(0deg);
                }
				
			}
			&.move-enter, &.move-leave-active {
				opacity: 0;
				transform: translate3d(24px,0,0);
				.inner{
					transform: rotate(180deg);
				}
			}
			
		}
		.cart-count{
			display: inline-block;
			font-size:10px;
			vertical-align: top;
			width:12px;
			padding-top:6px;
			line-height:24px;
			text-align: center;
			color:rgb(147, 153, 159);
		}
		.cart-add{
			display: inline-block;
			padding:6px;
			font-size:24px;
			line-height: 24px;
			color:rgba(0,160,220);
		}
	}
</style>