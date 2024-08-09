'use client'

import H1 from "@/components/H1";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Page() {
    const [result, setResult] = useState<{ [key: string]: number }>([])

    useEffect(() => {
        const ratings = JSON.parse(localStorage.getItem('ratings') as string)
        const players = JSON.parse(localStorage.getItem('players') as string)
        const result: any = {}

        for (const player of players) {
            const playerRating = ratings[player]

            for (let i = playerRating.length - 1; i >= 0; i--) {
                if (result[playerRating[i]] === undefined) {
                    result[playerRating[i]] = i + 1
                } else {
                    result[playerRating[i]] += i + 1
                }
            }
        }

        setResult(result)
    }, [])

    return (
        <>
            <H1>Result</H1>
            {
                Object.keys(result).map((movie, index) => (
                    <Card key={index} className="p-3 mb-4 flex flex-row gap-2 items-center w-full">
                        <h1>{`#${index + 1}: ${movie}`}</h1>
                        <span className="flex-grow"></span>
                        <span className="text-muted-foreground">{result[movie]} Points</span>
                    </Card>
                )
                )
            }
        </>
    )
}
