<template>
  <div>
    <h1>Search Users</h1>
    <input v-model="search" placeholder="Enter GitHub username" />
    <button @click="searchUsers(search)" type="search" name="search" id="search">
      Search
    </button>

    <div v-if="selectedRepo">
      <h2>Repository: {{ selectedRepo.name }}</h2>
      <p>Commits: {{ selectedRepo.commits }}</p>
      <p>Forks: {{ selectedRepo.forks }}</p>
      <p>Issues: {{ selectedRepo.issues }}</p>
    </div>

    <div>
      <b-table striped hover :items="searchUsers(search)" :fields="fields">
        <template #cell(avatar_url)="row">
          <img :src="row.item.avatar_url" alt="User Avatar" height="50" />
        </template>
        <template #cell(login)="row">
          {{row.item.login}}
        </template>
        <template #cell(view_stats)="row">
          <button @click="fetchRepositoryStats(row.item.login)">View Stats</button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      users: [],
      fields: [
        { key: "id", label: "ID" },
        { key: "avatar_url", label: "Avatar", sortable: false },
        { key: "login", label: "Login Id" },
        {key:'view_stats',label:"View Stats"},
        { key: "node_id", label: "Node Id" },
        { key: "site_admin", label: "Site Admin" },
        { key: "type", label: "Type" },
      ],
      search: "",
      selectedRepo: null,
    };
  },
  async mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("https://api.github.com/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchUsers(search) {
      if (!this.search) {
        return this.users;
      }
      const searchResults = search.toLowerCase();
      return this.users.filter((user) => {
        return user.login.toLowerCase().includes(searchResults);
      });
    },
    fetchRepositoryStats(username) {
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
          const repositories = response.data;
          if (repositories.length > 0) {
            const selectedRepo = repositories[0]; // Select the first repository
            this.selectedRepo = {
              name: selectedRepo.name,
              commits: selectedRepo.commits_url,
              forks: selectedRepo.forks,
              issues: selectedRepo.open_issues,
            };
          } else {
            this.selectedRepo = null;
          }
        })
        .catch((error) => {
          console.error(error);
          this.selectedRepo = null;
        });
    },
  },
};
</script>
