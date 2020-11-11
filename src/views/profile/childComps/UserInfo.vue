<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <div name="user-icon">
        <img src="~assets/img/profile/avatar.svg"
             class="privateImage-svg left">
      </div>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <img src="~assets/img/profile/phone.svg"
               class="icon-mobile">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  .privateImage-svg {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .left {
    float: left;
  }

  .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  .icon-mobile {
    position: absolute;
    width: 16px;
    height: 18px;
    left: -15px;
    top: -3px;
  }

</style>
