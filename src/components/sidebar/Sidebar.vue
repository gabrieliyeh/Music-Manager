<template>
  <aside
    @click.self="handleToggle"
    :class="[showSidebar ? 'transform' : '', 'backdrop']"
  >
    <div  :class="[showSidebar ? 'transform': '', 'sidebar']">
      <svg
        @click="handleToggle"
        xmlns="http://www.w3.org/2000/svg"
        height="28"
        viewBox="0 96 960 960"
        width="28"
      >
        <path
          d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
        />
      </svg>
      <div class="links" v-if="user">
        <router-link :to="{ name: 'home' }"> Home</router-link>
        <router-link :to="{ name: 'CreatePlaylist' }">
          Create Playlist</router-link
        >
        <router-link :to="{ name: 'UserPlaylist' }"> My Playlists</router-link>
        <span>Hi there, {{ user.displayName }}</span>
        <button @click="handleLogout">Logout</button>
      </div>
      <div class="links" v-else>
        <router-link class="btn" :to="{ name: 'SignUp' }">SignUp </router-link>
        <router-link class="btn" :to="{ name: 'Login' }">Log in </router-link>
      </div>
    </div>
  </aside>
</template>

<script>

import getUser from "@/composables/getUser";
export default {
  props: ["handleToggle", "handleLogout", "showSidebar", "handleCloseSidebar"],

  async setup() {
    const { user } = getUser();
    return { user};
  },
};
</script>

<style scoped>
.backdrop {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  transform: translateX(-100%); 
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
.transform {
  transform: translateX(0);
  opacity: 1;
}

.sidebar a:hover {
  color: grey;
  font-weight: bold;
}

.sidebar svg:hover {
  transform: scale(1.1);
}

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px;
  gap: 60px;
  justify-content: center;
  background: white;
}
.links {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 40px;
 align-items: center;


}
svg {
  cursor: pointer;
  fill: red;
  transition: 1s ease-in;
  margin-left: auto;
}

@media screen and (min-width: 768px) {
  .backdrop {
    display: none;
  }
}
</style>