import { Moon, SunMoon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/shared/ui/button'

export const ThemeButton = () => {
    const isDarkCondition =
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

    const [isDark, setIsDark] = useState(isDarkCondition)

    const onDarkHandler = () => {
        localStorage.theme = 'dark'
        setIsDark(true)
    }
    const onLightHandler = () => {
        localStorage.theme = 'light'
        setIsDark(false)
    }

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    const clickHandler = () => {
        if (isDark) {
            onLightHandler()
        } else {
            onDarkHandler()
        }
    }

    return (
        <Button
            variant="transparent"
            onClick={clickHandler}
            className="p-2.5 text-primary-foreground"
        >
            {!isDark && <SunMoon size={20} />}
            {isDark && <Moon size={20} />}
        </Button>
    )
}
