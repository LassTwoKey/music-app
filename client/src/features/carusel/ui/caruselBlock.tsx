import React from 'react'

import { MusicInfo } from '@/entities/music/types/Music'
import { Carousel, CarouselContent } from '@/shared/ui/carousel'

import { CaruselMedia } from './caruselMedia'
import { CaruselMusic } from './caruselMusic'
import { CaruselSinger } from './caruselSinger'

interface SlidesInfo {
    id: string
    name: string
    author: string
    imgUrl: string
    audioId: string
}

interface SlidesInfoProps {
    slidesInfo: SlidesInfo[] | MusicInfo[]
    typeCarousel: 'media' | 'singer' | 'music'
    nameSection: string
}

export const CarouselBlock: React.FC<SlidesInfoProps> = ({
    slidesInfo,
    typeCarousel,
    nameSection,
}) => {
    const isMusic = typeCarousel === 'music'
    const isSinger = typeCarousel === 'singer'
    const isMedia = typeCarousel === 'media'
    return (
        <div className="container">
            <div className="flex justify-between mb-3">
                <h3 className="text-primary-foreground  text-xl font-semibold">{nameSection}</h3>
                <a href="#">See all</a>
            </div>
            <Carousel className="w-full">
                <CarouselContent className="ml-1 flex gap-3">
                    {isMusic &&
                        slidesInfo.map((item) => (
                            <CaruselMusic
                                id={item.id}
                                typeCarousel={typeCarousel}
                                imgUrl={item.imgUrl}
                                name={item.name}
                                author={item.author}
                                audioId={item.audioId}
                            />
                        ))}
                    {isSinger &&
                        slidesInfo.map((item) => (
                            <CaruselSinger
                                id={item.id}
                                typeCarousel={typeCarousel}
                                imgUrl={item.imgUrl}
                                name={item.name}
                            />
                        ))}
                    {isMedia &&
                        slidesInfo.map((item) => (
                            <CaruselMedia
                                id={item.id}
                                typeCarousel={typeCarousel}
                                imgUrl={item.imgUrl}
                                title={item.name}
                                desc={item.author}
                            />
                        ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
