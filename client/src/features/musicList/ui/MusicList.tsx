import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/providers/StoreProvider'
import { fetchMusicInfoList } from '@/shared/api/music'
import { Card } from '@/shared/ui/card'
import { Spinner } from '@/shared/ui/spinner'

import { setAppPlayerInfo } from '../../../app/providers/StoreProvider/config/appPlayerSlice'
import epiclogo from '../../appPlayer/ui/epiclogo.jpg'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store'

export const MusicList = () => {
    const { musicInfoList, appPlayerStatus } = useSelector(
        (state: RootState) => state.appPlayerStatus,
    )
    const dispatch = useDispatch<AppDispatch>()

    async function handleMusicInfo(name: string, author: string, audioId: string) {
        const musicInfo = {
            name,
            author,
            audioId,
            imgUrl: epiclogo,
        }
        dispatch(setAppPlayerInfo(musicInfo))
    }

    useEffect(() => {
        dispatch(fetchMusicInfoList())
    }, [])

    return (
        <div className="container">
            {appPlayerStatus === 'loading' ? (
                <Spinner />
            ) : (
                <div className="flex flex-col gap-5">
                    {Array.isArray(musicInfoList) &&
                        musicInfoList.map((item) => (
                            <Card
                                onClick={() =>
                                    handleMusicInfo(item.name, item.author, item.audioId)
                                }
                                key={item._id}
                                className="py-2 px-2 "
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
            )}
        </div>
    )
}
