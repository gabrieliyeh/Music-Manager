import {ref} from 'vue'
import { projectAuth } from '@/firebase/config'

const error = ref(null)
const loading = ref(false)

const signup = async (email, password, displayName)=> {
    error.value = null
    loading.value = true
    try{
       const res = await projectAuth.createUserWithEmailAndPassword(email, password)
      
       if(!res){
           throw new Error('Could not complete signup')
       }
       await res.user.updateProfile({displayName})
       error.value = null
       loading.value = false
       return res
    }catch(err){
        loading.value = false
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup = () => {

    return {error, signup,loading}
}

export default useSignup

