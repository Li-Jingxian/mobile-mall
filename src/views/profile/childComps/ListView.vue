<template>
    <div id="list">
      <div class="item">
        <div class="icon"><slot name="list-img"></slot></div>
        <div class="info"><slot name="list-text"></slot></div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "ListView",
	}
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .icon img {
    width: 18px;
    height: 18px;
  }

  .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>
