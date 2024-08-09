'use client'

import H1 from "@/components/H1"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, PlusIcon, ArrowRight } from "lucide-react"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function Page() {
    const [movies, setMovies] = useState<string[]>([""])
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const router = useRouter()

    useEffect(() => {
        if (movies.length > 1) {
            inputRefs.current[movies.length - 1]?.focus() // Focus on the last added input
        }
    }, [movies])

    useEffect(() => {
        if (localStorage.getItem("players") === null) {
            notFound()
        }
    }, [])

    function addMovies(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setMovies(prev => [...prev, ""])
    }

    function removeMovies(e: React.MouseEvent<HTMLButtonElement>, index: number) {
        e.preventDefault()
        setMovies(prev => prev.filter((_, i) => i !== index))
    }

    function changeMovies(name: string, index: number) {
        setMovies(prev => {
            const updatedMovies = [...prev]
            updatedMovies[index] = name
            return updatedMovies
        })
    }

    function saveMovies() {
        localStorage.setItem('movies', JSON.stringify(movies))
        router.push('/rating')
    }

    return (
        <form onSubmit={addMovies} className="flex flex-col gap-3 w-full">
            <H1>{`Enter all movies (${movies.length})`}</H1>
            {movies.map((player: string, index: number) => (
                <div key={index} className="flex flex-row gap-3">
                    <Input
                        type="text"
                        value={player}
                        ref={el => inputRefs.current[index] = el}
                        onChange={(e) => changeMovies(e.target.value, index)}
                        placeholder="New movie"
                    />
                    <Button type="button" className="p-2" onClick={(e) => removeMovies(e, index)}><X /></Button>
                </div>
            ))}
            <Button variant="outline" className="w-full mt-5 space-x-2" onClick={(e) => addMovies(e)}>
                <span>Add Movie</span><PlusIcon />
            </Button>
            <Button className="w-full space-x-2" onClick={saveMovies}>
                <span>Start Rating</span><ArrowRight />
            </Button>
        </form >
    )
}

