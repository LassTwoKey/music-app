import { Volume2, VolumeX } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Slider } from '@/shared/ui/slider'

interface VolumeButtonProps {
    volume: number
    mutedMusic: () => void
    handleVolumeChange: (volume: number[]) => void
}

export const VolumeButton: FC<VolumeButtonProps> = ({ volume, mutedMusic, handleVolumeChange }) => {
    return (
        <>
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="px-2" variant="transparent">
                            <Volume2 size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-[100vw] -translate-y-2 md:w-[150px] py-0 pl-1 pr-2 flex gap-1 items-center"
                        side="top"
                        align="end"
                    >
                        {volume === 0 ? (
                            <Button className="p-1" onClick={mutedMusic} variant="transparent">
                                <VolumeX size={22} />
                            </Button>
                        ) : (
                            <Button className="p-1" onClick={mutedMusic} variant="transparent">
                                <Volume2 size={22} onClick={mutedMusic} />
                            </Button>
                        )}
                        <div className="relative w-full">
                            <Slider
                                defaultValue={[1]}
                                max={1}
                                value={[volume]}
                                min={0}
                                step={0.1}
                                onValueChange={handleVolumeChange}
                                className={cn('w-[100%] py-2')}
                            />
                            <Card
                                className="absolute flex -top-5 items-center justify-center shadow-xl px-1 text-xs"
                                style={{
                                    left:
                                        volume === 1
                                            ? `calc(${volume * 100}% - 0.45rem - 20px)`
                                            : `calc(${volume * 100}% - 0.35rem - 4px)`,
                                }}
                            >
                                <p>{Math.round(volume * 100)}%</p>
                            </Card>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}
