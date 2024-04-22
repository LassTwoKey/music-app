import { Outlet } from 'react-router-dom'

import { AppPlayer } from '@/features/appPlayer'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header/ui/Header'

export const Root = () => {
    return (
        <>
            <Header />
            <main className="flex flex-col justify-between">
                <div>
                    <Outlet />
                </div>
                <AppPlayer />
            </main>
            <Footer />
        </>
    )
}
