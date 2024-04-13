import { Outlet } from 'react-router-dom'

import { Player } from '@/features/player'
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
                <Player />
            </main>
            <Footer />
        </>
    )
}
