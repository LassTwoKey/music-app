import React from 'react'
import { Link } from 'react-router-dom'

import { Avatar, AvatarImage } from '@/shared/ui/avatar'
import { Card, CardContent } from '@/shared/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/shared/ui/carousel'

interface SlidesInfo {
    id: number
    title: string
    desc?: string
    imgUrl: string
}

interface SlidesInfoProps {
    slidesInfo: SlidesInfo[]
    typeCarousel: string,
    nameSection:string,
}

export const CarouselBlock: React.FC<SlidesInfoProps> = ({ slidesInfo, typeCarousel,nameSection}) => {
    return (
        <div className="container">
            <div className="flex justify-between mb-3">
                <h3 className="text-primary-foreground font-semibold">{nameSection}</h3>
                <a href="#">See all</a>
            </div>
            <Carousel className="w-full md:hidden">
                <CarouselContent className="w-52">
                    {typeCarousel === 'media'
                        ? slidesInfo.map((item) => (
                              <CarouselItem key={item.id}>
                                  <Link to={`${typeCarousel}/${item.id}`}>
                                      <Card className="p-1.5">
                                          <div className="relative h-24 w-full object-cover rounded-lg overflow-hidden">
                                              <img
                                                  className="absolute h-full w-full"
                                                  src={item.imgUrl}
                                                  alt={item.title}
                                              />
                                          </div>
                                          <div className="p-1">
                                              <h4 className="text-primary-foreground font-semibold py-1">
                                                  {item.title}
                                              </h4>
                                              <p className="text-foreground text-xs ">
                                                  {item.desc}
                                              </p>
                                          </div>
                                      </Card>
                                  </Link>
                              </CarouselItem>
                          ))
                        : slidesInfo.map((item) => (
                              <Link key={item.id} to={`${typeCarousel}/${item.id}`}>
                                  <Card className="p-1.5 w-28 text-center mx-1">
                                      <Avatar className="inline-flex justify-center items-center my-2">
                                          <AvatarImage src={item.imgUrl} alt={item.title} />
                                      </Avatar>
                                      <div className="p-1">
                                          <h4 className="text-primary-foreground font-semibold py-1">
                                              {item.title}
                                          </h4>
                                          <p className="text-foreground text text-xs">
                                              {item.desc}
                                          </p>
                                      </div>
                                  </Card>
                              </Link>
                          ))}
                </CarouselContent>
            </Carousel>
            <div className="gap-5 hidden md:flex">
                {typeCarousel === 'media'
                    ? slidesInfo.map((item) => (
                          <Link key={item.id} to={`${typeCarousel}/${item.id}`}>
                              <Card className="p-1.5 w-52">
                                  <div className="relative h-24 w-full object-cover rounded-lg overflow-hidden">
                                      <img
                                          className="absolute h-full w-full"
                                          src={item.imgUrl}
                                          alt={item.title}
                                      />
                                  </div>
                                  <div className="p-1">
                                      <h4 className="text-primary-foreground font-semibold py-1">
                                          {item.title}
                                      </h4>
                                      <p className="text-foreground text-xs ">{item.desc}</p>
                                  </div>
                              </Card>
                          </Link>
                      ))
                    : slidesInfo.map((item) => (
                          <Link key={item.id} to={`${typeCarousel}/${item.id}`}>
                              <Card className="p-1.5 w-52 text-center">
                                  <Avatar className='inline-flex justify-center items-center my-2'>
                                      <AvatarImage src={item.imgUrl} alt={item.title} />
                                  </Avatar>
                                  <div className="p-1">
                                      <h4 className="text-primary-foreground font-medium py-1">
                                          {item.title}
                                      </h4>
                                      <p className="text-foreground text-xs ">{item.desc}</p>
                                  </div>
                              </Card>
                          </Link>
                      ))}
            </div>
        </div>
    )
}
