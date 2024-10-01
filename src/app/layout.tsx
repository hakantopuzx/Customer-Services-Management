import type { Metadata } from "next";
import "./global.scss";
import "./globals.css";
import { connectDb } from "@/lib/dbConnect";
import { Sidebar } from "@/component/Sidebar";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
    title: "CMS",
    description: "Customer Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const token = headers().get("Cookie")?.split("=")[1];

    let verifyToken;
    let isAdmin;
    if (token) {
        verifyToken = jwt.verify(token, process.env.SECRET_KEY as string);
        isAdmin = (jwt.verify(token ?? "", process.env.SECRET_KEY as string) as any).isAdmin;
    }

    connectDb();
    return (
        <html lang="en">
            <body
            >
                <div className="content">
                    {verifyToken &&
                        <Sidebar token={token ?? ""} isAdmin={isAdmin} />
                    }
                    {children}
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </body>
        </html>
    );
}
