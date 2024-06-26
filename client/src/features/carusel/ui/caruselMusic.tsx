import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { setAppPlayerInfo } from '@/app/providers/StoreProvider/config/appPlayerSlice'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store'
import { Card } from '@/shared/ui/card'

interface CaruselMusic {
    id: string
    typeCarousel: string
    imgUrl: string
    name: string
    author: string
    audioId: string | undefined
}

export const CaruselMusic: FC<CaruselMusic> = ({ id, imgUrl, name, author, audioId }) => {
    const dispatch = useDispatch<AppDispatch>()

    async function handleMusicInfo(name: string, author: string, audioId: string | undefined) {
        const musicInfo = {
            name,
            author,
            audioId,
            imgUrl,
        }
        dispatch(setAppPlayerInfo(musicInfo))
    }
    return (
        <>
            <Card
                key={id}
                onClick={() => handleMusicInfo(name, author, audioId)}
                className="p-1.5 w-44 flex-shrink-0 h-44"
            >
                <div className="relative h-24 w-full rounded-lg overflow-hidden">
                    <img className="absolute object-cover h-full w-full" src={imgUrl} alt={name} />
                </div>
                <div className="p-1">
                    <h4 className="text-primary-foreground font-semibold py-1">{name}</h4>
                    <p className="text-foreground text-xs ">{author}</p>
                </div>
            </Card>
        </>
    )
}
