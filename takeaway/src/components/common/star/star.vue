<template>
  <div class="star" :class="starType">
  	<span v-for="itemClass in itemClassArr" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
	// 星星数量
	const LENGTH = 5;
	// 一颗完整的星
	const CLS_ON = 'on';
	// 半颗星
	const CLS_HALF = 'half';
	// 无星
	const CLS_OFF = 'off';
	export default {
	  props:{
	  	size:{ //星星的大小
	  		type:Number
	  	},
	  	score:{ //分数
	  		type:Number
	  	}
	  },
	  computed:{
	  	starType(){
	  		return 'star-'+this.size
	  	},
	  	itemClassArr(){
	  		let arr = [];
	  		// 通过分数算出arr 
	  		// 转换拿到的this.score向下取0.5的倍数
	  		let score = Math.floor(this.score * 2) / 2;
	  		// 判断是否有小数 控制变化,小数半星
	  		let hasDecimal = score % 1 !== 0;
	  		// 整数 全星
	  		let integer = Math.floor(score);
	  		// 添加全星样式
	  		for(let i=0;i<integer;i++){
	  			arr.push(CLS_ON);
	  		}
	  		// 添加半星样式
	  		if(hasDecimal){
	  			arr.push(CLS_HALF)
	  		}
	  		// 添加无星样式
	  		while(arr.length < LENGTH){
	  			arr.push(CLS_OFF)
	  		}
	  		return arr;

	  	}
	  }
	}
</script>

<style lang="less">
	@import '../../../assets/css/mixin.less';
	.star{
		font-size: 0;
		.star-item{
			display: inline-block;
			background-repeat: no-repeat;
		}
		&.star-48{
			.star-item{
				width: 20px;
				height: 20px;
				margin-right: 22px;
				background-size: 20px 20px;
				&:last-child{
					margin-right: 0;
				}
				// 全星
				&.on{
					.bg-image('star/star48_on')
				};
				// 半星
				&.half{
					.bg-image('star/star48_half')
				};
				// 无星
				&.off{
					.bg-image('star/star48_off')
				}
			}
		}
		&.star-36{
			.star-item{
				width: 15px;
				height: 15px;
				margin-right: 16px;
				background-size: 15px 15px;
				&:last-child{
					margin-right: 0;
				}
				// 全星
				&.on{
					.bg-image('star/star36_on')
				};
				// 半星
				&.half{
					.bg-image('star/star36_half')
				};
				// 无星
				&.off{
					.bg-image('star/star36_off')
				}
			}
		}
		&.star-24{
			.star-item{
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px;
				&:last-child{
					margin-right: 0;
				}
				// 全星
				&.on{
					.bg-image('star/star24_on')
				};
				// 半星
				&.half{
					.bg-image('star/star24_half')
				};
				// 无星
				&.off{
					.bg-image('star/star24_off')
				};
			}
		}
	}
</style>