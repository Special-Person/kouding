vant.Toast.setDefaultOptions({ duration: 1000 });

// or with options
const loadimage = require('../assets/loading.gif')
const errorimage = require('../assets/error.png')

Vue.use(vant.Lazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})