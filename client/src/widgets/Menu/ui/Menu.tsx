import { Link } from 'react-router-dom'
import { Home, Heart, ListMusic, Settings } from 'lucide-react';


export const Menu = () => {
    const MenuInfo = [
        { id: 1, title: 'Discover', img: <Home size={16} />, link: '/' },
        { id: 2, title: 'Liked', img: <Heart size={16} />, link: '/liked' },
        { id: 3, title: 'PlayList', img: <ListMusic size={16} />, link: '/playlist' },
        { id: 4, title: 'Settings', img: <Settings size={16} />, link: '/settings' }

    ]
    return (
        <div className='bg-white max-h-17 flex justify-center'>
            <div className='max-w-84 px-5'>
                <ul className='grid grid-cols-4 gap-x-5 '>
                    {
                        MenuInfo.map(item => (
                            <Link to={item.link}>
                                <li className='flex items-center flex-col gap-y-1 px-4 py-2 hover:bg-sky-400 rounded-md' key={item.id}>
                                    {item.img}
                                    <p className='text-xs leading-32'>{item.title}</p>
                                </li>
                      </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
