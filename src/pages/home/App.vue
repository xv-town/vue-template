<template>
<div id="app">
  <div id="nav">
    <router-link to="/vue/home">Home</router-link> |&nbsp;
    <router-link to="/vue/home/about">About</router-link> |&nbsp;
    <router-link to="/vue/home/docs">Docs</router-link>
  </div>
  <router-view />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import './App.scss';

@Component
class App extends Vue {
};

export default App;
</script>
