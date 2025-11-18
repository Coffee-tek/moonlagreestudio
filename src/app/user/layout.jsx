
import { Toaster } from "sonner";
import PhotoProfil from "../../components/profile/PhotoProfil";


export default async function UserLayout({ children }) {

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#eee2d4" }}>

            {/* Header avec cover */}
            <div
                className="h-64 bg-gradient-to-r from-purple-600 to-blue-600 relative"
                style={{
                    backgroundImage: `url(/img/new/9.jpeg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>

                <div className="overlay position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}></div>

            </div>

            {/* Contenu principal */}
            <div className="pb-5">
                <div className="container">
                    {children}
                    <Toaster position="top-center" richColors />

                </div>
            </div>
        </div>
    );
}

