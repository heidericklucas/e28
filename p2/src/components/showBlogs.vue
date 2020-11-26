<template>
  <div id="show-blogs">
      <h1>All Blog Articles</h1>
      <div v-for="blog in blogs" v-bind:key="blog" class="single-blog">
          <h2>{{ blog.title }}</h2>
          <article>{{ blog.content }}</article>
          <p>Author: {{ blog.author }}</p>
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
      this.$http.get('https://p2-blog-harvard.firebaseio.com/posts.json').then(function(data){
          return data.json();
      }).then(function(data) {
          var blogsArray = [];
          for (let key in data) {
              data[key].id = key
              blogsArray.push(data[key]);
          }
          this.blogs = blogsArray;
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
