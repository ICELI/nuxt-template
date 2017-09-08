<template>
  <footer>
    <div class="website-container">
      <el-row class="help-list">
        <el-col :span="6" :class="{'last': index === 3}" class="help-nav" v-for="(item, index) in footer" :key="index" >
          <ul>
            <li v-for="(item, index) in item.artInfo" :key="index">
              <nuxt-link :to="`/services/${item.id}`">
                <p :title="item.title">{{item.title}}</p>
                <small>{{ item.subTitle}}</small>
              </nuxt-link>
            </li>
          </ul>

          <div class="jm-code text-center" v-if="index === 3">
            <img src="~assets/img/jm-code.png" width="107" alt="">
            <p>聚贸云智库</p>
          </div>
        </el-col>
      </el-row>

      <el-row class="copyright">
        <el-col :span="24" class="text-center">
          <p>
            <span>客服电话／Contacts：400-860-0550</span>
            <span>传真号码/Fax：0571-87359367</span>
            <span>E-Mail：pro@jumore.com</span>
            <span>工作时间／Work Time：（周一至周五 9：00 - 17:30）</span>
          </p>

          <p>公司地址：浙江省杭州市西湖区求是路8号公元大厦南楼25楼</p>

          <p>Address : NORTHWEST PODIUM OF ANNO DOMINI MANSION, NO.8, QIUSHI ROAD,HANGZHOU,CHINA</p>

          <p>Copyright &copy; 聚贸云智库 www.jmexpert.com 浙ICP备15010831号-58</p>
        </el-col>
      </el-row>
    </div>
  </footer>
</template>

<script>
  import Vue from 'vue'
  import axios from '~/plugins/axios'
  import vuex from 'vuex'

  export default{
    data () {
      return {}
    },
    computed: {
      footer () {
        return this.$store.state.footer.footer
      }
    }
  }
</script>

<style lang="scss" scoped>
  footer{
    color: #6e6e6e;
    padding-bottom: 25px;
    background-color: #f5f5f5;
  }
  .help-list{
    padding: 35px 0;
  }

  .help-nav{
    li{
      line-height: 18px;
    }
  }

  .last{
    overflow: hidden;
    ul{
      float: left;
    }

    .jm-code{
      float: right;
    }
  }

  .copyright{
    p{
      margin-bottom: 5px;
    }

    span{
      padding-right: 20px;
    }
  }
</style>
