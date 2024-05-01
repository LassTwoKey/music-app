import { Pause, Play } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/shared/ui/button'

interface PlayButtonProps {
    isPlaying: boolean
    togglePlay: () => void
}

export const PlayButton: FC<PlayButtonProps> = ({ isPlaying, togglePlay }) => {
    return (
        <>
            {isPlaying ? (
                <Button className="px-2" onClick={togglePlay} variant="transparent">
                    <Pause size={20} />
                </Button>
            ) : (
                <Button className="px-2" onClick={togglePlay} variant="transparent">
                    <Play size={18} />
                </Button>
            )}
        </>
    )
}
