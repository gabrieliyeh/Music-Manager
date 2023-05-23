<template>
  <div class="navbar">
    <nav>
      <div class="left">
        <img
        src="@/assets/music-manager-logo.png"
        alt="website logo"
        class="logo"
      />
      <h1>
        <router-link :to="{ name: 'home' }"> Music Manager </router-link>
      </h1>
      </div>
      <svg @click="handleToggle"  xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 96 960 960" width="28"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        <Sidebar  :handleToggle="handleToggle" :handleLogout="handleLogout" :showSidebar="showSidebar" :handleCloseSidebar="handleCloseSidebar"/>
      <div class="links">
        <div v-if="user">
          <router-link :to="{name: 'home'}" > Home</router-link>
          <router-link :to="{name: 'CreatePlaylist'}" > Create Playlist</router-link>
          <router-link :to="{name: 'UserPlaylist'}" > My Playlists</router-link>
          <span>Hi there, {{user.displayName}}</span>
          <button @click="handleLogout">Logout</button>
        </div>
        <div  v-else>
          <router-link class="btn" :to="{ name: 'SignUp' }"
            >SignUp
            </router-link
          >
          <router-link class="btn" :to="{ name: 'Login' }"
            >Log in
            </router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import {useRouter} from "vue-router";
import Sidebar from '../sidebar/Sidebar.vue';

export default {
  components:{
    Sidebar
  },
  props:['route'],
  setup(props) {
    const { user } = getUser();
    const { logout, error } = useLogout();
    const router = useRouter()
    const showSidebar = ref(false)
    const handleToggle = ()=> {
      showSidebar.value = !showSidebar.value
    }

    watch(() => props.route.path, () => {
     handleCloseSidebar()
    });
    
    const handleLogout= async ()=>{
      await logout()
      router.push({name: "Login"})
    }
      const handleCloseSidebar= ()=>{
      showSidebar.value = false
    }

    return { user, error, handleLogout, handleToggle,showSidebar, handleCloseSidebar };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
}
.left{
  display: flex;
  align-items: center;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links div  {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
  margin-top: 0;
}
.logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

span{
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px  solid #eee;
}
svg{
  display: none;
}
svg:hover{
  transform: scale(1.20);
  transition: transform 0.5s ease-in ;
}


@media screen and (max-width: 768px) {
 .navbar  .links {
    display: none;
  }
  .links a {
    display: none;
  }
  svg{
  display: block;
  cursor: pointer;
}

}
</style>
