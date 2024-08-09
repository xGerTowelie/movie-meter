import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function StartButton() {
    return (
        <Link href="/players">
            <Button className="px-10 space-x-2">
                <span>Start</span>
                <ArrowRight />
            </Button>
        </Link>
    )
}
