module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 330, //视窗的宽度,对应的是我们设计稿的宽度
      viewportHeight: 660, //视窗的高度,对应的是我们设计稿的高度
      unitPrecision: 5, //指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw', //指定需要转换成的视窗单位,建议使用vw
      // selectorBlackList: ['tab-menu'], //指定不需要转换的类
      // exclude: [/GirdView/],  //exclude中存放的元素必须是正则表达式,按照排除的文件写对应的正则
      minPixelValue: 1, //小于或等于`1px`不转换为视窗单位
      mediaQuery: false //允许在媒体查询中转换`px`
    }
  }
}
