<template>
  <div class="cart">
<!--    导航-->
    <NavBar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </NavBar>

<!--    商品列表-->
    <CartList></CartList>

<!--    底部汇总-->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/shopcart/childComps/CartList";
import CartBottomBar from "@/views/shopcart/childComps/CartBottomBar";

import { mapGetters } from 'vuex'

export default {
  name:'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //两种语法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
