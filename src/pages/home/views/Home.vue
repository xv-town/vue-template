<script>
export default {
  name: 'Home',
  render (h) {
    return <div class="home">
      <h1>This is an home page</h1>
      <img alt="Vue logo" src={ require('../../../assets/logo.png') } />
    </div>;
  }
};
</script>
