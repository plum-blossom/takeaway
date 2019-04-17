import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Index from 'components/index/index'
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'

Vue.use(Router)

export default new Router({
	linkActiveClass:'active',
  	routes: [
	    {
	      path: '/',
	      component: App,
	      children: [ 
	      	//地址为空时跳转home页面
	        {
	            path: '',
	            redirect: '/index'
	        },
	        {
		      path: '/index',
		      name: 'Index',
		      component: Index,
		      children: [
		      	{
			      path: '/',
			      name: 'Goods',
			      component: Goods
			    },
		      	{
			      path: '/goods',
			      name: 'Goods',
			      component: Goods
			    },
			    {
			      path: '/seller',
			      name: 'Seller',
			      component: Seller
			    },
			    {
			      path: '/ratings',
			      name: 'Ratings',
			      component: Ratings
			    }

		      ]
		    }
	      	
	      ]
	    }
  	]
})
