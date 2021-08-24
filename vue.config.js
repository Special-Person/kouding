module.exports = {
  publicPath: "/kouding/",
  outputDir: "kouding",
  productionSourceMap: false,
  devServer: {
    open: true
  },
  configureWebpack: config => {
    config.externals = {
      "vue": "Vue",
      "vue-router": "VueRouter",
      "vuex": "Vuex",
      "axios": "axios",
      "vant": "vant"
    };
  }
};
