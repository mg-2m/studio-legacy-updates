
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftClose, PanelRightClose } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type EditorSidebarContext = {
  state: "expanded" | "collapsed"
  toggle: () => void
}

const EditorSidebarContext = React.createContext<EditorSidebarContext | null>(null)

export function useEditorSidebar() {
  const context = React.useContext(EditorSidebarContext)
  if (!context) {
    throw new Error("useEditorSidebar must be used within an EditorSidebarProvider")
  }
  return context
}

export function EditorSidebarProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<"expanded" | "collapsed">("expanded")

  const toggle = () => {
    setState(state === "expanded" ? "collapsed" : "expanded")
  }

  const contextValue = React.useMemo(() => ({ state, toggle }), [state])

  return (
    <EditorSidebarContext.Provider value={contextValue}>
      {children}
    </EditorSidebarContext.Provider>
  )
}

export const EditorSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = useEditorSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-300 ease-in-out h-full",
        state === 'expanded' ? "w-[45%] min-w-[450px]" : "w-0 min-w-0",
        "overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
EditorSidebar.displayName = "EditorSidebar"

export const EditorSidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1", className)} {...props} />
})
EditorSidebarInset.displayName = "EditorSidebarInset"


export const EditorSidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { state, toggle } = useEditorSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={toggle}
      {...props}
    >
      {state === "expanded" ? <PanelLeftClose /> : <PanelRightClose />}
      <span className="sr-only">Toggle Editor Sidebar</span>
    </Button>
  )
})
EditorSidebarTrigger.displayName = "EditorSidebarTrigger"

