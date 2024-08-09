import Link from "next/link";
import { Button } from "./ui/button";

export default function StartButton() {
    return (
        <Link href="/players">
            <Button>Start</Button>
        </Link>
    )
}
