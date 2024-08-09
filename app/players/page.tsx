'use client'

import H1 from "@/components/H1"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, PlusIcon, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
    const [players, setPlayers] = useState<string[]>([""])
    const router = useRouter()

    function addPlayer(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setPlayers(prev => [...prev, ""])
    }

    function removePlayer(e: React.MouseEvent<HTMLButtonElement>, index: number) {
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
        <form action={savePlayers} className="flex flex-col gap-3 w-full">
            <H1>{`Enter all players (${players.length})`}</H1>
            {players.map((player: string, index: number) => (
                <div key={index} className="flex flex-row gap-3">
                    <Input
                        type="text"
                        value={player}
                        onChange={(e) => changePlayer(e.target.value, index)}
                        placeholder="New player"
                    />
                    <Button className="p-2" onClick={(e) => removePlayer(e, index)}><X /></Button>
                </div>
            ))}
            <Button variant="outline" className="w-full mt-5 space-x-2" onClick={(e) => addPlayer(e)}>
                <span>Add Player</span><PlusIcon />
            </Button>
            <Button className="w-full space-x-2">
                <span>Add Movies</span><ArrowRight />
            </Button>
        </form >
    )
}

