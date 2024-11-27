import ContainerLayout from "../components/ContainerLayout"
import { Toaster } from "@/components/ui/sonner"

export default function Layout({children}){
    return(
        <>
            <ContainerLayout>
            {children}
            <Toaster  richColors/>
            </ContainerLayout>
        </>
    )
}