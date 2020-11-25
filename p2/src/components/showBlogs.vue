<template>
  <div id="show-blogs">
      <h1>All Blog Articles</h1>
      <div v-for="blog in blogs" v-bind:key="blog" class="single-blog">
          <h2>{{ blog.title }}</h2>
          <h3>{{ blog.author }}</h3>
          <article>{{ blog.content }}</article>
      </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
        blogs: []
    }
  },
  methods: {

  },
  created() {
      this.$http.get('http://localhost:3000/posts').then(function(data){
          this.blogs = data.body.slice(0,10);
      })
  }
}
</script>

<style>
#show-blogs {
    max-width: 800px;
    margin: 0 auto;
}
.single-blog {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
}
</style>
