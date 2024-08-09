"use client"

import H1 from "@/components/H1";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [movies, setMovies] = useState<string[]>([])

    useEffect(() => {
        const movies = localStorage.getItem('movies')

        if (movies === null) {
            notFound()
        }

        setMovies(JSON.parse(movies))
    }, [])

    return (
        <>
            <H1>Marcels turn</H1>
            <p className="text-muted-foreground">Drag the movies to match your rating</p>
            {movies.map((movie: string, index: number) => (
                <div key={index}>{movie}</div>
            ))
            }
        </>
    )
}
