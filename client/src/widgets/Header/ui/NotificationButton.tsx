import { Bell } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

export const NotificationButton = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="transparent" className="p-2.5 text-primary-foreground">
                    <Bell size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" align="end">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        <ul className="grid grid-cols-1 divide-y">
                            <li className="py-2">
                                <h3>Bugs</h3>
                                <p className="text-sm text-muted-foreground">
                                    Set the dimensions for the layer.
                                </p>
                            </li>
                            <li className="py-2">
                                <h3>Features</h3>
                                <p className="text-sm text-muted-foreground">
                                    Set the dimensions for the layer.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
