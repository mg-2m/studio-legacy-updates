
"use client"

import * as React from "react"
import { PanelLeftClose, PanelRightClose } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type PreviewSidebarContext = {
    state: "expanded" | "collapsed"
    toggle: () => void
}

const PreviewSidebarContext = React.createContext<PreviewSidebarContext | null>(null)

export function usePreviewSidebar() {
    const context = React.useContext(PreviewSidebarContext)
    if (!context) {
        throw new Error("usePreviewSidebar must be used within a PreviewSidebarProvider")
    }
    return context
}

export function PreviewSidebarProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = React.useState<"expanded" | "collapsed">("expanded")

    const toggle = () => {
        setState(state === "expanded" ? "collapsed" : "expanded")
    }

    const contextValue = React.useMemo(() => ({ state, toggle }), [state])

    return (
        <PreviewSidebarContext.Provider value={contextValue}>
            {children}
        </PreviewSidebarContext.Provider>
    )
}

export const PreviewSidebar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { state } = usePreviewSidebar()

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-300 ease-in-out h-full",
                state === 'expanded' ? "w-[30%] min-w-[300px]" : "w-0 min-w-0 border-none",
                "overflow-hidden bg-background border-l",
                className
            )}
            {...props}
        />
    )
})
PreviewSidebar.displayName = "PreviewSidebar"

export const PreviewSidebarTrigger = React.forwardRef<
    React.ElementRef<typeof Button>,
    React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
    const { state, toggle } = usePreviewSidebar()

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", className)}
            onClick={toggle}
            {...props}
        >
            {state === "expanded" ? <PanelRightClose /> : <PanelLeftClose />}
            <span className="sr-only">Toggle Preview Sidebar</span>
        </Button>
    )
})
PreviewSidebarTrigger.displayName = "PreviewSidebarTrigger"
