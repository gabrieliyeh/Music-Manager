import { projectAuth } from "@/firebase/config"
import {ref} from 'vue'

const error = ref(null)
const loading = ref(false)

const login = async (email, password) => {
    error.value = null
    loading.value = true

    try{
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value= null
        loading.value = false
        return res
    }catch(err){
        loading.value = false
        console.log(err.message)
        error.value = 'Invalid Credentials'
    }
}

const useLogin = () => {

    return {error, login, loading}
}

export default useLogin