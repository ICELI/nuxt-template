<template>
  <section>
    <!-- 幻灯片 -->
    <el-carousel class="banner" height="500px" :interval="5000" arrow="hover">
      <el-carousel-item v-for="(item, index) in carouselsFilter" :key="index">
        <a :href="item.url || `javascript:;`" target="_blank" :title="item.title">
          <img :src="item.adsImg | imgCdn" alt="顶部广告轮播图">
        </a>
      </el-carousel-item>
    </el-carousel>

    <!-- 聚贸云智库 -->
    <div class="website-desc box">
      <div class="website-container">
        <header class="box-header">
          <h2>聚贸云智库 <small>OUR ADVANTAGES</small></h2>
        </header>

        <div class="box-content">
          <el-row :gutter="30" class="description">
            <el-col :span="12">
              <p class="text-indent">聚贸云智库是聚贸旗下全球专家智库平台，智库汇聚了全球各行业各领域的顶尖专家和精英人士，为用户提供咨询、反馈信息、进行诊断、预测未来。旨在通过智库专家的经验与智慧，为社会经济等领域的发展提供满意方案或优化方案，搭建起全球企业与企业、产业与产业、国家与国家之间高效协作的桥梁。</p>
            </el-col>
            <el-col :span="12" class="description-en">
              <p>A sub-platform of JUMORE,JM EXPERT pools world's top experts and professionals in a wide range of areas, and provides our users with fine quality services in consultation, information and forcast. It aims to provide solutions or optimize solutions to social and economic developments, building bridges for high efficiency cooperation across enterprises, industries and countries .</p>
            </el-col>
          </el-row>

          <el-row class="website-features">
            <el-col :span="9">
              <div>
                <div class="img-box">
                  <img src="~assets/img/team.png" alt="">
                </div>

                <dl class="desc">
                  <dt class="title">顶尖专家 <small>Authoritative experts of the industry</small></dt>
                  <dd class="content">严选业内权威专家</dd>
                </dl>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="">
                <div class="img-box">
                  <img src="~assets/img/voice.png" alt="">
                </div>

                <dl class="desc">
                  <dt class="title">权威声音 <small>Insight into industrial trends</small></dt>
                  <dd class="content">洞悉行业发展趋势</dd>
                </dl>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="">
                <div class="img-box">
                  <img src="~assets/img/conslution.png" alt="">
                </div>

                <dl class="desc">
                  <dt class="title">专业咨询 <small>Your escort for decisions</small></dt>
                  <dd class="content">为决策保驾护航</dd>
                </dl>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 专家风采 -->
    <div class="expert-photo-box box">
      <div class="website-container">
        <header class="box-header">
          <h2>专家风采 <small>Glimpse of experts</small></h2>
        </header>

        <div  class="box-content">
          <ul  class="photo-list">
            <li v-for="(item, index) in styleInfoFilter" :class="{'pull-right': index === 5}" :key="index">
              <nuxt-link target="_blank" :to="{ path: `/experts/${item.id}_${item.templateId || 1}.html`}">
                <img v-lazyload="lazyLoadPic(item.imgUrl)" :alt="item.companyName" :title="item.companyName" />

                <div class="expert-info">
                  <dl class="">
                    <dt class="name text-overflow" :title="item.expertName">{{item.expertName}}</dt>
                    <dd class="text-overflow" :title="item.positionName">{{item.positionName}}</dd>
                    <dd class="text-overflow company" :title="item.companyName">{{item.companyName}} <span class="pull-right year" v-if="item.yearsOfWorking">{{ item.yearsOfWorking}}年</span></dd>
                  </dl>
                </div>
              </nuxt-link>
            </li>
            <li>
              <a :href="styleBannerUrl || `javascript:;`" target="_blank">
                <img class="style-banner" v-lazyload="lazyLoadPic(styleBannerImg)" alt="中间广告图">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 专家列表 -->
    <div class="expert-lists box">
      <div class="website-container">
        <header class="box-header">
          <h2>各行业顶尖专家云集于此 <small>The industrial top experts gathered here</small></h2>
        </header>

        <div class="box-content">
          <ul class="expert">
            <li v-for="(item, index) in expertLists" :key="index">
              <div class="img-box">
                <img v-if="item.imgUrl" v-lazyload="lazyLoadPic(item.imgUrl)">
              </div>
              <dl class="expert-info">
                <dt class="name">{{item.expertName}}</dt>
                <dd class="job-title">
                  {{item.positionName}}
                  <span v-if="item.positionName && item.companyName">|</span> {{item.companyName}}
                </dd>

                <dd v-for="(items, index2) in item.multipleSkills.slice(0,4)" :key="index2">{{items}}</dd>
              </dl>
              <nuxt-link target="_blank" class="detail" :to="{ path: `/experts/${item.id}_${item.templateId || 1}.html` }"> 查看详情 》</nuxt-link>
            </li>
          </ul>
          <nuxt-link class="more" to="/search">
            更多专家 <span class="en">More</span>
            <i class="icon-arrow-right"></i>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- 底部幻灯片 -->
    <el-carousel class="banner" indicator-position="none" height="500px">
      <el-carousel-item v-for="(item, index) in bottomCarouselsFilter" :key="index">
        <a :href="item.url || `javascript:;`" :title="item.title" target="_blank">
          <img v-lazyload="lazyLoadPic(item.adsImg)" alt="底部广告轮播图">
        </a>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
  import Vue from 'vue'
  import axios from '~/plugins/axios'

  export default {
    name: 'index',
    data () {
      return {
        styleInfoFilter: [],
        expertLists: [],
        carouselsFilter: [],
        bottomCarouselsFilter: []
      }
    },

    async fetch ({ store, params }) {
      const { data } = await axios.get(`/webapi/v2/indexBottomMenu`)
      store.commit('SET_FOOTER', data.rows)
    },
    asyncData () {
      return Promise.all([
        axios.get(`/webapi/v2/indexBanner`).then((data) => data.data.rows),
        axios.get(`/webapi/v2/advantageExpertInfo`).then((data) => data.data.rows),
        axios.get(`/webapi/v2/indexIndustryExp?offset=0&limit=4`).then((data) => data.data.rows),
        axios.get(`/webapi/v2/indexBannerBottom`).then((data) => data.data.rows),
        axios.get(`/webapi/v2/betweenExpertBanner`).then(data => data.data.rows)
      ]).then((data) => {
        return {
          carouselsFilter: data[0],
          styleInfoFilter: data[1],
          expertLists: data[2],
          bottomCarouselsFilter: data[3],
          betweenExpertBanner: data[4]
        }
      }).catch(error => console.log(error))
    },

    computed: {
      styleBannerImg () {
        var sb = this.betweenExpertBanner || []
        return sb.length > 0 ? sb[0].adsImg : ''
      },

      styleBannerUrl () {
        var sb = this.betweenExpertBanner || []
        return sb.length > 0 ? sb[0].url : ''
      }
    },

    methods: {
      lazyLoadPic (url) {
        return Vue.filter('imgCdn')(url)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>


  .box{
    padding-top: 90px;
    padding-bottom: 100px;
  }
  .box-header{
    text-align: center;
    margin-bottom: 40px;

    h2{
      color: inherit;
      font-size: 32px;
      font-weight: normal;
      position: relative;
      padding-bottom: 8px;

      &::after{
        content:'';
        height: 2px;
        background-color: #3e3e3e;
        width: 60px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    small{
      display: block;
      font-size: 60%;
    }
  }

  // 关于云智库
  .website-desc{
    color: #6e6e6e;

    .description{
      font-size: 20px;
    }

    .description-en{
      font-size: 18px;
    }

    .img-box{
      width: 120px;
      height: 120px;
      border:1px solid #2788e8;
      border-radius: 100%;
      float: left;
      margin-right: 20px;
      text-align: center;
      // line-height: 120px;

      &::after{
        display: inline-block;
        content: "";
        vertical-align: middle;
        height: 100%;
      }
    }

    img{
      vertical-align: middle;
    }
  }

  .website-features{
    margin-top: 50px;
    .desc{
      color: #2788e8;
    }

    .title{
      font-size: 26px;
      color: inherit;
      padding-top: 20px;
    }

    small{
      font-size: 16px;
      display: block;
    }

    .content{
      font-size: 18px;
      color: #6e6e6e;
    }
  }

  // 专家风采
  .expert-photo-box{
    background-color: #f5f5f5;
  }
  .photo-list{
    position: relative;
    overflow:hidden;
    margin-left: -20px;
    color: #fff;

    li{
      float: left;
      margin-left: 20px;
      margin-bottom: 20px;
      height: 400px;
      background: #3a3024;
      width: 282px;
      position: relative;

      &:last-child{
        width: 584px;
      }

      a::after{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
      }

      a:hover::after{
        border:4px solid #1d86eb;
      }
    }

    img{
      width: 100%;
      height: 100%;
    }

    .expert-info{
      position: absolute;
      bottom:0;
      left: 0;
      width: 100%;
      background: rgba(3,47,90,.8);
      padding:20px 32px 12px;

      .desc{
        line-height: 24px;
      }
    }

    .name{
      font-size: 24px;
      margin-bottom: 10px;
    }

    .company{
      padding-right: 40px;
      position: relative;
    }

    .year{
      position: absolute;
      right: 0;
      top: 0;
    }

  }

  // 高手云集
  .expert-lists{
    text-align: center;
    .expert{
      display: inline-block;
      overflow: hidden;
      vertical-align: top;
    }

    li{
      float: left;
      width: 180px;
      margin-left: 90px;

      &:first-child{
        margin-left: 0;
      }
    }

    .img-box{
      display: inline-block;
      width: 120px;
      height: 120px;
      border-radius: 100%;
      background-color: red;
    }
    img{
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }

    .expert-info{
      margin-top: 10px;
    }

    .name{
      font-size: 24px;
      color: #3e3e3e;
    }

    dd{
      line-height: 28px;
      color: #6e6e6e;
      font-size: 16px;
    }

    .detail{
      color: #2788e8;
      display: block;
      font-size: 14px;
      margin-top: 14px;
    }
  }
</style>
