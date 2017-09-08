<template>
  <div>
    <top/>
    <my-header/>
    <nuxt/>
    <my-footer/>

    <login/>

    <button v-show="($route.path === '/' && scrollTag)" @click="goTop()" class="back-top"></button>

    <nuxt-link v-show="$route.path !== '/'" :to="'/'" class="go-home">首页</nuxt-link>
  </div>
</template>

<script>
  import Top from '~/components/Top.vue'
  import MyHeader from '~/components/Header.vue'
  import MyFooter from '~/components/Footer.vue'
  import Login from '~/components/Login.vue'

  export default {
    data () {
      return {
        scrollTag: false,
        timer: null,
        scroll: '',
        speed: 100
      }
    },
    components: {
      Top,
      MyHeader,
      MyFooter,
      Login
    },
    mounted () {
      this.scrollTop()
      window.addEventListener('scroll', this.scrollTop)
    },
    destroyed () {
      window.removeEventlistener('scroll', this.scrollTop)
    },
    methods: {
      goTop () {
        clearInterval(this.timer)
        this.scroll = document.body.scrollTop || document.documentElement.scrollTop
        this.timer = setInterval(() => {
          if (this.scroll < 0) {
            clearInterval(this.timer)
            return false
          }
          this.scroll -= this.speed
          window.scrollTo(0, this.scroll)
        }, 16)
      },
      scrollTop () {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if (scrollTop > 500) {
          this.scrollTag = true
        } else {
          this.scrollTag = false
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  %btn-link {
    width: 45px;
    height: 45px;
    border-radius: 5px;
    background: rgba(161, 161, 161, .8);
    text-align: center;
    position: fixed;
    right: 5%;
    bottom: 10%;
    z-index: 10;
    border: none;
  }

  .go-home {
    padding: 5px;
    @extend %btn-link;
    color: #fff;
    font-size: 12px;

    &::before {
      content: "";
      display: block;
      width: 20px;
      margin: 0 auto;
      height: 20px;
      background: url('~assets/img/home.png') no-repeat center;
      background-size: 100%;
    }

  }

  .back-top {
    @extend %btn-link;

    &::after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 12px;
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
      transform: rotate(-45deg);
      position: relative;
      top: 2px;
      cursor: pointer;
    }

  }
</style>
