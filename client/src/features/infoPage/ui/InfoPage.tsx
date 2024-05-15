import { FC, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { setAppPlayerInfo } from '@/app/providers/StoreProvider/config/appPlayerSlice'
import { AppDispatch} from '@/app/providers/StoreProvider/config/store'
import { Card } from '@/shared/ui/card'
import { Spinner } from '@/shared/ui/spinner'

export interface Music {
    id: string;
    name: string;
    author: string;
    audioId: string;
    imgUrl: string;
    genres: string[];
}

export interface Musician {
    id: string | null;
    name: string | null;
    imgUrl: string | null;
    music: Music[];
}

export const InfoPage:FC<{infoPageList:Musician}> = ({infoPageList}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!infoPageList.id) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    })

    async function handleMusicInfo(name: string, author: string, audioId: string, imgUrl: string) {
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
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="relative min-h-52 lg:min-h-96 w-full">
                        <img
                            className="absolute z-0 left-0 top-0 w-full h-full object-cover pointer-events-none select-none"
                            src={infoPageList.imgUrl?? ''}
                        />
                        <h3 className="text-5xl text-white z-1 absolute bottom-5 left-[125px]">
                            {infoPageList.name}
                        </h3>
                    </div>
                    <div className="container py-5">
                        <h3 className="text-2xl">Songs</h3>
                        <div className="flex py-2 flex-col gap-5">
                            {infoPageList &&
                                infoPageList?.music?.map((item) => (
                                    <>
                                        <Card
                                            onClick={() =>
                                                handleMusicInfo(
                                                    item.name,
                                                    item.author,
                                                    item.audioId,
                                                    item.imgUrl,
                                                )
                                            }
                                            key={item.id}
                                            className="py-2 px-2 "
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-16 overflow-hidden">
                                                    <img
                                                        className="w-full py-3 h-auto rounded-lg"
                                                        src={item.imgUrl}
                                                        alt="Song cover"
                                                    />
                                                </div>
                                                <div className="text-sm text-primary-foreground font-medium">
                                                    <h3>{item.name}</h3>
                                                    <p className="text-xs mr-8">{item.author}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
