<template>
    <TabBar>
      <Tabbaritem path="/home" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </Tabbaritem>
      <Tabbaritem path="/category" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </Tabbaritem>
      <Tabbaritem path="/cart" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </Tabbaritem>
      <Tabbaritem path="/profile" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </Tabbaritem>
    </TabBar>
</template>
 
<script>
import TabBar from 'components/common/tabbar/TabBar'
import Tabbaritem from 'components/common/tabbar/Tabbaritem'

export default {
  name:'MainTabBar',
  components: {
    TabBar,
    Tabbaritem
  }
}
</script>
 
<style scoped>
   
</style>