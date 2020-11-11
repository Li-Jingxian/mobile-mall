<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl :titles="['流行', '新款', '精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                class="tab-control"
                v-show="isTabFixed"></TabControl>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners"
                  @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>

  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "@/views/home/childComps/FeatureView";

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getHomeMultidata, getHomeGoods} from "@/network/home";
  import {debounce} from "@/common/utils";
  import {backTopMixin} from "@/common/mixin";

  export default {
    name:'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [
      backTopMixin
    ],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //1.监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('homeItemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      // 事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
        this.$refs.scroll.scrollTo(0, -this.tabOffsetTop)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        //2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      //获取tabControl的offsetTop
      swiperImageLoad() {
        setTimeout(() => {
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },1000)
      },

      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
