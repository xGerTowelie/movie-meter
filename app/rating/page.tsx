"use client"

import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reorder } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [movies, setMovies] = useState<string[]>([])
    const [player, setPlayer] = useState<string>("")
    const [lastPlayer, setLastPlayer] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('movies') as string)

        if (movies === null) {
            notFound()
        }

        setMovies(movies)

        const players = JSON.parse(localStorage.getItem('players') as string)
        const ratings = JSON.parse(localStorage.getItem('ratings') as string)

        if (ratings === null) {
            setPlayer(players[0])
            return
        }

        for (let i = 0; i < players.length; i++) {
            if (ratings[players[i]] === undefined) {
                setPlayer(players[i])
                if (i == (players.length - 1)) {
                    setLastPlayer(true)
                }
                break
            }
        }
    }, [])

    function saveRating() {
        let rating = JSON.parse(localStorage.getItem('ratings') as string)

        if (rating === null) {
            rating = {}
        }

        rating[player] = movies
        localStorage.setItem('ratings', JSON.stringify(rating))

        if (!lastPlayer) {
            window.location.reload()
        } else {
            router.push('/result')
        }
    }

    return (
        <>
            <H1>{`${player}'s turn`}</H1>
            <p className="text-muted-foreground">Drag the movies to match your rating</p>
            <Reorder.Group values={movies} onReorder={setMovies} className="w-full space-y-2 my-8">
                {movies.map((movie: string, index: number) => (
                    <Reorder.Item value={movie} key={movie} className="w-full">
                        <Card key={index} className="p-3 flex flex-row gap-2 items-center">
                            <h1>{movie}</h1>
                            <span className="flex-grow"></span>
                            <span className="text-muted-foreground">{movies.length - index} Points</span>
                        </Card>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <Button
                variant={lastPlayer ? 'default' : 'outline'}
                className="w-full space-x-3"
                onClick={saveRating}>
                {
                    !lastPlayer
                        ? (
                            <>
                                <ArrowRight />
                                <span>Next Player</span>
                            </>
                        )
                        : <span>View Result</span>
                }
            </Button >
        </>
    )
}
