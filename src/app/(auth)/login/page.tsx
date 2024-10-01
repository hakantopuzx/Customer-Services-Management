import { headers } from 'next/headers';
import React from 'react'
import jwt from "jsonwebtoken"
import { redirect } from 'next/navigation';
import LoginComp from '@/component/Login';

const Login = () => {

    const token = headers().get("Cookie")?.split("=")[1];

    let verifyToken;
    if (token) {
        verifyToken = jwt.verify(token, process.env.SECRET_KEY as string);
        if (verifyToken) {
            redirect("/");
        }
    }
    return (
        <LoginComp />
    )
}

export default Login