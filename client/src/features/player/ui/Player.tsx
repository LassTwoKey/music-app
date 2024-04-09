import { Pause, Volume2 } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Card } from '@/shared/ui/card'
import { Slider } from '@/shared/ui/slider'

export const Player = () => {
    return (
        <div className="container mb-6 max-h-20">
            <Card className="px-2">
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
                        <Pause size={20} />
                        <Volume2 size={20} />
                    </div>
                </div>
                <div className="slider">
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className={cn('w-[100%] py-2')}
                    />
                </div>
            </Card>
        </div>
    )
}
