import { createBrowserRouter } from 'react-router-dom'

import { FeedPage } from '@/pages/feed'
import { WelcomePage } from '@/pages/welcome'

const routes = [
    {
        path: '/',
        element: <WelcomePage />,
    },
    {
        path: '/feed',
        element: <FeedPage />,
    },
]

export const router = createBrowserRouter(routes)
