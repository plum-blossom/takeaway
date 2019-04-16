<template>
  <div>
  	<head-top :seller="seller"></head-top>
	<tab></tab>
	<router-view :seller="seller"></router-view>
  </div>
</template>

<script>
	import axios from 'axios'
	import headTop from 'components/header/head'
	import tab from 'components/tab/tab'
	export default {
		data(){
			return{
				seller:{},
			}

		},
		components:{
			headTop,
			tab
		},
		methods:{

		},
		created(){
			this.$http.get('../../static/data.json')
			    .then( (res) => {
			        this.seller = res.data.seller;
			    })
			    .catch( (err) => {
			        console.log(err);
			    })
			}
	}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
@import '../../assets/css/base.less';


</style>