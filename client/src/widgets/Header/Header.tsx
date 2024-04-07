import { Bell, CircleUserRound } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export const Header = () => {
    const HeaderDropDownLists = [
        { id: 1, title: 'Notifications', trigger: <Bell size={20} /> },
        { id: 2, title: 'Profile', trigger: <CircleUserRound size={20} /> },
    ]

    return (
        <header className="bg-white max-h-16">
            <div className="max-w-md px-5 m-auto py-6 flex justify-between">
                <div>
                    <h3>Goor Morning User</h3>
                </div>
                <div className="flex gap-5 items-center">
                    {HeaderDropDownLists.map((item) => (
                        <DropdownMenu key={item.id}>
                            <DropdownMenuTrigger>{item.trigger}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuRadioGroup>
                                    <DropdownMenuRadioItem value={item.title}>
                                        {item.title}
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                </div>
            </div>
        </header>
    )
}
