"use client"
import EggProductTable from "../EggProductTable"
import { Card, CardContent, CardHeader, CardTitle,CardDescription,CardFooter} from "@/components/ui/card"

const PoultryInventory=()=>{
    return (
        <Card className='px-3'>
        <EggProductTable/>
        </Card>
    )
}

export default PoultryInventory