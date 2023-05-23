<template>
<Suspense>
  <Navbar :route="route"/>
</Suspense>
<div class="content" >
  <router-view/>
</div>
</template>

<script>
import { useRoute } from 'vue-router';
import Navbar from "./components/navbar/Navbar.vue";

export default {
  components:{
    Navbar
  },
  setup(){
    const route = useRoute()
    return {route}
  }
}
</script>

<style>
.content{
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}

</style>
