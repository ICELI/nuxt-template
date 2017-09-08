<template>
  <div>
    <!-- 专家详情 -->
    <div class="expert-detail" :class="{'hasBg': expertType == 3}">
      <div class="website-container">
        <header class="text-center">
          <h3 class="style-header"><span class="title">专家详情</span>
            <small class="small">Expert Details</small>
          </h3>
        </header>

        <div class="detail">
          <p class="text-indent">{{attribute.desc}}</p>
        </div>
      </div>
    </div>

    <div class="pic">
      <img src="~assets/img/bg-expertdetail-middle.jpg" alt="个人详情中间图">
    </div>

    <!-- 企业研报 -->
    <div class="research-report">
      <div class="website-container">
        <header class="text-center">
          <h3 class="style-header"><span class="title">企业研报</span>
            <small class="small">Enterprise Research Report</small>
          </h3>
        </header>

        <div class="content">
          <ul class="report-list">
            <li v-for="(item, index) in report" :key="index">
              <div class="img-box">
                <img :src="item.report | imgCdn" :alt="item.title" :title="item.title">
              </div>

              <dl class="report-content">
                <dt class="title text-overflow" :title="item.title">
                  <nuxt-link :to="{path: `/companyResearch/${item.id}` }">{{item.title}}<time class="time">{{item.publisTime}}</time>
                  </nuxt-link>
                </dt>
                <dd class="desc">{{item.report}}</dd>
              </dl>
            </li>
          </ul>
          <nuxt-link class="expert-more" :to="{ path:`/experts/${expertId}_${expertType}/reports.html` }">更多研报 >></nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import axios from '~/plugins/axios'
    export default {
      name: 'expert-id',
      data () {
        return {
        }
      },
      asyncData ({params, store}) {
        let args = params.id.replace('.html', '').split('_')
        let expertId = args[0]
        let expertType = args[1]

        return Promise.all([
          axios.get(`/webapi/v2/expertAttribute/${expertId}`).then((data) => data.data),
          axios.get(`/webapi/v2/researchReport/${expertId}`).then((data) => data.data.rows),
        ]).then(data => {
          return {
            expertId: expertId,
            expertType: expertType,
            attribute: data[0],
            report: data[1].length ? data[1].slice(0, 3) : []
          }
        }).catch(error => console.log(error))
      },
      method: {},
      computed: {}
    }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
    // 专家详情
    .expert-detail {
        padding-top: 90px;
        min-height: 550px;

        &.hasBg {
            background: url('~assets/img/bg-expertinfo.jpg') no-repeat top center;

            .detail {
                background-color: #fff;
            }

        }

        .detail {
            margin-top: 35px;
            color: #6e6e6e;
            line-height: 26px;
            background-color: #f5f5f5;
            padding: 75px 60px;
            min-height: 260px;
        }

    }

    // 图片
    .pic {
        height: 337px;

        img {
            height: 100%;
            width: 100%;
        }

    }

    // 研报列表
    .research-report {
        padding: 90px 0;
    }

    .report-list {
        margin-top: 35px;

        li {
            width: 100%;
            display: table;
            table-layout: fixed;
            color: #6e6e6e;
        }

        .img-box {
            vertical-align: middle;
            width: 120px;
            height: 120px;
            border-radius: 100%;
            border: 1px solid #dedede;
            display: table-cell;

        }

        .report-content {
            display: table-cell;
            vertical-align: middle;
            padding-left: 20px;
        }

        .title {
            font-size: 18px;

            padding-right: 95px;
            position: relative;

            .time {
                position: absolute;
                right: 0;
                top: 2px;
                font-size: 14px;
            }

        }

        .desc {
            line-height: 26px;
            padding-top: 15px;
        }

        li {
            padding: 25px 0;
            border-bottom: 1px solid #dedede;
        }

        li:first-child {
            border-top: 1px solid #dedede;
        }

    }
    .expert-more {
        font-size:16px;
        display: inline-block;
        margin-top:15px;
        width: 100%;
        text-align: center;
        &:hover{
            color: #2788e8;
        }
    }
</style>
