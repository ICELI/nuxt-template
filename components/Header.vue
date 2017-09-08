<template>
  <el-row class="website-container header">
    <el-col :span="12" class="logo">
      <h1 class="logo-title">
        <a href="/" class="logo-link">聚贸云智库</a>
      </h1>
    </el-col>
    <el-col :span="12">
      <nav class="website-nav">
        <ul class="clearfix">
          <li>
            <h3>
              <p>发布需求</p>
              <small>Post demand</small>
            </h3>

            <div class="sub-nav">
              <ul>
                <li>
                  <nuxt-link :to="{path: '/demandOrder'}">企业需求<small>Enterprise demand</small>
                  </nuxt-link>
                </li>

                <li>
                  <nuxt-link :to="{ path: `/experts` }">媒体采访<small>Media interview</small>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <h3>
              <p>联系专家</p>
              <small>Contact an expert</small>
            </h3>

            <div class="sub-nav">
              <ul>
                <li>
                  <nuxt-link :to="{ path: `/experts` }">我要咨询专家<small>I want my consultant</small>
                  </nuxt-link>
                </li>

                <li>
                  <nuxt-link :to="{path:'/releaseResearch'}">邀请专家调研企业<small>Invite experts to do researches</small>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .header {
    position: relative;
    z-index: 3;
  }

  .logo-link {
    text-indent: -9999px;
    margin-top: 23px;
    background: url('~assets/img/logo.png') no-repeat left center;
    display: block;
    width: 497px;
    height: 56px;
  }

  h3 {
    font-weight: normal;
    line-height: 18px;
    cursor: pointer;
  }

  .website-nav {
    float: right;
    padding: 33px 0;

    h3{
      font-size: 16px;
    }

    ul {
        color: #6e6e6e;
    }

    li {
      margin-left: 30px;
      float: left;
      position: relative;


      &:hover {
        .sub-nav {
            display: block;
        }

        > * {
            color: #2788e8;
        }
      }
    }
  }

  .sub-nav {
    position: absolute;
    padding: 10px;
    border: 1px solid #dedede;
    background-color: #fff;
    text-align: center;
    min-width: 160px;
    left: 50%;
    transform: translateX(-50%);
    display: none;

    a {
      display: block;
      white-space: nowrap;
    }

    small {
      display: block;
    }

    li {
      margin: 0;
      padding: 10px 0;
      float: none;
    }

    li + li {
      border-top: 1px solid #333;
    }
  }
</style>
