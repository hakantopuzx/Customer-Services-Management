import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Home() {

    const token = headers().get("Cookie")?.split("=")[1];

    let verifyToken;
    let isAdmin;
    if (token) {
        verifyToken = jwt.verify(token, process.env.SECRET_KEY as string);
        isAdmin = (jwt.verify(token ?? "", process.env.SECRET_KEY as string) as any).isAdmin;
    } else {
        redirect("/login")
    }

    return (
        <main className="grid min-h-full w-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center flex justify-center flex-col items-center">
                <Image src={require("../icons/cms.png").default} alt="CMS" width={64} height={64} />
                <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-5xl">Welcome to customized CMS</h1>
                <p className="mt-2 text-base leading-7 text-white">You can see the contents from the menu on the left.</p>
            </div>
        </main>
    );
}
