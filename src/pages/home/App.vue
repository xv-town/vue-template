<script>
import './App.less';

export default {
  name: 'App',
  render (h) {
    const { micro_path } = this.$project;
    return <div id="app">
      <div id="nav">
        <router-link to={`${micro_path}/home`}>Home</router-link> |&nbsp;
        <router-link to={`${micro_path}/home/about`}>About</router-link> |&nbsp;
        <router-link to={`${micro_path}/home/docs`}>Docs</router-link>
      </div>
      <router-view />
    </div>;
  }
};
</script>
