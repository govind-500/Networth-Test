import Vue from 'vue';
import VueRouter from 'vue-router';

import SearchUsers from './components/SearchUsers.vue';
import UserDetails from './components/UserDetails.vue';
import RepositoryList from './components/RepositoryList.vue';
import RepositoryDetails from './components/RepositoryDetails.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: SearchUsers },
  { path: '/user/:username', component: UserDetails },
  { path: '/user/:username/repositories', component: RepositoryList },
  { path: '/repository/:owner/:repo', component: RepositoryDetails },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
