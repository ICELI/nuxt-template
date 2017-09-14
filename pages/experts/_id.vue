<template lang="html">
  <section>
    <!-- 个人信息 style-2 -->
    <div class="expert-info" :class="{'style-1': expertType == 1, 'style-2': expertType == 2}">
      <div class="website-container">
        <el-row>
          <!-- 模板一二公用 -->
          <el-col :span="4" v-if="expertType == 1 || expertType == 3">
            <div class="img-box">
              <img v-if="detail.imgUrl" :src="detail.imgUrl | imgCdn" alt="专家头像" :title="detail.expertName">
              <img v-else src="~assets/img/headGray.png" alt="专家头像" :title="detail.expertName">
            </div>

            <button type="button"
                    class="collection btn-line pull-none"
                    :class="{liked: detail.isFavorite === 1}"
                    @click="collectExpert"
                    name="button"
                    v-if="expertType == 1">
              <i class="start"></i>
              <span class="favorite-text" v-if="detail.isFavorite === 1">取消收藏</span>
              <span class="favorite-text">收藏专家</span>
              <small class="small">Add expert to your favorite</small>
            </button>
          </el-col>

          <!-- 模板一 -->
          <el-col :span="20" v-if="expertType == 1">
            <el-row class="d-table info-wrap">
              <el-col :span="10" class="d-table-cell pull-none">
                <dl class="info">
                  <dt>
                  <h3 class="clearfix">
                    <span class="name">{{detail.expertName}}</span>
                  </h3>
                  </dt>
                  <dd class="font-md">{{detail.positionName}} <i v-if="detail.positionName && detail.maxSchool">|</i> {{detail.maxSchool}}</dd>
                  <dd>
                    <span class="mr-sm" v-if="detail.yearsOfWorking">工作经验： {{detail.yearsOfWorking}}年</span>
                    <span v-if="detail.city">城市：
                      <address class="address">{{detail.city}}</address>
                    </span>
                  </dd>
                </dl>
              </el-col>

              <el-col class="text-right d-table-cell pull-none">
                <button type="button" name="button" class="btn btn-line" @click="openDialog('contact')">我要咨询专家
                  <small class="small">I want to consult an expert</small>
                </button>
                <nuxt-link :to="{ path: '/releaseResearch', query: { expertId: expertId } }" @click="isLogin(e)"
                           class="btn btn-line">邀请专家调研企业
                  <small class="small">Apply for expert's research</small>
                </nuxt-link>
                <button type="button" name="button" class="btn btn-line" @click="openDialog('interview')">我要采访专家
                  <small class="small">I want to interview an expert</small>
                </button>
              </el-col>
            </el-row>


            <el-row>
              <el-col class="introduction">
                <p>专家介绍:</p>
                <p class="introduction-content">{{detail.expertIntroduces}}</p>
              </el-col>
            </el-row>
          </el-col>

          <!-- 模板二 -->
          <el-col :span="24" v-if="expertType == 2">
            <el-row>
              <el-col :span="24" class="d-table info-wrap">
                <div class="img-box d-table-cell">
                  <img :src="detail.imgUrl | imgCdn" alt="专家头像" :title="detail.expertName">
                </div>

                <dl class="info d-table-cell pl-sm">
                  <dt>
                  <h3 class="clearfix"><span class="name">{{detail.expertName}}</span>
                    <address ng-if="detail.city" class="address">{{detail.city}}</address>
                  </h3>
                  </dt>
                  <dd class="font-md">{{detail.positionName}} <i v-if="detail.positionName && detail.maxSchool">|</i> {{detail.maxSchool}}</dd>
                  <dd>
                    <span class="mr-sm" v-if="detail.yearsOfWorking">工作经验： {{detail.yearsOfWorking}}年</span>
                    <span v-if="detail.city">城市：<address
                        class="address">{{detail.city}}</address></span>
                  </dd>
                </dl>

                <div class="d-table-cell text-right">
                  <button type="button" class="collection btn-line" name="button"
                          @click="collectExpert"
                          :class="{liked: detail.isFavorite === 1}">
                    <i class="start"></i>
                    <span v-if="detail.isFavorite === 1" class="favorite-text">取消收藏</span>
                    <span v-else class="favorite-text">收藏专家</span>
                    <small class="small">Add expert to your favorite</small>
                  </button>
                </div>
              </el-col>
            </el-row>

            <el-row class="introduction">
              <el-col :span="20">
                <p>专家介绍:</p>
                <p class="introduction-content">{{detail.expertIntroduces}}</p>
              </el-col>
              <el-col :span="4" class="text-right">
                <button type="button" name="button" class="btn btn-line" @click="openDialog('contact')">我要咨询专家
                  <small class="small">I want to consult an expert</small>
                </button>
                <nuxt-link :to="{ path: '/releaseResearch', query: { expertId: expertId } }" @click="isLogin(e)"
                           class="btn btn-line">邀请专家调研企业
                  <small class="small">Apply for expert's research</small>
                </nuxt-link>
                <button type="button" name="button" class="btn btn-line" @click="openDialog('interview')">我要采访专家
                  <small class="small">I want to interview an expert</small>
                </button>
              </el-col>
            </el-row>
          </el-col>

          <!-- 模板三   -->
          <el-col :span="16" v-if="expertType == 3">
            <dl class="info">
              <dt>
              <h3 class="clearfix">
                <span class="name">{{detail.expertName}}</span>
                <address ng-if="detail.city" class="address">{{detail.city}}</address>
              </h3>
              </dt>
              <dd>{{detail.positionName}} <i v-if="detail.positionName && detail.maxSchool">|</i> {{detail.maxSchool}}</dd>
            </dl>
          </el-col>
          <el-col :span="4" class="actions" v-if="expertType==3">
            <button type="button" class="collection btn-line" name="button"
                    @click="collectExpert"
                    :class="{liked: detail.isFavorite === 1}">
              <i class="start"></i>
              <span class="favorite-text" v-if="detail.isFavorite === 1">取消收藏</span>
              <span class="favorite-text" v-else>收藏专家</span>
              <small class="small">Add expert to your favorite</small>
            </button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 专家介绍 -->
    <div class="expert-introduce" v-if="expertType == 3">
      <div class="introduce website-container style-box">
        <header>
          <h3 class="expert-header">专家介绍</h3>
        </header>

        <div class="content">
          <p class="desc">{{ detail.expertIntroduces}}</p>

          <p class="text-center actions">
            <button type="button" name="button" class="btn btn-line" @click="openDialog('contact')">我要咨询专家<small class="small">I want to consult an expert</small>
            </button>
            <nuxt-link :to="{ path: '/releaseResearch', query: { expertId: expertId } }" @click="isLogin(e)"
                       class="btn btn-line">邀请专家调研企业<small class="small">Apply for expert's research</small>
            </nuxt-link>
            <button type="button" name="button" class="btn btn-line" @click="openDialog('interview')">我要采访专家<small class="small">I want to interview an expert</small>
            </button>
          </p>
        </div>
      </div>
    </div>
    <nuxt-child></nuxt-child>
    <!-- 联系单弹窗 -->
    <el-dialog title="发布联系单"
               v-model="contactDialogVisible"
               custom-class="yzk-dialog contact-dialog"
               @close="closeFormDialog('contact')"
               size="small">
      <el-form :model="contactForm"
               :rules="contactFormVerifyRule"
               ref="contactForm"
               label-width="120px">
        <el-form-item prop="detail"
                      label="专家信息：">
          <div class="form-expert-info">
            <h3><span :title="detail.expertName">{{ detail.expertName }}</span>
              <span class="city"
                    v-if="detail.city"
                    :title="detail.city">{{ detail.city | cut_str}}</span>
            </h3>
            <p><span :title="detail.positionName">{{ detail.positionName }}</span><span
                v-if="detail.positionName && detail.companyName"> | </span><span
                v-if="detail.companyName" :title="detail.companyName">{{ detail.companyName}}</span>
              <span v-if="detail.yearsOfWorking"> {{ Number(detail.yearsOfWorking) }}年</span></p>
            <p>{{ detail.expertIntroduces | cut_str(200) }}</p>
          </div>
        </el-form-item>
        <el-form-item prop="content"
                      label="联系内容：">
          <el-input type="textarea"
                    :rows="3"
                    :autofocus="true"
                    placeholder="请尽可能说明具体内容问题，并对问题的背景有所介绍，让专家能够快速理解您的问题"
                    v-model="contactForm.content">
          </el-input>
        </el-form-item>
        <div class="contact-info">
          <div class="contact-info-title">
            <h3>联系人信息</h3>
          </div>
          <ul class="form-col">
            <li>
              <el-form-item prop="intentionUserName"
                            label="联系人：">
                <el-input type="text"
                          v-model="contactForm.intentionUserName"
                          auto-complete="off"
                          placeholder="请填写发布者的姓名"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserTel"
                            label="联系电话：">
                <el-input type="text"
                          v-model="contactForm.intentionUserTel"
                          auto-complete="off"
                          placeholder="请务必填写联系电话，以便后续联系"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserCompany"
                            label="联系人公司：">
                <el-input type="text"
                          v-model="contactForm.intentionUserCompany"
                          auto-complete="off"
                          placeholder="请填写发布者公司信息，如公司名称等"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserJob"
                            label="联系人职务：">
                <el-input type="text"
                          v-model="contactForm.intentionUserJob"
                          auto-complete="off"
                          placeholder="请填写发布者的职务信息"></el-input>
              </el-form-item>
            </li>
          </ul>
          <el-form-item prop="intentionUserEmail"
                        label="电子邮箱：">
            <el-input type="text"
                      v-model="contactForm.intentionUserEmail"
                      auto-complete="off"
                      placeholder="请填写发布者电子邮箱"></el-input>
          </el-form-item>
          <div class="dialog-btn-item">
            <el-button @click="closeFormDialog('contact')"
                       class="btn-cancel">取消
            </el-button>
            <el-button type="primary"
                       class="btn-contactSubmit"
                       :disabled="contactFormSubmitting"
                       @click.prevent="contactSubmit">提交
            </el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>

    <!-- 采访单弹窗 -->
    <el-dialog title="发布采访单"
               v-model="interviewDialogVisible"
               custom-class="yzk-dialog interview-dialog"
               @close="closeFormDialog('interview')"
               size="small">
      <el-form :model="interviewForm"
               :rules="interviewFormVerifyRule"
               ref="interviewForm"
               label-width="120px">
        <el-form-item prop="detail"
                      label="专家信息:"
                      v-if="detail">
          <div class="form-expert-info">
            <h3><span :title="detail.expertName">{{ detail.expertName }}</span>
              <span class="city"
                    v-if="detail.city"
                    :title="detail.city">{{ detail.city | cut_str }}</span>
            </h3>
            <p><span :title="detail.positionName">{{ detail.positionName }}</span><span
                v-if="detail.positionName && detail.companyName"> | </span><span
                v-if="detail.companyName" :title="detail.companyName">{{ detail.companyName }}</span>
              <span v-if="detail.yearsOfWorking"> {{ Number(detail.yearsOfWorking) }}年</span></p>
            <p>{{ detail.expertIntroduces | cut_str(200) }}</p>
          </div>
        </el-form-item>
        <el-form-item prop="requirementContent"
                      label="采访提纲:">
          <el-input type="textarea"
                    :rows="3"
                    :autofocus="true"
                    placeholder="请尽可能说明采访内容，并对相关背景有所介绍，以便专家能够快速响应您的采访要求"
                    v-model="interviewForm.requirementContent">
          </el-input>
        </el-form-item>
        <div class="contact-info">
          <div class="contact-info-title">
            <h3>媒体信息</h3>
          </div>
          <ul class="form-col">
            <li>
              <el-form-item prop="intentionUserName"
                            label="记者姓名:">
                <el-input type="text"
                          v-model="interviewForm.intentionUserName"
                          auto-complete="off"
                          placeholder="请填写记者姓名"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserTel"
                            label="手机号:">
                <el-input type="text"
                          v-model="interviewForm.intentionUserTel"
                          auto-complete="off"
                          placeholder="请务必填写联系电话，以便后续联系"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserCompany"
                            label="媒体名称:">
                <el-input type="text"
                          v-model="interviewForm.intentionUserCompany"
                          auto-complete="off"
                          placeholder="请填写媒体名称"></el-input>
              </el-form-item>
            </li>
          </ul>
          <el-form-item prop="intentionUserEmail"
                        label="电子邮箱:">
            <el-input type="text"
                      v-model="interviewForm.intentionUserEmail"
                      auto-complete="off"
                      placeholder="请填写记者电子邮箱"></el-input>
          </el-form-item>
          <div class="dialog-btn-item">
            <el-button @click="closeFormDialog('interview')"
                       class="btn-cancel">取消
            </el-button>
            <el-button type="primary"
                       class="btn-contactSubmit"
                       :disabled="interviewFormSubmitting"
                       @click.prevent="interviewSubmit">提交
            </el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import utils from '~/plugins/utils'

  export default {
    name: 'expert-layout',
    data () {
      return {
        loading: false,
        contactDialogVisible: false,
        interviewDialogVisible: false,
        expertInfo: {},
        expertAttribute: '',
        researchList: [],
        contactFormSubmitting: false,
        interviewFormSubmitting: false,
        // 发布联系单校验规则
        contactFormVerifyRule: {
          content: [
            {message: '请输入联系内容', trigger: 'blur', required: true}
          ],
          intentionUserName: [
            {message: '请输入联系人姓名', trigger: 'blur', required: true}
          ],
          intentionUserJob: [
            {message: '请输入联系人职务', trigger: 'blur', required: true}
          ],
          intentionUserCompany: [
            {message: '请输入联系人公司', trigger: 'blur', required: true}
          ],
          intentionUserEmail: [
            {message: '请输入电子邮箱', trigger: 'blur', required: true}
          ],
          intentionUserTel: [
            {message: '请输入联系电话', trigger: 'blur', required: true}
          ]
        },
        // 发布采访校验规则
        interviewFormVerifyRule: {
          requirementContent: [
            {message: '请输入采访提纲', trigger: 'blur', required: true}
          ],
          intentionUserName: [
            {message: '请输入记者姓名', trigger: 'blur', required: true}
          ],
          intentionUserCompany: [
            {message: '请输入媒体名称', trigger: 'blur', required: true}
          ],
          intentionUserEmail: [
            {message: '请输入电子邮箱', trigger: 'blur', required: true}
          ],
          intentionUserTel: [
            {message: '请输入联系电话', trigger: 'blur', required: true}
          ]
        },
        // 发布采访单数据
        interviewForm: {},
        // 联系单数据
        contactForm: {}
      }
    },
    async asyncData ({params}) {
      let args = utils.parseParams(params, 'id')
      let expertId = args[0]
      let expertType = args[1]
      try {
        const {data} = await axios.get(`/webapi/v2/detailedExpertInfo/${expertId}`)
        return {
          expertId: expertId,
          expertType: expertType,
          detail: data.rows || {} // TODO: 放在为null时js报错，导致服务端渲染失败
        }
      } catch (e) {
        console.log(e)
      }
    },

    head () {
      const detail = this.detail

      return {
        title: `${detail.expertName} ${detail.positionName} ---聚贸云智库`,
        meta: [{
          hid: 'keyword',
          name: 'keyword',
          content: `${detail.positionName}`
        }]
      }
    },

    async fetch ({store}) {
      const {data} = await axios.get(`/webapi/v2/indexBottomMenu`)
      store.commit('SET_FOOTER', data.rows)
    },

    methods: {
      collectExpert (status) {
        if (!this.$store.getters.getUser.id) {
          this.$store.commit('SET_OPEN', {opend: true})
          return false
        }
        if (this.detail.isFavorite !== 1) {
          axios.get(`/webapi/v2/favorite/1/${this.expertId}`).then(({data}) => {
            if (data.statusCode === 200) {
              this.detail.isFavorite = 1
            }
          })
        } else {
          axios.delete(`/webapi/v2/favorite/1/${this.expertId}`).then(({data}) => {
            if (data.statusCode === 200) {
              this.detail.isFavorite = 0
            }
          })
        }
      },
      isLogin (e) {
        if (!this.$store.getters.getUser.id) {
          this.$store.commit('SET_OPEN', {opend: true})
          e.preventDefault()
        }
      },
      openDialog (formName) {
        if (!this.$store.getters.getUser.id) {
          this.$store.commit('SET_OPEN', {opend: true})
          return false
        }
        this[`${formName}DialogVisible`] = true
      },
      interviewSubmit () {
        if (!this.interviewFormSubmitting) {
          this.interviewFormSubmitting = true
          this.$refs.interviewForm.validate((valid) => {
            if (valid) {
              let data = Object.assign(this.interviewForm, {
                expertNo: this.expertId
              })
              axios.post('/webapi/v2/InterviewBill', data).then((rep) => {
                throw 'InterviewBill'
                let data = rep.data
                if (data.statusCode === 200) {
                  this.closeFormDialog('interview')
                  this.$alert('采访单发送成功', '提示', {
                    type: 'success',
                    confirmButtonText: '确定'
                  })
                  this.changeSubmitStatus('interviewForm')
                } else {
                  // 显示错误信息
                  this.$message({
                    message: data.desc || '提交采访单出错',
                    type: 'error'
                  })
                  this.changeSubmitStatus('interviewForm')
                }
              })
            } else {
              this.interviewFormSubmitting = false
              return false
            }
          })
        }
      },
      // 提交联系单
      contactSubmit () {
        if (!this.contactFormSubmitting) {
          this.contactFormSubmitting = true
          this.$refs.contactForm.validate((valid) => {
            if (valid) {
              let data = Object.assign(this.contactForm, {
                objectId: this.expertId
              })
              axios.post('/webapi/v2/contactBill', data).then((rep) => {
                let data = rep.data
                if (data.statusCode === 200) {
                  this.closeFormDialog('contact')
                  this.$alert('联系单发送成功', '提示', {
                    type: 'success',
                    confirmButtonText: '确定'
                  })
                  this.changeSubmitStatus('contactForm')
                } else {
                  // 显示错误信息
                  this.$message({
                    message: data.desc || '提交联系单出错',
                    type: 'error'
                  })
                  this.changeSubmitStatus('contactForm')
                }
              })
            } else {
              this.contactFormSubmitting = false
              return false
            }
          })
        }
      },
      // 改变表单提交状态
      changeSubmitStatus (formName, time) {
        setTimeout(() => {
          this[`${formName}Submitting`] = false
        }, time || 3000)
      },
      // 关闭表单弹窗
      closeFormDialog (formName) {
        this[`${formName}DialogVisible`] = false
        this.$refs[`${formName}Form`].resetFields()
      }
    },
    watch: {
      async userInfo (val, newVal) {
        try {
          const {data} = await axios.get(`/webapi/v2/detailedExpertInfo/${this.expertId}`)
          this.detail = data.rows
        } catch (e) {
          console.log(e)
        }
        // 发布采访单数据
        this.interviewForm = {
          requirementContent: '',
          intentionUserName: this.userInfo.realName || '',
          intentionUserPosition: this.userInfo.job || '',
          intentionUserCompany: this.userInfo.companyName || '',
          intentionUserEmail: this.userInfo.email || '',
          intentionUserTel: this.userInfo.remark || ''
        }
        // 联系单数据
        this.contactForm = {
          content: '',
          intentionUserName: this.userInfo.realName || '',
          intentionUserCompany: this.userInfo.companyName || '',
          intentionUserEmail: this.userInfo.email || '',
          intentionUserTel: this.userInfo.remark || ''
        }
      }
    },
    computed: {
      userInfo () {
        return this.$store.getters.getUser
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  // 弹窗公共样式
  .yzk-dialog {
    .el-dialog__header {
      background: #1d86eb;
      line-height: 35px;
      padding-top: 0;
    }
    .el-dialog__title {
      color: #fff;
      font-weight: normal;
    }
    .el-dialog__close {
      color: #fff;
    }
    .el-dialog__close:hover {
      color: #efefef;
    }
    .el-dialog__close:before {
      font-size: 14px;
    }
    .dialog-btn-item {
      text-align: center;
      padding: 40px 0 10px;
    }
    .btn-iknow {
      width: 90px;
    }
    .el-dialog__headerbtn {
      margin-top: 10px;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
  .form-expert-info {
    h3 {
      font-weight: normal;
      font-size: 24px;
      margin-bottom: 0;

      .city {
        font-size: 14px;
        margin-left: 20px;
        padding-left: 20px;
        background: url('~/assets/img/location.png') no-repeat left center;
      }
    }
  }

  .contact-info {

    .contact-info-title {
      border-bottom: 1px solid #dedede;
      margin-top: 30px;
      h3 {
        color: #3e3e3e;
        font-size: 16px;
        font-weight: normal;
        display: inline-block;
        border-bottom: 3px solid #2788e8;
        margin-bottom: -1px;
        padding: 5px 0;
      }
    }
    .form-col {
      margin-top: 20px;
      overflow: hidden;
      li {
        float: left;
        width: 50%;
      }
    }
    .dialog-btn-item {
      padding-top: 20px;
      .btn-cancel {
        width: 100px;
      }
    }
  }

  // 专家介绍
  .expert-introduce {
    padding: 95px 0;

    .expert-header {
      font-size: 18px;
      text-align: center;
      font-weight: normal;
      color: #3e3e3e;
    }

    .btn.btn-line {
      color: #2788e8;
      border-color: #2788e8;
      &:hover {
        color: #fff;
      }

    }

    .content {
      padding: 0 78px;
      color: #6e6e6e;
      position: relative;
    }

    .introduce {
      position: relative;
    }

    .introduce::before, .introduce::after {
      content: "";
      position: absolute;
      width: 24px;
      height: 18px;
    }

    .introduce::before {
      background: url('~assets/img/quotes-left.png') no-repeat;
      left: 0;
      top: 0;
    }

    .introduce::after {
      background: url('~assets/img/quotes-right.png') no-repeat;
      right: 0;
      bottom: 0;
    }

    .desc {
      line-height: 26px;
    }

    .actions {
      margin-top: 35px;
    }

  }

  .info-wrap {
    border-bottom: 1px solid #6e6e6e;
    padding-bottom: 12px;
  }

  .img-box {
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }

  .favorite-text {
    display: inline-block;
    vertical-align: middle;
  }

  .introduction {
    padding: 16px 0;
    line-height: 26px;
  }

  .introduction-content {
    height: 80px;
    overflow: hidden;
  }

  .btn {
    width: 175px;
    text-align: center;
    padding: 2px 8px;
    margin-left: 15px;
    color: #fff;
    border-color: #fff;
    font-size: 14px;
    line-height: 1.4;
    vertical-align: middle;
    &:first-child {
      margin-left: 0;
    }

    &:hover {
      color: #fff;
      border-color: #2788e7;
    }

    .small {
      display: block;
    }

  }

  .expert-info {
    padding: 40px 0;
    background: url('~assets/img/bg-expertdetail.jpg');
    min-height: 240px;
    color: #fff;

    .img-box {
      height: 160px;
      width: 160px;
      border-radius: 100%;
    }

    .info {
      dt {
        font-size: 24px;
        margin-bottom: 16px;
      }

      .name {
        display: inline-block;
        margin-right: 20px;
      }

      .address {
        display: inline-block;
        font-style: normal;
        font-size: 14px;
        .location {
          margin-right: 8px;
          vertical-align: top;
        }

      }
      dd {
        line-height: 28px;
      }

    }

    .actions {
      padding-top: 65px;
    }

    .collection {
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      padding: 5px 8px;

      &.btn-line {
        border-color: #fff;

        &:hover {
          border-color: #2788e8;
        }

      }

      .start {
        display: inline-block;
        vertical-align: middle;
        width: 15px;
        height: 14px;
        margin-right: 10px;
        background-image: url('~assets/img/start-white.png');
      }

      small {
        display: block;
      }

    }
  }

  // 模板二
  .style-1 {

    .collection {
      margin-top: 20px;
    }

  }

  .style-2 {

    .btn {
      margin: 0 0 20px;
    }

  }

  // 收藏成功
  .expert-info .collection.liked {
    border-color: #2788e8;
    background-color: #2788e8;
    &:focus, &:hover {
      border-color: #2788e8;
    }
  }
</style>
