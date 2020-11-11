<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton
        :is-checked="isSelectAll"
        class="check-all"
        @click.native="checkClick">
      </CheckButton>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      // return !this.cartList.find(item => !item.checked)
      // return !this.cartList.filter(item => !item.checked).length

      //遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { //全部选中时
        this.cartList.forEach(item => item.checked = false)
      }else { //全部或部分未选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.checkLength) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 16px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 60px;
  }

  .check-all {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    background-color: var(--color-high-text);
    color: white;
    width: 100px;
    text-align: center;
  }
</style>
