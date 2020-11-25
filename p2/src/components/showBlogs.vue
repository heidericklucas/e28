<template>
  <div id="show-blogs">
      <h1>All Blog Articles</h1>
      <div v-for="blog in blogs" v-bind:key="blog" class="single-blog">
          <h2>{{ blog.title }}</h2>
          <article>{{ blog.body }}</article>
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
  create() {
      this.$http.get('https://jsonplaceholder.typicode.com/posts').then(function(data){
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
