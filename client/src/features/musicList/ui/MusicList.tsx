import { useEffect, useState } from 'react'
import { useDispatch,useSelector} from 'react-redux'

import { onGetMusicInfo,onGetAudioInfoById } from '@/shared/api'
import { Card } from '@/shared/ui/card'

import { setAppPlayerInfo } from '../../../app/providers/StoreProvider/config/appPlayerSlice'
import epiclogo from '../../appPlayer/ui/epiclogo.jpg'

interface MusicInfo {
    _id: string
    name: string
    author: string
    audioId: string
    genres: string[]
}

export const MusicList = () => {
    const [musicInfoList, setMusicInfoList] = useState<MusicInfo[] | null>(null)
    const {playerInfo} = useSelector(state => state.appPlayerSlice)
    const dispatch = useDispatch()

   async function handleMusicInfo(name: string, author: string, audioId: string) {
        const audioInfo = await onGetAudioInfoById(audioId)
        if(!audioInfo.file){
            return
        }
        const audioUrl = URL.createObjectURL(new Blob([audioInfo.buffer], { type: audioInfo.mimetype }));
        console.log(audioUrl)
        const musicInfo = {
            name,
            author,
            audioId,
            audioUrl
        }
        dispatch(setAppPlayerInfo(musicInfo))
    }

//    function handleAudioInfo(audioId){
      
//    }

    useEffect(() => {
        onGetMusicInfo().then((res) => setMusicInfoList(res.musicList))
    }, [])

//    useEffect(()=>{
//           onGetAudioInfoById(playerInfo.audioId).then(res => console.log(res))
//    },[handleMusicInfo])
    

    return (
        <div className="container">
            <div className="flex flex-col gap-5">
                {musicInfoList &&
                    musicInfoList.map((item) => (
                        <Card
                            onClick={() => handleMusicInfo(item.name, item.author, item.audioId)}
                            key={item._id}
                            className="py-2 px-2"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 overflow-hidden rounded-lg">
                                    <img
                                        className="w-full h-auto"
                                        src={epiclogo}
                                        alt="Song cover"
                                    />
                                </div>
                                <div className="text-sm text-primary-foreground font-medium">
                                    <h3>{item.name}</h3>
                                    <p className="text-xs mr-8">{item.author}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
            </div>
        </div>
    )
}
