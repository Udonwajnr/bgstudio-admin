import ContainerLayout from "../components/ContainerLayout"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "../auth/auth-context"
export default function Layout({children}){
    return(
        <>
        <AuthProvider>
            <ContainerLayout>
            {children}
            <Toaster  richColors/>
            </ContainerLayout>
        </AuthProvider>
        </>
    )
}