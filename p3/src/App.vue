<template>
  <div>
    <nav id="header">
      <ul>
        <li><router-link to="/">BLOG</router-link></li>
        <li><router-link to="/add">ADD A NEW BLOG POST</router-link></li>
        <li><router-link to="/account">ACCOUNT</router-link></li>
        <li><router-link to="/donate">DONATE</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import addBlog from './components/addBlog.vue';
import showBlogs from './components/showBlogs.vue';
import Donate from './components/Donate.vue';
import accountPage from './components/accountPage.vue';
import accessDenied from './components/accessDenied.vue';

export default {
  name: 'App',
  Components: {
    'add-blog': addBlog,
    'show-blogs': showBlogs,
    'donate': Donate,
    'account-page': accountPage,
    'access-denied': accessDenied,
  },
  data() {
    return {
      
    }
  },
  methods: {

  },
  mounted() {   
    this.$store.dispatch('authUser');
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#header > ul {
  list-style-type: none;
  text-align: center;
  margin:0;
}
#header > ul > li {
  display: inline-block;
  margin: 0 10px;
}
#header a {
  color: #fff;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
}
#header {
  background: #444;
  padding: 14px 0;
  margin-bottom: 40px;
}
</style>
