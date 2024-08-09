import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <H1>Oooopsi...</H1>
            <H2>Something went wrong, and the browser swallowed your players. Please start over by adding the players...</H2>
            <Link href="/players">
                <Button>Add Players</Button>
            </Link>
        </>
    )
}
