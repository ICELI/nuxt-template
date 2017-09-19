<template lang="html">
  <div class="website-top">
    <el-row class="website-container">
      <el-col :span="24" class="text-right">

        <a :href="`${centerAddress}/expertApply/init`" @click="goCenter($event)">申请成为专家/Apply for an expert</a>

        <a target="_blank" :href="`${centerAddress}/user/toRegister`" v-if="!user.id">用户注册/Free Registration</a>

        <a href="#" v-if="!user.id" @click.prevent="showLogin()">登录/Sign</a>

        <div v-if="user.id" class="user-wrap">

          <img class="header-img" v-if="user.headImg" :src="user.headImg | imgCdn" :alt="user.userName">
          <img class="header-img" v-else src="~assets/img/user-photo.png" alt="用户头像"/>

          <a :href="`${centerAddress}/jttoverview/init`" class="user-name text-overflow">{{user.nickName}}</a>
          <div class="actions">
            <p>
              <a :href="`${centerAddress}/jttoverview/init`" target="_blank">个人中心</a>
            </p>
            <p><a :href="`${userCenterAddress}/logout?returnUrl=${fullpath}`">退出</a></p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import login from '~/plugins/checkLogin'
  import axios from '~/plugins/axios'
  import address from '~/config'

  export default {
    data () {
      return {
        fullpath: '',
        centerAddress: address.CENTER_ADDRESS,
        userCenterAddress: address.USERCENTER_ADDRESS
      }
    },
    mounted () {
      this.fullpath = location.origin

      login.hasLogin()
        .then(data => {
          return axios.get(`/webapi/v2/userInfo`)
            .then(data => {
              return data.data.rows || {}
            })
        }, data => {
          console.log('Not Login')
        })
        .then(data => {
          this.$store.commit('SET_USER', data || {})
        })
    },
    computed: {

      user: {
        get () {
          return this.$store.state.user.user || {}
        },

        set (newVal) {
          this.$store.state.user.user = newVal
        }
      }
    },
    methods: {
      // 显示登录
      showLogin () {
        this.$store.commit('SET_OPEN', {opend: true})
      },

      goCenter ($event) {
        if (!this.user.id) {
          $event.preventDefault()
          this.showLogin()
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .website-top {
    line-height: 30px;
    height: 32px;
    background-color: #f5f5f5;
    color: #6e6e6e;
    // overflow: hidden;
  }

  .user-wrap {
    width: 168px;
    display: inline-block;
    position: relative;
    padding-right: 20px;
    vertical-align: middle;
    cursor: pointer;

    &::after {
      content: "";
      display: inline-block;
      width: 7px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
      height: 7px;
      border-bottom: 1px solid #3e3e3e;
      border-left: 1px solid #3e3e3e;
      transform-origin: center;
      transition: transform .3s;
    }

    &:hover {
      .actions {
        display: block;
      }
      &:after {
        transform: translateY(-50%) rotate(135deg);
      }
    }
  }

  .actions {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    width: 100%;
    box-shadow: 0px 4px 10px 0px #d8d8d8;
    z-index: 9;
    text-align: center;

    p {
      line-height: 40px;

      a {
        margin-left: 0;
      }
    }

    a:hover {
      color: #2788e8;
    }
  }

  .header-img {
    vertical-align: middle;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: none;
  }

  .user-name {
    display: inline-block;
    width: 100px;
    vertical-align: middle;
  }

  .website-top a {
    margin-left: 25px;

    &.user-name {
      margin-left: 0;
    }
  }
</style>
