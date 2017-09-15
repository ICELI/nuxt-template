<template>
  <section class="experts-wrap">
    <div class="website-container">
      <div class="search-wrap">
        <input type="text" v-model="keyword" @keyup.13="go" autofocus="autofocus"> <button type="button" @click="go">搜索</button>
      </div>
      <ul class="experts">
        <li v-for="(item, index) in experts" :key="index">
          <nuxt-link target="_blank" :to="{ path: `/experts/${item.id}_${item.templateId || 1}.html` }">
            <el-row>
              <el-col :span="3" class="text-center">
                <div class="img-box">
                  <img v-if="item.imgUrl" :src="item.imgUrl | imgCdn" :alt="item.expertName" :title="item.expertName">

                  <img v-else src="~assets/img/headGray.png" alt="用户头像" :title="item.expertName">
                </div>
              </el-col>
              <el-col :span="21">
                <dl>
                  <dt>
                    <h3 :title="item.expertName" class="expert-name">{{ item.expertName }}</h3>

                    <address class="address" v-if="item.city" :title="item.city">
                      <i class="icon-location"></i>{{item.city}}</address>

                    <span class="job" :title="item.positionName">{{item.positionName}}</span>

                    <span v-if="item.companyName"
                          :title="item.companyName"> | {{item.companyName}}</span>

                    <button
                      type="button"
                      :disable="item.loading"
                      class="pull-right btn btn-primary"
                      :class="{'is-collect': item.isFavorite === 1}"
                      @click.stop.prevent="collection(item)">
                      <i class="icon-start-white"></i>

                      <span v-if="item.isFavorite !== 1">收藏专家</span>
                      <span v-else>取消收藏</span>
                    </button>
                  </dt>
                  <dd class="expert-desc-title">专家简介</dd>
                  <dd class="expert-desc"
                    :title="item.expertIntroduces">{{item.expertIntroduces | cut_str(150)}}</dd>
                </dl>
              </el-col>
            </el-row>
          </nuxt-link>
        </li>
      </ul>

      <a class="more" v-if="totalPage > page" @click.stop="getExperts()">
        <span v-show="!loading">更多专家 <span class="en">More</span> <i class="icon-arrow-right"></i></span>
        <span v-show="loading">加载中...</span>
      </a>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import utils from '~/plugins/utils'

export default {
  name: 'experts',
  data () {
    return {
      experts: [],
      keyword: '',
      page: 1,
      limit: 8
    }
  },

  head: {
    title: '媒体采访---聚贸云智库',
    meta: [{
      hid: 'keyword',
      name: 'keyword',
      content: '媒体采访'
    }]
  },

  computed: {
    user () {
      return this.$store.state.user.user
    },
    /**
     * [totalPage 获取砖家列表总页数]
     * @return {[Number]} [专家列表总页数]
     */
    totalPage () {
      return this.$store.state.experts.totalPage
    },

    /**
     * [loading 是否正在请求专家的ajax请求中]
     * @return {[Boolean]} [请求专家列表状态]
     */
    loading () {
      return this.$store.state.experts.loading
    }
  },

  validate ({ params }) {
    let keyword = params.keyword || ''
    // Must be a number
    return keyword === '' || keyword.includes('.html')
  },
  /**
   * [asyncData Nuxt.js 服务端渲染函数]
   * @param  {[Object]} options.store    [Vuex store 对象]
   * @return {[Undefined]}               [无返回值]
   */
  async asyncData ({params, store }) {
    let args = utils.parseParams(params, 'keyword')
    let startIndex = args[0]

    console.log(startIndex)

    try {
      const { data } = await axios.get('/webapi/v2/pageExpertInfo', { params: { offset: startIndex || 0, limit: 8 } })
      store.commit('GET_TOTALPAGE', data.totalPage)
      return {
        keyword: startIndex,
        experts: data.rows
      }
    } catch (e) {
      console.log(e)
    }
  },
  async fetch ({ store }) {
    const { data } = await axios.get(`/webapi/v2/indexBottomMenu`)
    store.commit('SET_FOOTER', data.rows)
  },

  methods: {
    go() {
      let path = `/search/${this.keyword}.html`

      if(this.keyword < 0 || this.keyword === '') {
        path = '/search'
      }

      this.$router.push(path)
    },
    /**
     * [collection 点击收藏/取消收藏专家]
     * @param  {[Number]} expertId [收藏专家的ID]
     * @return {[Undefined]}          [无返回值]
     */
    async collection (expert) {
      let user = this.$store.state.user.user
      if (user.id) {
        try {
          // TODO: 判断收藏还是取消收藏
          this.$set(expert, 'loading', true)
          let httpType = 'get'

          if (expert.isFavorite === 1) {
            httpType = 'delete'
          }

          const { data } = await axios[httpType](`/webapi/v2/favorite/1/${expert.id}`)
          this.$set(expert, 'loading', false)

          if (data.statusCode !== 200) {
            this.$message.error(data.desc)
          } else {
            expert.isFavorite = expert.isFavorite ? 0 : 1
          }
        } catch (e) {
          this.$set(expert, 'loading', false)
        }
      } else {
        this.$store.commit('SET_OPEN', {opend: true})
      }
    },

    /**
     * [getExperts 分页获取专家列表]
     * @return {[Undefined]} [无返回值]
     */
    async getExperts () {
      this.$store.commit('SET_LOADING', true)

      try {
        let params = {
          params: {
            offset: (this.page) * this.limit,
            limit: this.limit
          }
        }
        const {data} = await axios.get('/webapi/v2/pageExpertInfo', params)
        this.experts = this.experts.concat(data.rows)
        this.page++
      } catch (e) {
        console.log(e)
      }
      this.$store.commit('SET_LOADING', false)
    }
  },
  watch: {
    async user (val, newVal) {
      try {
        const { data } = await axios.get('/webapi/v2/pageExpertInfo', { params: { offset: this.keyword || 0, limit: this.page * this.limit } })
        this.experts = data.rows
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>

  .experts-wrap {
    border-top: 2px solid #1c86ea;
    padding: 30px 0;
  }

  .experts {

    li {
        margin-bottom: 16px;
        padding: 20px;
    }

    .is-collect {
        background-color: #fff;
        color: #6e6e6e;
        border: 1px solid #ccc;

    .icon-start-white {
        background-image: url('~assets/img/start-stroke.png');
    }

    }

    li:hover {
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

    .expert-name {
        color: #F68306;
    }

    }

    .img-box {
        width: 120px;
        height: 120px;
        border-radius: 100%;
        border: none;
        display: inline-block;
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    .expert-name {
        font-size: 20px;
        font-weight: normal;
        color: #3d3d3d;
        display: inline-block;
        margin-right: 25px;
    }

    .address {
        display: inline-block;
        font-style: normal;
        margin-right: 20px;
    .location {
        margin-right: 8px;
        vertical-align: top;
    }
    }

    .btn {
        padding: 8px 20px;
        border-radius: 2px;
    }

    .expert-desc-title {
        font-size: 16px;
        color: #3d3d3d;
        margin-top: 8px;
    }

    dd {
        line-height: 26px;
    }

    }
</style>
