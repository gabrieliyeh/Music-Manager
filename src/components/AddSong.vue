<template>
  <div class="add-song">
    <button v-if="!toggleForm" @click="toggleForm = true"> Add Songs   
    </button>
    <form v-else @submit.prevent="handleSubmit">
        <div class="heading">
        <h4> Add a New Song</h4>
        <svg @click="toggleForm = false" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 96 960 960" width="28"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
        </div>
        <input type="text" placeholder="song title" required v-model="title">
        <input type="text" placeholder="Artist" required v-model="artist">
        <button> Add</button>
    </form>
  </div>
</template>

<script>
import {ref} from "vue"
import useDocument from '@/composables/useDocument'
export default {
  watch: {
  },
    props: ['playlist'],
    setup(props){
        const title= ref('')
        const artist = ref('')
        const toggleForm = ref(false)
        const {updateDoc} = useDocument('playlists', props.playlist.id)

        const handleSubmit = async ()=>{
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 1000000)
            }
            await updateDoc({
                songs: [...props.playlist.songs, newSong]
            })
            title.value = ''
            artist.value = ''
        }

        return {title, artist, toggleForm, handleSubmit}
    }
}
</script>

<style scoped>
.add-song{
    text-align: center;
    margin-top: 40px;
}

form{
    max-width: 100%;
    text-align: left;
}
.heading{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
svg{
    fill: red;
    cursor: pointer;
}
</style>