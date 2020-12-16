import showBlogs from './components/showBlogs.vue';
import addBlog from './components/addBlog.vue';
import Donate from './components/Donate.vue';
import accountPage from './components/accountPage.vue';
import accessDenied from './components/accessDenied.vue';

export default [
    {path: '/', component: showBlogs},
    {path: '/add', component: addBlog},
    {path: '/donate', component: Donate, meta: {
        requiresAuth: true
    }},
    {path: '/account', component: accountPage},
    {path: '/denied', component: accessDenied}
]