import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function EmptyChart({ type }: { type: string }) {
    return (
        <Card className="flex flex-col w-1/3 p-4">
            <CardHeader className="items-center pb-0">

                <CardTitle>No {type} Data</CardTitle>

                <CardDescription>Add some trades to get started</CardDescription>
            </CardHeader>
        </Card>
    )
}