import { Heart, Home, ListMusic, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/shared/ui/button'

export const Menu = () => {
    const MenuList = [
        { id: 1, title: 'Discover', img: <Home size={16} />, link: '/' },
        { id: 2, title: 'Liked', img: <Heart size={16} />, link: '/liked' },
        { id: 3, title: 'PlayList', img: <ListMusic size={16} />, link: '/playlist' },
        { id: 4, title: 'Settings', img: <Settings size={16} />, link: '/settings' },
    ]

    return (
        <div className="bg-card max-h-17 flex justify-center">
            <div className="container max-w-96">
                <ul className="grid grid-cols-4">
                    {MenuList.map((item) => (
                        <li key={item.id}>
                            <Button asChild>
                                <Link
                                    to={item.link}
                                    className="flex items-center flex-col gap-y-1 w-full"
                                >
                                    {item.img}
                                    <p className="text-xs leading-32">{item.title}</p>
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
