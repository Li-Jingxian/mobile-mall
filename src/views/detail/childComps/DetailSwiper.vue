<template>
  <div class="detail-swiper">
    <Swiper class="swiper-detail">
      <SwiperItem v-for="item in topImages">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .swiper-detail {
    height: 300px;
    overflow: hidden;
  }
</style>
