import ContainerLayout from "../components/ContainerLayout"
import { Toaster } from "@/components/ui/sonner"
import { useAuth } from "../auth/auth-context"

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