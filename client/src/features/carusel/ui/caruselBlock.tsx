import React from 'react'
import { useEffect, useState } from 'react'

import { MusicInfo } from '@/entities/music/types/Music'
import { Carousel, CarouselContent } from '@/shared/ui/carousel'
import { Spinner } from '@/shared/ui/spinner'

import { CaruselMedia } from './caruselMedia'
import { CaruselMusic } from './caruselMusic'
import { CaruselSinger } from './caruselSinger'

interface SlidesInfo {
    id: string
    name: string
    author: string
    imgUrl: string
    audioId?: string
}

interface SlidesInfoProps {
    slidesInfo: SlidesInfo[] | MusicInfo[]
    typeCarousel: 'genre' | 'singer' | 'music'
    nameSection: string
}

export const CarouselBlock: React.FC<SlidesInfoProps> = ({
    slidesInfo,
    typeCarousel,
    nameSection,
}) => {
    const isMusic = typeCarousel === 'music'
    const isSinger = typeCarousel === 'singer'
    const isGenre = typeCarousel === 'genre'

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(!slidesInfo || slidesInfo.length === 0)
    }, [slidesInfo])

    return (
        <>
            <div className="container">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex justify-between mb-3">
                            <h3 className="text-primary-foreground text-xl font-semibold">
                                {nameSection}
                            </h3>
                            <a href="#">See all</a>
                        </div>
                        <Carousel className="w-full">
                            <CarouselContent className="ml-1 flex gap-3">
                                {Array.isArray(slidesInfo) && (
                                    <>
                                        {isMusic &&
                                            slidesInfo.map((item) => (
                                                <div key={item.id}>
                                                    <CaruselMusic
                                                        id={item.id}
                                                        typeCarousel={typeCarousel}
                                                        imgUrl={item.imgUrl}
                                                        name={item.name}
                                                        author={item.author}
                                                        audioId={item.audioId}
                                                    />
                                                </div>
                                            ))}
                                        {isSinger &&
                                            slidesInfo.map((item) => (
                                                <div key={item.id}>
                                                    <CaruselSinger
                                                        id={item.id}
                                                        typeCarousel={typeCarousel}
                                                        imgUrl={item.imgUrl}
                                                        name={item.name}
                                                    />
                                                </div>
                                            ))}
                                        {isGenre &&
                                            slidesInfo.map((item) => (
                                                <div key={item.id}>
                                                    <CaruselMedia
                                                        id={item.id}
                                                        typeCarousel={typeCarousel}
                                                        imgUrl={item.imgUrl}
                                                        title={item.name}
                                                        desc={item.author}
                                                    />
                                                </div>
                                            ))}
                                    </>
                                )}
                            </CarouselContent>
                        </Carousel>
                    </>
                )}
            </div>
        </>
    )
}
