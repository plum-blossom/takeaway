# Vue +less 高仿饿了么外卖 App
> 项目描述:基于Vue+vue-router+axios+better-scroll+Less+Es6等开发的一款外卖商店APP,页面参考于饿了么的外卖商店，使用flex布局适配常见移动端。后台数据是写好的json，利用后端代理获取数据。localStorage缓存是否收藏。其有商品展示页、商品详情页、购物车、评价页、商家页。

## 项目树
```

│  .babelrc
│  .editorconfig
│  .gitignore
│  .postcssrc.js
│  index.html
│  npm-debug.log
│  package.json
│  README.md
│
├─build
│      build.js
│      check-versions.js
│      logo.png
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│
├─dist
│  │  index.html
│  │
│  └─static
│      │  data.json
│      │
│      ├─css
│      │      app.96a6322c485a3cca4a6b7bf685751dcc.css
│      │
│      └─js
│              app.9e7427bcce4597031f64.js
│              manifest.3ad1d5771e9b13dbdad2.js
│              vendor.031abeb4fc1d25132f04.js
│
├─resource
│  │  外卖01_商品页.jpg
│  │  外卖02_商品页_公告及优惠信息.jpg
│  │  外卖03_商品页_购物车详情.jpg
│  │  外卖04_商品页面_商品详情.jpg
│  │  外卖05_评价页.jpg
│  │  外卖06_商家页.jpg
│  │
│  ├─img
│  │      brand@2x.png
│  │      brand@3x.png
│  │      bulletin@2x.png
│  │      bulletin@3x.png
│  │      decrease_1@2x.png
│  │      decrease_1@3x.png
│  │      decrease_2@2x.png
│  │      decrease_2@3x.png
│  │      decrease_3@2x.png
│  │      decrease_3@3x.png
│  │      decrease_4@2x.png
│  │      decrease_4@3x.png
│  │      discount_1@2x.png
│  │      discount_1@3x.png
│  │      discount_2@2x.png
│  │      discount_2@3x.png
│  │      discount_3@2x.png
│  │      discount_3@3x.png
│  │      discount_4@2x.png
│  │      discount_4@3x.png
│  │      guarantee_1@2x.png
│  │      guarantee_1@3x.png
│  │      guarantee_2@2x.png
│  │      guarantee_2@3x.png
│  │      guarantee_3@2x.png
│  │      guarantee_3@3x.png
│  │      guarantee_4@2x.png
│  │      guarantee_4@3x.png
│  │      invoice_1@2x.png
│  │      invoice_1@3x.png
│  │      invoice_2@2x.png
│  │      invoice_2@3x.png
│  │      invoice_3@2x.png
│  │      invoice_3@3x.png
│  │      invoice_4@2x.png
│  │      invoice_4@3x.png
│  │      special_1@2x.png
│  │      special_1@3x.png
│  │      special_2@2x.png
│  │      special_2@3x.png
│  │      special_3@2x.png
│  │      special_3@3x.png
│  │      special_4@2x.png
│  │      special_4@3x.png
│  │      star24_half@2x.png
│  │      star24_half@3x.png
│  │      star24_off@2x.png
│  │      star24_off@3x.png
│  │      star24_on@2x.png
│  │      star24_on@3x.png
│  │      star36_half@2x.png
│  │      star36_half@3x.png
│  │      star36_off@2x.png
│  │      star36_off@3x.png
│  │      star36_on@2x.png
│  │      star36_on@3x.png
│  │      star48_half@2x.png
│  │      star48_half@3x.png
│  │      star48_off@2x.png
│  │      star48_off@3x.png
│  │      star48_on@2x.png
│  │      star48_on@3x.png
│  │
│  ├─PSD
│  │  │  外卖01_商品页.psd
│  │  │  外卖01_商品页_spec.png
│  │  │  外卖02_商品页_公告及优惠信息.psd
│  │  │  外卖02_商品页_公告及优惠信息_spec.png
│  │  │  外卖03_商品页_购物车详情.psd
│  │  │  外卖03_商品页_购物车详情_spec.png
│  │  │  外卖04_商品页面_商品详情.psd
│  │  │  外卖04_商品页面_商品详情_spec.png
│  │  │  外卖05_评价页.psd
│  │  │  外卖05_评价页_spec.png
│  │  │  外卖06_商家页.psd
│  │  │  外卖06_商家页_spec.png
│  │  │
│  │  └─PSD
│  │          icon_@2x.psd
│  │          icon_@3x.psd
│  │          star_24px_@2x.psd
│  │          star_24px_@3x.psd
│  │          star_36px_@2x.psd
│  │          star_36px_@3x.psd
│  │          star_48px_@2x.psd
│  │          star_48px_@3x.psd
│  │
│  ├─SVG
│  │      add_circle.svg
│  │      arrow_lift.svg
│  │      check_circle.svg
│  │      close.svg
│  │      favorite.svg
│  │      keyboard_arrow_right.svg
│  │      remove_circle_outline.svg
│  │      shopping_cart.svg
│  │      thumb_down.svg
│  │      thumb_up.svg
│  │
│  └─标注
│          外卖01_商品页_spec.png
│          外卖02_商品页_公告及优惠信息_spec.png
│          外卖03_商品页_购物车详情_spec.png
│          外卖04_商品页面_商品详情_spec.png
│          外卖05_评价页_spec.png
│          外卖06_商家页_spec.png
│
├─src
│  │  App.vue
│  │  main.js
│  │
│  ├─assets
│  │  │  data.json
│  │  │
│  │  ├─css
│  │  │      base.less
│  │  │      index.less
│  │  │      mixin.less
│  │  │      reset.css
│  │  │
│  │  ├─fonts
│  │  │      sell-icon.eot
│  │  │      sell-icon.svg
│  │  │      sell-icon.ttf
│  │  │      sell-icon.woff
│  │  │      style.css
│  │  │
│  │  ├─images
│  │  │  ├─goods
│  │  │  │      decrease_3@2x.png
│  │  │  │      decrease_3@3x.png
│  │  │  │      discount_3@2x.png
│  │  │  │      discount_3@3x.png
│  │  │  │      guarantee_3@2x.png
│  │  │  │      guarantee_3@3x.png
│  │  │  │      invoice_3@2x.png
│  │  │  │      invoice_3@3x.png
│  │  │  │      special_3@2x.png
│  │  │  │      special_3@3x.png
│  │  │  │
│  │  │  ├─header
│  │  │  │      brand@2x.png
│  │  │  │      brand@3x.png
│  │  │  │      bulletin@2x.png
│  │  │  │      bulletin@3x.png
│  │  │  │      decrease_1@2x.png
│  │  │  │      decrease_1@3x.png
│  │  │  │      decrease_2@2x.png
│  │  │  │      decrease_2@3x.png
│  │  │  │      discount_1@2x.png
│  │  │  │      discount_1@3x.png
│  │  │  │      discount_2@2x.png
│  │  │  │      discount_2@3x.png
│  │  │  │      guarantee_1@2x.png
│  │  │  │      guarantee_1@3x.png
│  │  │  │      guarantee_2@2x.png
│  │  │  │      guarantee_2@3x.png
│  │  │  │      invoice_1@2x.png
│  │  │  │      invoice_1@3x.png
│  │  │  │      invoice_2@2x.png
│  │  │  │      invoice_2@3x.png
│  │  │  │      special_1@2x.png
│  │  │  │      special_1@3x.png
│  │  │  │      special_2@2x.png
│  │  │  │      special_2@3x.png
│  │  │  │
│  │  │  ├─seller
│  │  │  │      decrease_4@2x.png
│  │  │  │      decrease_4@3x.png
│  │  │  │      discount_4@2x.png
│  │  │  │      discount_4@3x.png
│  │  │  │      guarantee_4@2x.png
│  │  │  │      guarantee_4@3x.png
│  │  │  │      invoice_4@2x.png
│  │  │  │      invoice_4@3x.png
│  │  │  │      special_4@2x.png
│  │  │  │      special_4@3x.png
│  │  │  │
│  │  │  ├─star
│  │  │  │      star24_half@2x.png
│  │  │  │      star24_half@3x.png
│  │  │  │      star24_off@2x.png
│  │  │  │      star24_off@3x.png
│  │  │  │      star24_on@2x.png
│  │  │  │      star24_on@3x.png
│  │  │  │      star36_half@2x.png
│  │  │  │      star36_half@3x.png
│  │  │  │      star36_off@2x.png
│  │  │  │      star36_off@3x.png
│  │  │  │      star36_on@2x.png
│  │  │  │      star36_on@3x.png
│  │  │  │      star48_half@2x.png
│  │  │  │      star48_half@3x.png
│  │  │  │      star48_off@2x.png
│  │  │  │      star48_off@3x.png
│  │  │  │      star48_on@2x.png
│  │  │  │      star48_on@3x.png
│  │  │  │
│  │  │  └─svg
│  │  │          add_circle.svg
│  │  │          arrow_lift.svg
│  │  │          check_circle.svg
│  │  │          close.svg
│  │  │          favorite.svg
│  │  │          keyboard_arrow_right.svg
│  │  │          remove_circle_outline.svg
│  │  │          shopping_cart.svg
│  │  │          thumb_down.svg
│  │  │          thumb_up.svg
│  │  │
│  │  └─js
│  │          bus.js
│  │          date.js
│  │          store.js
│  │
│  ├─components
│  │  ├─cart
│  │  │      cart.vue
│  │  │
│  │  ├─common
│  │  │  ├─cartcontrol
│  │  │  │      cartcontrol.vue
│  │  │  │
│  │  │  ├─foodContent
│  │  │  │      foodContent.vue
│  │  │  │
│  │  │  ├─ratingSelect
│  │  │  │      ratingSelect.vue
│  │  │  │
│  │  │  ├─split
│  │  │  │      split.vue
│  │  │  │
│  │  │  └─star
│  │  │      │  star.vue
│  │  │      │
│  │  │      └─star
│  │  │              star24_half@2x.png
│  │  │              star24_half@3x.png
│  │  │              star24_off@2x.png
│  │  │              star24_off@3x.png
│  │  │              star24_on@2x.png
│  │  │              star24_on@3x.png
│  │  │              star36_half@2x.png
│  │  │              star36_half@3x.png
│  │  │              star36_off@2x.png
│  │  │              star36_off@3x.png
│  │  │              star36_on@2x.png
│  │  │              star36_on@3x.png
│  │  │              star48_half@2x.png
│  │  │              star48_half@3x.png
│  │  │              star48_off@2x.png
│  │  │              star48_off@3x.png
│  │  │              star48_on@2x.png
│  │  │              star48_on@3x.png
│  │  │
│  │  ├─food
│  │  │      food.vue
│  │  │
│  │  ├─goods
│  │  │      goods.vue
│  │  │
│  │  ├─header
│  │  │  │  head.vue
│  │  │  │
│  │  │  └─header
│  │  │          brand@2x.png
│  │  │          brand@3x.png
│  │  │          bulletin@2x.png
│  │  │          bulletin@3x.png
│  │  │          decrease_1@2x.png
│  │  │          decrease_1@3x.png
│  │  │          decrease_2@2x.png
│  │  │          decrease_2@3x.png
│  │  │          discount_1@2x.png
│  │  │          discount_1@3x.png
│  │  │          discount_2@2x.png
│  │  │          discount_2@3x.png
│  │  │          guarantee_1@2x.png
│  │  │          guarantee_1@3x.png
│  │  │          guarantee_2@2x.png
│  │  │          guarantee_2@3x.png
│  │  │          invoice_1@2x.png
│  │  │          invoice_1@3x.png
│  │  │          invoice_2@2x.png
│  │  │          invoice_2@3x.png
│  │  │          special_1@2x.png
│  │  │          special_1@3x.png
│  │  │          special_2@2x.png
│  │  │          special_2@3x.png
│  │  │
│  │  ├─index
│  │  │      index.vue
│  │  │
│  │  ├─ratings
│  │  │      ratings.vue
│  │  │
│  │  ├─seller
│  │  │      seller.vue
│  │  │
│  │  ├─shopDetail
│  │  │      shopDetail.vue
│  │  │
│  │  └─tab
│  │          tab.vue
│  │
│  └─router
│          index.js
│
└─static
        .gitkeep
        data.json
```

## 项目展示
![图片](takeaway.gif)
## 运行
```
npm install

npm run dev //服务端运行 访问 http://localhost:8080

npm run build 项目打包
```

## 学习教程
[百度云](https://pan.baidu.com/s/1uY5-fVrQfQJPcrUu0aWDcw)
提取码：x5yz 