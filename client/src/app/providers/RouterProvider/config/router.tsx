import { createBrowserRouter } from 'react-router-dom'

import { FeedPage } from '@/pages/feed'
import { LikedPage } from '@/pages/liked'
import { PlaylistPage } from '@/pages/playlist'
import { Root } from '@/pages/root'
import { SettingsPage } from '@/pages/settings'
import { WelcomePage } from '@/pages/welcome'

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/welcome',
                element: <WelcomePage />,
            },
            {
                path: '',
                element: <FeedPage />,
            },
            {
                path: 'liked',
                element: <LikedPage />,
            },
            {
                path: 'playlist',
                element: <PlaylistPage />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
        ],
    },
]

export const router = createBrowserRouter(routes)
