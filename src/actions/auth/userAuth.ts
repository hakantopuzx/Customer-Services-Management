"use server";
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jsonwebtoken from 'jsonwebtoken';
import * as sgMail from '@sendgrid/mail';


export const userRegister = async (formData: FormData) => {

    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password") as string;

    try {
        if (email && password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const create = await User.create({ email, password: hash, name });
            const err = create.validateSync();
            if (err) {
                console.log("Validation error", err);
            }
            await create.save();


        }
    } catch (error) {
        console.log("Error creating User:", error);
    }

    redirect("/login");
};

export const userLogin = async (formData: FormData) => {

    const email = formData.get("email");
    const password = formData.get("password") as string;
    let isLogin;
    let token;
    let findUser;

    try {
        if (email && password) {
            findUser = await User.findOne({ email })
            if (findUser && findUser.password) {
                isLogin = await bcrypt.compare(password, findUser.password);

            } else {
                throw new Error("User not found");
            }
        }
    } catch (error: any) {
        console.log("Error creating User:", error);
        return { error: error.message };
    }

    if (isLogin && findUser) {
        token = jsonwebtoken.sign({ email: findUser.email, isAdmin: findUser.isAdmin, userId: findUser._id }, process.env.SECRET_KEY as string, { expiresIn: '24h' });
        await findUser.updateOne({ accessToken: token });
        await findUser.save();
        cookies().set("accessToken", token);
        redirect("/");
    } else {
        return { error: "Invalid email or password" };
    }
};

export const logout = async (token: string) => {

    let isLogout;

    try {
        if (token) {
            const verifyToken: any = jsonwebtoken.verify(token, process.env.SECRET_KEY as string)
            if (verifyToken) {

                const findUser = await User.findOne({ email: verifyToken.email });
                if (findUser) {
                    await findUser.updateOne({ accessToken: "" });
                    await findUser.save();
                    cookies().set({
                        value: "",
                        maxAge: 0,
                        expires: -1,
                        name: "accessToken"
                    });
                    isLogout = true;
                    redirect("/");
                }
            }
        }
    } catch (error) {
        console.log("Error creating User:", error);
    }

    if (isLogout) {
        redirect("/login");
    }
};

export const userCreate = async (formData: FormData) => {

    let email = formData.get("email");
    let name = formData.get("name");
    let password = formData.get("password") as string;
    let isCreate;

    try {
        if (email && password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const create = await User.create({ email, password: hash, name });
            const err = create.validateSync();
            if (err) {
                console.log("Validation error", err);
            }
            await create.save();

            sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

            const msg = {
                to: email.toString(), // Change to your recipient
                from: 'hakantpuz@gmail.com', // Change to your verified sender
                subject: 'Your password',
                text: `Your password is ${password}`,
                html: `<strong>Your Password is:${password}</strong>`,
            }

            await sgMail.send(msg)
            isCreate = true;
        }
    } catch (error) {
        console.log("Error creating User:", error);
    }

    if (isCreate) {
        redirect("/userList");
    }
};
