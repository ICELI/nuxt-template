<template>
  <div class="research-report">
    <div class="website-container">
      <header class="text-center">
        <h3 class="style-header"><span class="title">企业研报</span>
          <small class="small">Enterprise Research Report</small>
        </h3>
      </header>
      <div class="content text-center">
        <ul class="report-list clearfix">
          <li v-for="(item, index) in reports" :key="index">
            <div class="img-box">
              <img :src="item.report | imgCdn" :title="item.title" alt="研报封面图">
            </div>
            <div class="report-layout">
              <h4 class="report-title" :title="item.title">{{item.title}}</h4>
              <time>{{item.publisTime.slice(0, 10)}}</time>
              <p class="report-content">{{item.content | cut_str(350)}}</p>
              <nuxt-link class="report-detail" :to="`/companyResearch/${item.id}`">查看详情 >></nuxt-link>
            </div>
          </li>
        </ul>
        <a href="javascript:;" @click="getMore" v-if="totalSize > reports.length" class="report-more">查看更多研报</a>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'
  import utils from '~/plugins/utils'

  export default {
    name: 'reports',
    data () {
      return {
        limit: 3,
        offset: 0
      }
    },
    validate ({params}) {
      // Must be the name
      return utils.checkParams(params, this.name)
    },
    async asyncData ({params}) {
      let args = utils.parseParams(params, 'id')
      let expertId = args[0]
      let expertType = args[1]

      try {
        const {data} = await axios.get(`/webapi/v2/pageResearchReport?expertId=${expertId}&offset=0&limit=3`)
        return {
          expertId: expertId,
          expertType: expertType,
          reports: data.rows,
          totalSize: data.totalSize
        }
      } catch (e) {
        console.log(e)
      }
    },
    methods: {
      async getMore () {
        this.offset += this.limit
        const {data} = await axios.get(
          `/webapi/v2/pageResearchReport?expertId=${expertId}&offset=${this.offset}&limit=${this.limit}`)
        this.reports = [...this.reports, ...data.rows]
        this.totalSize = data.totalSize
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
  // 研报列表
  .research-report {
    padding: 90px 0;
  }

  .report-more {
    display: inline-block;
    font-size: 14px;
    width: 92px;
    height: 50px;
    background: url("~/assets/img/arrow-down12.png") 33px 22px no-repeat;
    &:hover {
      color: #2788e8;
      background-image: url("~/assets/img/arrow-down-blue12.png");
    }
  }

  .report-list {
    margin: 35px 0 0 -20px;
    li {
      width: 383px;
      height: 457px;
      position: relative;
      margin: 60px 0px 20px 20px;
      padding: 90px 30px 36px;
      background: #e9f3fd;
      float: left;
    }
    .img-box {
      position: absolute;
      top: -60px;
      left: 50%;
      margin-left: -60px;
      height: 120px;
      width: 120px;
      border: 1px solid #ccc;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .report-title {
      font-size: 18px;
      line-height: 28px;
      color: #3e3e3e;
      text-align: center;
      font-weight: normal;
    }
    .report-layout > time {
      display: block;
      text-align: right;
      font-size: 14px;
      margin: 18px 0;
    }
    .report-content {
      font-size: 14px;
      word-break: break-all;
      line-height: 28px;
      color: #6e6e6e;
      text-align: left;
    }
    .report-detail {
      color: #2788e8;
      font-size: 12px;
      position: absolute;
      text-align: center;
      left: 0;
      bottom: 20px;
      width: 383px;
    }
  }
</style>
