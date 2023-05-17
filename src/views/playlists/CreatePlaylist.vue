<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" placeholder="Playlist title" v-model="title" required />
    <textarea required placeholder="Playlist description" v-model="description">
    </textarea>
    <label for=""> Upload playlist cover image</label>
    <input type="file" @change="handleChange" />
    <div v-if="fileError" class="error">
      {{ fileError }}
    </div>
    <div class="error"></div>
    <button :disabled='loading'> {{ loading ? "loading..." : "Create"}} </button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage"
import useCollection from "@/composables/useCollection"
import getUser from "@/composables/getUser"
import {timestamp} from "@/firebase/config"
import {useRouter} from "vue-router"

export default {
  props: {},
  setup() {
    const {filePath, url, uploadImage}= useStorage()
    const {error , addDoc}= useCollection("playlists")
    const {user}= getUser()
    const router = useRouter()

    const title = ref("");
    const description = ref(""); 
    const file = ref(null);
    const fileError = ref(null);
    const loading = ref(false)

    const handleSubmit = async () => {
      loading.value = true
        if(file.value){
            await uploadImage(file.value)
            const res=  await addDoc({
              title: title.value,
              description: description.value,
              userId: user.value.uid,
              userName: user.value.displayName,
              coverUrl: url.value,
              filePath: filePath.value,
              songs: [],
              createdAt: timestamp() 
            })

            if(!error.value){
              console.log("playlist added")
                 router.push({name: "PlaylistDetails", params: {id: res.id}})
            }
        } else{
            loading.value = false
           fileError.value = "Please select an image file (png or jpg)";
           
        }
        loading.value = false
    };

    const types = ["image/png", "image/jpeg", "image/jpg"];

    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return { title, description, fileError, handleSubmit, handleChange, loading };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
