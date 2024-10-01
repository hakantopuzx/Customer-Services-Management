"use client"

import { logout } from '@/actions/auth/userAuth'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export const Sidebar = (props: { token: string, isAdmin?: boolean }) => {
    const pathname = usePathname();
    const [isMenuOpened, setIsMenuOpened] = useState(false);


    useEffect(() => {
        setIsMenuOpened(false);
    }, [pathname]);

    return (
        <>
            <div className="menu-toggle" onClick={() => setIsMenuOpened(isMenuOpened => !isMenuOpened)}>
                <Image src={require("../icons/menu.png")} alt='Menu' />
            </div>
            <div className={"right-menu" + (isMenuOpened ? " opened" : "")}>
                {props.isAdmin &&
                    <div className="item">
                        <div className="title">
                            Users
                        </div>
                        <div className="list">
                            <>
                                <Link href={"/userList"}>User List</Link>
                                <Link href={"/userCreate"}>User Create</Link>
                                <Link href={"/userUpdate"}>User Update</Link>
                            </>
                        </div>
                    </div>
                }
                <div className="item">
                    <div className="title">
                        Customers
                    </div>
                    <div className="list">
                        <Link href={"/customerList"}>Customer List</Link>
                        {props.isAdmin &&
                            <>
                                <Link href={"/customerCreate"}>Customer Create</Link>
                                <Link href={"/customerUpdate"}>Customer Update</Link>
                            </>
                        }
                    </div>
                </div>
                <div className="item">
                    <button onClick={() => logout(props.token)}>Çıkış Yap</button>
                </div>
            </div >
        </>
    )
}
