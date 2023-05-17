import { projectStorage } from "@/firebase/config";
import {ref} from "vue"
import getUser from "./getUser";

const {user}= getUser()

const useStorage = ()=>{
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file)=>{
        filePath.value= `covers/${user.value.uid}/${file.name}`
        const storageRef= projectStorage.ref(filePath.value)
        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (error) {
            console.log(error.message)
            error.value= error.message
        }
    }

    const deleteImage = async (path)=>{
        const storageRef= projectStorage.ref(path)
        // const storageRef = firebase.storage().ref(file.name);
        try {
            await storageRef.delete()
        } catch (error) {
            console.log(error.message);
            error.ref = error.message
        }
    }

    return {error, url, filePath, uploadImage, deleteImage} 
}


export default useStorage