<template>
 <form @submit.prevent="handleSubmit" class="login-form">
      <h3>Sign up</h3>
      <input type="text" placeholder="display name" v-model="displayName" required>
      <input type="email" placeholder="email" v-model="email" required autocomplete>
      <input type="password" placeholder="password" v-model="password" required>
      <div class="error" v-if="error">{{error}}</div>
      <button :disabled="loading"> {{loading ? "signing you up.." : "sign up"}}</button>
    </form>
</template>

<script>
import useSignup from "../../composables/useSignup"
import {useRouter} from "vue-router"
import {ref} from "vue"
export default {
    setup(){
        const { signup, error, loading} = useSignup()
        const router = useRouter()
        const email = ref("")
        const password= ref("")
        const displayName = ref("")

        const handleSubmit = async ()=> {
           const res = await signup(email.value, password.value, displayName.value)
           if(res){
                
                 router.push({name: "UserPlaylist"})
           }
        }
        return {error, loading, email, password, displayName, handleSubmit}
    }

}
</script>

<style>

</style>