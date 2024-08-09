"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { RotateCcw } from "lucide-react"


export default function RestartButton() {
    const router = useRouter()

    function restart() {
        localStorage.removeItem('players')
        localStorage.removeItem('movies')
        localStorage.removeItem('ratings')
        router.push('/')
    }

    return <Button className="space-x-3 border-[1px] border-slate-600" onClick={restart}><span>Restart</span><RotateCcw /></Button>
}
