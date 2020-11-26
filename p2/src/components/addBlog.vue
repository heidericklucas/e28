<template>
    <div id="add-blog">
        <h2> Add a New Blog Post</h2>
        <form v-if="!submitted">
            <label>Blog Title:</label>
            <input type="text" v-model.lazy="blog.title" required />
            <label>Blog Content:</label>
            <textarea v-model.lazy="blog.content"></textarea>
            <div id="checkboxes">
                <input type="checkbox" value="nature" v-model="blog.categories"/>
                <label>Nature</label>
                <input type="checkbox" value="technology" v-model="blog.categories"/>
                <label>Technology</label>
                <input type="checkbox" value="food" v-model="blog.categories"/>
                <label>Food</label>
                <input type="checkbox" value="travel" v-model="blog.categories"/>
                <label>Travel</label>
            </div>
            <label>Author:</label>
            <div>
                <input type="text" v-model.lazy="blog.author" required />
            </div>
            <button v-on:click.prevent="post">Add Blog Post</button>
        </form>
        <div v-if="submitted">
            <h3>Thanks for adding your post!</h3>
        </div>
        <div id="preview">
            <h3>Preview Blog</h3>
            <p>Title: {{ blog.title }}</p>
            <p>Content:</p>
            <p>{{ blog.content }}</p>
            <p>Categories:</p>
            <ul>
                <li v-for="category in blog.categories" v-bind:key="category">{{ category }}</li>
            </ul>
            <p>Author: {{ blog.author }}</p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
           blog: {
               title: "",
               content: "",
               categories: [],
               author: ""
           },
           authors: [],
           submitted: false,
        }
    },
    methods: {
        post: function() {
            this.$http.post('https://p2-blog-harvard.firebaseio.com/posts.json', this.blog).then(function(data){
                console.log(data);
                this.submitted = true;
            });
        }
    }
}

</script>

<style>
#add-blog * {
    box-sizing:border-box;
}
#add-blog {
    margin: 20px auto;
    max-width: 500px;
}
label {
    display: block;
    margin: 20px 0 10px;
}
input[type="text"], textarea {
    display: block;
    width: 100%;
    padding: 8px;
}
#preview {
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
h3 {
    margin-top: 10px;
}
#checkboxes input {
    display: inline-block;
    margin-right: 10px;
}
#checkboxes label {
    display: inline-block;
}
</style>