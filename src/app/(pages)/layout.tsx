import ProtectedRoute from "@/lib/routeGuard";

const MainLayout=({children}: Readonly<{
    children: React.ReactNode;
  }>)=>{
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    )
}
export default MainLayout;