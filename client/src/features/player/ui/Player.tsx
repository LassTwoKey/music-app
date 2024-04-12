import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/providers/StoreProvider'
import { convertSecondsToTime } from '@/shared/lib/player'
import { cn } from '@/shared/lib/utils'
import { Card } from '@/shared/ui/card'
import { Slider } from '@/shared/ui/slider'

export const Player = () => {
    const { audioUrl } = useSelector((state: RootState) => state.playerSlice)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [timeInterval, setTimeInterval] = useState<string | number | NodeJS.Timeout | undefined>()
    const [currentTime, setCurrentTime] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)
    const durationMusic = audioRef.current?.duration ?? 0

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl
        }
    }, [audioUrl])

    useEffect(() => {
        console.log(durationMusic, currentTime)
        if (currentTime >= durationMusic) {
            clearInterval(timeInterval)
            setCurrentTime(0)
            setIsPlaying(false)
        }
    }, [currentTime])

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause()
            clearInterval(timeInterval)
        } else {
            audioRef.current?.play()
            setTimeInterval(
                setInterval(() => {
                    setCurrentTime((currentTime) => currentTime + 1)
                }, 1000),
            )
        }
        setIsPlaying(!isPlaying)
    }

    const mutedMusic = () => {
        if (!audioRef.current) {
            return
        }
        if (isMuted) {
            audioRef.current.muted = false
        } else {
            audioRef.current.muted = true
        }
        setIsMuted(!isMuted)
    }

    const handleTimeChange = (time: number[]) => {
        setCurrentTime(time[0])
        if (audioRef.current) {
            audioRef.current.currentTime = time[0]
        }
    }

    return (
        <div className="container mb-6 max-h-20">
            <Card className="px-2">
                <audio ref={audioRef} className="w-full">
                    {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
                </audio>
                <div className="flex justify-between items-center px-2 py-2 gap-2">
                    <div className="flex items-center">
                        <div className="w-20 overflow-hidden rounded-lg">
                            <img
                                className="w-full h-auto"
                                src="https://www.desktopbackground.org/p/2012/06/08/402482_photography-wallpapers-712563_1680x1050_h.jpg"
                                alt="Album Cover"
                            />
                        </div>
                        <div className="text ml-3 flex items-center flex-col justify-center gap-2">
                            <h3 className="text-sm text-primary-foreground font-medium">
                                Hidup seperti ini
                            </h3>
                            <p className="text-xs mr-8">James Adam</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {isPlaying ? (
                            <Pause size={20} onClick={togglePlay} />
                        ) : (
                            <Play size={20} onClick={togglePlay} />
                        )}
                        {isMuted ? (
                            <VolumeX size={20} onClick={mutedMusic} />
                        ) : (
                            <Volume2 size={20} onClick={mutedMusic} />
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Slider
                        defaultValue={[0]}
                        value={[currentTime]}
                        onValueChange={handleTimeChange}
                        max={durationMusic}
                        step={1}
                        className={cn('w-[100%] py-2')}
                    />
                    <div className="flex items-center gap-1">
                        <span>{convertSecondsToTime(currentTime)}</span> /{' '}
                        <span>{convertSecondsToTime(+durationMusic.toFixed(0))}</span>
                    </div>
                </div>
            </Card>
        </div>
    )
}
