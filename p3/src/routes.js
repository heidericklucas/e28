import showBlogs from './components/showBlogs.vue';
import addBlog from './components/addBlog.vue';
import Donate from './components/Donate.vue';
import accountPage from './components/accountPage.vue';

export default [
    {path: '/', component: showBlogs},
    {path: '/add', component: addBlog},
    {path: '/donate', component: Donate},
    {path: '/account', component: accountPage}
]