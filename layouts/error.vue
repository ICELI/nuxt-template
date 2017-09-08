<template>
  <div>
    <section class="error">
      <div class="website-container text-center">
        <img src="~assets/img/404.png"/>

        <div class="tip">
          <p>矮油！您迷路了... </p>
          <p>很抱歉您访问的页面不存在！</p>
          <nuxt-link to="/">
            <el-button type="primary">回到首页</el-button>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Top from '~/components/Top.vue'
  import MyHeader from '~/components/Header.vue'
  import MyFooter from '~/components/Footer.vue'
  import Login from '~/components/Login.vue'

  export default {
    components: {
      Top,
      MyHeader,
      MyFooter,
      Login
    }
  }
</script>

<style lang="scss" scoped>
  .error {
    padding-top: 65px;
    border-top: 2px solid #2788e8;
  }

  .tip {
    font-size: 34px;
    color: #343434;
    // margin-top: 65px;
    padding: 65px 0;
  }
</style>
