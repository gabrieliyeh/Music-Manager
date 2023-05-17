<template>
  <div class="navbar">
    <nav>
      <img
        src="@/assets/music-manager-logo.png"
        alt="website logo"
        class="logo"
      />
      <h1>
        <router-link :to="{ name: 'home' }"> Music Manager </router-link>
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{name: 'CreatePlaylist'}" > Create Playlist</router-link>
          <router-link :to="{name: 'UserPlaylist'}" > My Playlists</router-link>
          <span>Hi there, {{user.displayName}}</span>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
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
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import {useRouter} from "vue-router"

export default {
  setup() {
    const { user } = getUser();
    const { logout, error } = useLogout();
    const router = useRouter()

    const handleLogout= async ()=>{
        await logout()
        router.push({name: "Login"})
    }

    return { user, error, handleLogout };
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
nav .links {
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;

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


@media screen and (max-width: 768px) {
  
}
</style>
