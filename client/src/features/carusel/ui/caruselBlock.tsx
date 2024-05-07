import React from 'react'
import { Carousel, CarouselContent } from '@/shared/ui/carousel'

import { CaruselMusic } from './caruselMusic'
import { CaruselSinger } from './caruselSinger'
import { CaruselMedia } from './caruselMedia'

interface SlidesInfo {
    id: string
    name: string
    author: string
    imgUrl: string
    audioId: string
}

interface SlidesInfoProps {
    slidesInfo: SlidesInfo[]
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
                <h3 className="text-primary-foreground font-semibold">{nameSection}</h3>
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
                        slidesInfo.map((item)=>(
                            <CaruselMedia
                            id={item.id}
                            typeCarousel={typeCarousel}
                            imgUrl={item.imgUrl}
                            title={item.name}
                            desc={item.author}
                        />
                        ))
                       }
                </CarouselContent>
            </Carousel>
        </div>
    )
}
