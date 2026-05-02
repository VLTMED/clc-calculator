import * as React from "react"
import { cn } from "@/lib/utils"

interface NumericInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "type"> {
  value: number
  onChange: (value: number) => void
  fallback?: number
}

function NumericInput({ value, onChange, fallback = 0, className, onBlur, onFocus, ...props }: NumericInputProps) {
  const [localVal, setLocalVal] = React.useState<string>(value === 0 ? "0" : String(value))
  const isFocused = React.useRef(false)

  React.useEffect(() => {
    if (!isFocused.current) {
      setLocalVal(value === 0 ? "0" : String(value))
    }
  }, [value])

  return (
    <input
      type="number"
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1",
        "text-base shadow-xs transition-[color,box-shadow] outline-none text-right",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      value={localVal}
      onFocus={e => {
        isFocused.current = true
        onFocus?.(e)
      }}
      onChange={e => {
        const raw = e.target.value
        setLocalVal(raw)
        const n = parseFloat(raw)
        if (!isNaN(n)) onChange(n)
      }}
      onBlur={e => {
        isFocused.current = false
        const n = parseFloat(e.target.value)
        if (isNaN(n) || e.target.value.trim() === "") {
          onChange(fallback)
          setLocalVal(String(fallback))
        } else {
          onChange(n)
          setLocalVal(String(n))
        }
        onBlur?.(e)
      }}
      {...props}
    />
  )
}

export { NumericInput }
