import { FC } from 'react'

import { convertSecondsToTime } from '@/shared/lib/player'
import { cn } from '@/shared/lib/utils'
import { Slider } from '@/shared/ui/slider'

interface ProgressBarProps {
    duration: number
    currentTime: number
    handleTimeChange: (value: number[]) => void
}

export const ProgressBar: FC<ProgressBarProps> = ({ duration, currentTime, handleTimeChange }) => {
    return (
        <>
            <div className="flex items-center gap-2">
                <Slider
                    defaultValue={[0]}
                    value={[currentTime]}
                    onValueChange={handleTimeChange}
                    max={duration}
                    step={1}
                    className={cn('w-[100%] py-2')}
                />
                <div className="relative flex items-center w-[70px] h-6 grow-0 shrink-0 text-sm">
                    <span className="absolute h-full left-0">
                        {convertSecondsToTime(currentTime)}
                    </span>
                    <span className="absolute h-full top-0 left-1/2 -translate-x-1/2">/</span>
                    <span className="absolute h-full top-0 right-0">
                        {convertSecondsToTime(+duration.toFixed(0))}
                    </span>
                </div>
            </div>
        </>
    )
}
