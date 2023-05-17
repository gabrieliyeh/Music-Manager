import {ref} from 'vue'
import { projectFirestore } from '@/firebase/config'

const useCollection = (collection) => {
    const error = ref(null)
    const loading = ref(false)

    const addDoc = async(doc) => { 
        loading.value = true
        try {
         const res =  await projectFirestore.collection(collection).add(doc)
           loading.value = false
           return res
        } catch (error) {
            loading.value = false
            console.log(error.message)
            error.value = "could not send the message"
        }
    }
    return {addDoc, error, loading}
}


export default useCollection