import { ThemeButton } from '@/features/themeButton'

import { NotificationButton } from './NotificationButton'
import { UserButton } from './UserButton'

export const Header = () => {
    return (
        <header className="bg-card max-h-16">
            <div className="container flex items-center justify-between">
                <div>
                    <h3 className="text-primary-foreground font-medium">Good Morning User</h3>
                </div>
                <div className="flex items-center">
                    <ThemeButton />
                    <NotificationButton />
                    <UserButton />
                </div>
            </div>
        </header>
    )
}
