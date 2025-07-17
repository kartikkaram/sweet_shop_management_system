import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import { useRef, useState } from "react"


export function DialogBox({
    label,
    label2,
    sweet,
    description,
    color,
    handleSubmit,
    defaultValue,
    Icon,
}) {
    const [input, setInput]=useState(defaultValue)
    const closRef=useRef(null)
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className={color}><div  className="flex justify-between  items-center gap-2"><Icon/>{label}</div></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit(input)
        closRef.current.click()
        setInput(defaultValue)
        }}>
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              {sweet.name}
               <Label htmlFor="name-1">Total</Label>
              ₹ {sweet.price*input} 
            </div>
            <div className="grid gap-3">
            <Input
             type="number"
             onChange={(e) => setInput(e.target.value)}
             name={label}
             value={input}
/>

            </div>
          </div>
          <div className="m-3 ">

          <DialogFooter>
            <DialogClose asChild ref={closRef}>
              <Button variant="destructive">Cancel</Button>
            </DialogClose >
            <Button type="submit" className="bg-green-700 hover:bg-green-500">{label2}</Button>
          </DialogFooter>
          </div>
      </form>
        </DialogContent>
    </Dialog>
  )
}
