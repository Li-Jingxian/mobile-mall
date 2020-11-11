<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
      <scroll class="category-content"
              :data="[categoryData]"
              :probe-type="3"
              @scroll="contentScroll"
              @pullingUp="loadMore"
              ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getCategory, getSubcategory, getCategoryDetail} from "@/network/category"
  import {backTopMixin} from "@/common/mixin";
  import {debounce} from "@/common/utils";

  export default {
		name: "Category",
    components: {
		  NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [
      backTopMixin
    ],
    data() {
		  return {
		    categories: [],
        categoryData: {},
        currentIndex: -1,
        currentType: 'pop'
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    mounted() {
      //1.监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('categoryItemImageLoad', () => {
        refresh()
      })
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      },
      activated() {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
      },
    },
    methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
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
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this._getCategoryDetail(this.currentType)
      }
    }
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  .category-content {
    height: 100%;
    flex: 1;
  }
</style>
