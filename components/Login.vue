<template>
  <section @keyup.enter="login('form')">
    <el-dialog custom-class="dialog-login" :visible.sync="opend" @close="close('form')">
      <h2 class="text-center title">欢迎登录</h2>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
              v-model="form.username"
              auto-complete="off"
              :autofocus="true"
              placeholder="请输入手机号/邮箱">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
              type="password"
              v-model="form.password"
              auto-complete="off"
              placeholder="请输入密码">
          </el-input>
        </el-form-item>

        <el-form-item>
          <a target="_blank" :href="`${centerAddress}/user/toRegister`" class="pull-left">免费注册</a>
          <a :href="`${centerAddress}/user/forgetPassword?flag=1`" target="_blank" class="pull-right">忘记密码</a>
        </el-form-item>

        <el-form-item>
          <el-button :disabled="loading" class="login-btn" type="primary" @click="login('form')">登 录</el-button>
        </el-form-item>
      </el-form>

      <div class="dialog-footer">
        <div class="contact">
          <p class="phone">400-860-0550</p>
          <p class="time">工作时间:周一到周五9:00-17:30</p>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import login from '~/plugins/checkLogin'
  import address from '~/config'

  export default {
    name: 'dialog-login',

    data () {
      return {
        loading: false,

        centerAddress: address.CENTER_ADDRESS,

        form: {
          username: '',
          password: ''
        },

        rules: {
          username: [
            {required: true, message: '请输入手机号/邮箱', trigger: 'blur'}
          ],

          password: [
            {required: true, message: '请输入账号密码', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {

      close (formName) {
        this.$refs[formName].resetFields()
      },

      login (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login.hasLogin().then(() => {}, () => {})
            this.loading = true
            axios.post(`/webapi/v2/validateLoginInfo`, this.form)
              .then(({data}) => {
                if (data.code === 200) {
                  return axios.post(`/webapi/v2/doLogin`, {
                    activeStatus: 1,
                    checkCode: '',
                    username: this.form.username,
                    password: this.form.password
                  })
                } else {
                  this.$message.error(`${data.desc}`)
                  return Promise.reject()
                }
              })
              .then(data => {
                this.$store.commit('SET_OPEN', {opend: false})
                return axios.get(`/webapi/v2/userInfo`).then(data => data.data.rows || {})
              })
              .then(data => {
                this.$store.commit('SET_USER', data)
                this.loading = false
              })
              .catch(e => {
                console.log(e)
                this.loading = false
              })
          }
        })
      }
    },

    computed: {
      /**
       * [opend 控制登录弹出的显示和隐藏 使用set/get 防止computed中的属性直接修改报错]
       * @type {Object}
       */
      opend: {

        get () {
          return this.$store.state.login.opend
        },

        set (newVal) {
          this.$store.state.login.opend = newVal
        }

      }
    }
  }
</script>


<style lang="scss" scoped type="text/scss">
  .title {
    margin-bottom: 30px;
    font-size: 26px;
    color: #3e3e3e;
  }

  .login-btn {
    width: 100%;
  }

  .dialog-footer {
    border-top: 1px solid #ccc;
    padding-top: 15px;
  }

  .contact {
    background: url('~assets/img/phone.png') no-repeat 10px center;
    padding-left: 60px;
    color: #9e9e9e;

    .phone {
      font-size: 24px;
    }

    .time {
      font-size: 12px;
    }

  }
</style>
