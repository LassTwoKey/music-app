import { Link } from 'react-router-dom'
import { Card } from '@/shared/ui/card'
import { FC } from 'react'

interface CaruselMediaProps{
    id:string,
    typeCarousel:string,
    imgUrl:string,
    title:string,
    desc:string,
}

export const CaruselMedia:FC<CaruselMediaProps> = ({id,typeCarousel,imgUrl,title,desc}) => {
    return (
        <Link key = {id} to = {`${typeCarousel}/${id}`}>
        <Card   className="p-1.5 w-52 flex-shrink-0 h-44">
        <div className="relative h-24 w-full object-cover rounded-lg overflow-hidden">
            <img className="absolute h-full w-full" src={imgUrl} alt={title} />
        </div>
        <div className="p-1">
            <h4 className="text-primary-foreground font-semibold py-1">{title}</h4>
            <p className="text-foreground text-xs ">{desc}</p>
        </div>
    </Card>
    </Link>
    )
}