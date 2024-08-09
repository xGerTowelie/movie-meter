'use client'

import H1 from "@/components/H1"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, PlusIcon, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function Page() {
    const [players, setPlayers] = useState<string[]>([""])
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const router = useRouter()

    useEffect(() => {
        if (players.length > 1) {
            inputRefs.current[players.length - 1]?.focus()
        }
    }, [players])

    function addPlayer(e: any) {
        console.log("add player")
        e.preventDefault()
        setPlayers(prev => [...prev, ""])
    }

    function removePlayer(e: React.MouseEvent<HTMLButtonElement>, index: number) {
        console.log("remove player")
        e.preventDefault()
        setPlayers(prev => prev.filter((_, i) => i !== index))
    }

    function changePlayer(name: string, index: number) {
        setPlayers(prev => {
            const updatedPlayers = [...prev]
            updatedPlayers[index] = name
            return updatedPlayers
        })
    }

    function savePlayers() {
        localStorage.setItem('players', JSON.stringify(players))
        router.push('/movies')
    }

    return (
        <form onSubmit={addPlayer} className="flex flex-col gap-3 w-full">
            <H1>{`Enter all players (${players.length})`}</H1>
            {players.map((player: string, index: number) => (
                <div key={index} className="flex flex-row gap-3">
                    <Input
                        type="text"
                        value={player}
                        ref={(el: any) => inputRefs.current[index] = el}
                        onChange={(e) => changePlayer(e.target.value, index)}
                        placeholder="New player"
                    />
                    <Button type="button" className="p-2 bg-transparent text-red-500" onClick={(e) => removePlayer(e, index)}><X /></Button>
                </div>
            ))}
            <Button variant="outline" className="w-full mt-5 space-x-2" onClick={addPlayer}>
                <span>Add Player</span><PlusIcon />
            </Button>
            <Button className="w-full space-x-2" onClick={savePlayers}>
                <span>Add Movies</span><ArrowRight />
            </Button>
        </form >
    )
}

