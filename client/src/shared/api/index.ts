import axios from 'axios'

export const onGetMusicInfo = async () => {
    const response = await axios.get('http://localhost:3000/music',{
        headers:{'Access-Control-Allow-Origin':'*'}
    })
    return response.data
}

export const onGetAudioInfoById = async(id:string) => {
   const response = await axios.get(`https://music-app-production-0189.up.railway.app/audio/${id}`)
   return response.data
}