import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Avatar, AvatarImage } from '@/shared/ui/avatar'
import { Card } from '@/shared/ui/card'

interface CaruselSingerProps {
    id: string
    name: string
    imgUrl: string
    typeCarousel: string
}

export const CaruselSinger: FC<CaruselSingerProps> = ({ id, name, imgUrl, typeCarousel }) => {
    return (
        <Link key={id} to={`${typeCarousel}/${id}`}>
            <Card className="p-1.5 relative flex flex-col justify-center items-center w-32 h-32 text-center overflow-hidden mx-1">
                <Avatar className="inline-flex justify-center -translate-y-4 items-center my-2">
                    <AvatarImage src={imgUrl} alt={name} />
                </Avatar>
                <div className="p-1 absolute h-full w-full top-16">
                    <h4 className="text-primary-foreground  font-semibold py-1">{name}</h4>
                </div>
            </Card>
        </Link>
    )
}
