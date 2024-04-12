import { useDispatch } from 'react-redux'
import { onGetAudioUrl } from '@/app/providers/StoreProvider/config/playerSlice'
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    CircleUserRound,
    Info,
    LogIn,
    LogOut,
} from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export const UserButton = () => {
    const dispatch = useDispatch()
    
    //@ts-ignore
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();

        reader.onload = function(){
            let data = reader.result
            dispatch(onGetAudioUrl(data))
        }
        reader.readAsDataURL(file)
        
    }

    const userList = [
        { id: 1, title: 'Profile', img: <CircleUserRound size={20} /> },
        { id: 2, title: 'Sign in', img: <LogIn size={20} /> },
        { id: 3, title: 'Sign out', img: <LogOut size={20} /> },
        { id: 4, title: 'Upload Music', img: <ArrowUpFromLine size={20} /> },
        { id: 5, title: 'Download Music', img: <ArrowDownToLine size={20} /> },
        { id: 6, title: 'About', img: <Info size={20} /> },
    ]

    return (
        <>
            <input type="file" onChange={(e) => handleFileChange(e)} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="transparent" className="p-2.5 text-primary-foreground">
                        <CircleUserRound size={20} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userList.map((item) => (
                        <DropdownMenuItem className="flex gap-2" key={item.id}>
                            {item.img}
                            <span className="">{item.title}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
