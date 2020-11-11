<template>
  <div class="detail">
    <DetailNavBar class="detail-nav"
                  @titleClick="titleClick"
                  ref="nav"></DetailNavBar>
    <Scroll class="content-detail"
            ref="scroll"
            @scroll="detailScroll"
            :probe-type="3">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
<!--    <Toast :message="message" :show="show"></Toast>-->
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";
  // import Toast from "@/components/common/toast/Toast";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
  import {debounce} from "@/common/utils";
  import {backTopMixin} from "@/common/mixin";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [
      backTopMixin
    ],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        // message: '',
        // show: false
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        // console.log(data)
        //1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.取出评论信息
        if (data.rate.CRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted() {
      //1.监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('detailItemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()

        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)

      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      detailScroll(position) {
        //1.获取y值
        const positionY = -position.y

        //2.positionY和主题中值进行对比
        let length = this.themeTopYs.length
        for(let i = 0; i < length-1; i++){
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //3.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })

        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;
          //
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // },1500)

          this.$toast.show(res, 1500)
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content-detail {
    height: calc(100% - 44px - 49px);
  }
</style>
