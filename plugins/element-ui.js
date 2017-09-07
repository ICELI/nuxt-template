import Vue from 'vue'

const ElementUI = require('element-ui')

// 必须要写这个语言包 不写将没有任何效果
const locale = require('element-ui/lib/locale/lang/zh-CN')

Vue.use(ElementUI, { locale })
