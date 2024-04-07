import { RouterProvider } from './providers/RouterProvider'
import { StoreProvider } from './providers/StoreProvider'

export const App = () => {
    return (
        <StoreProvider>
            <RouterProvider />
        </StoreProvider>
    )
}
