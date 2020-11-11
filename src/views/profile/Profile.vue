<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">LJXMall</div></nav-bar>
    <!--1.单独封装一个组件: 利用slot-->
    <UserInfo></UserInfo>

    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <!--3.利用slot-->
    <list-view class="order-list">
      <img slot="list-img" src="~assets/img/profile/message.svg" alt="">
      <div slot="list-text">我的消息</div>
    </list-view>
    <list-view >
      <img slot="list-img" src="~assets/img/profile/pointer.svg" alt="">
      <div slot="list-text">积分商城</div>
    </list-view>
    <list-view>
      <img slot="list-img" src="~assets/img/profile/vip.svg" alt="">
      <div slot="list-text">会员卡</div>
    </list-view>
    <list-view class="service-list">
      <img slot="list-img" src="~assets/img/profile/cart.svg" alt="">
      <div slot="list-text">我的购物车</div>
    </list-view>
    <list-view>
      <img slot="list-img" src="~assets/img/profile/shopping.svg" alt="">
      <div slot="list-text">下载购物APP</div>
    </list-view>
  </div>
</template>

<script>
  import UserInfo from "@/views/profile/childComps/UserInfo";
  import ListView from "@/views/profile/childComps/ListView";
  import NavBar from "@/components/common/navbar/NavBar";

	export default {
		name: "Profile",
    components: {
		  UserInfo,
      ListView,
      NavBar
    },
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }

</style>
