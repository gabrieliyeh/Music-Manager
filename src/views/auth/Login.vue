<template>
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="email" v-model="email" required autocomplete>
      <input type="password" placeholder="password" v-model="password" required>
      <div class="error" v-if="error">{{error}}</div>
      <button :disabled="loading"> {{loading ? "logging you in.." : "log in"}}</button>
      <p>
        <span>
        Email: demo@gmail.com
      </span>
      <br>
      <span>
        Password: demo@1234
      </span>
      </p>
      
    </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from "../../composables/useLogin"
import {useRouter} from "vue-router"
export default {
  setup(){
      const {login, error, loading}= useLogin()

      const email = ref("")
      const password = ref("")
        const router = useRouter()

      const handleSubmit= async ()=>{
         await login(email.value, password.value)
        if(!error.value){
          console.log("user logged in")
          router.push({name: "UserPlaylist"})
        }

      }

      return {email, password, handleSubmit, error, loading}
  }

}
</script>

<style scoped>
p{
  margin-top: 50px;
}
</style>