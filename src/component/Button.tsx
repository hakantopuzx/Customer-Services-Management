"use client"

import { useEffect, useState } from "react";

type ButtonProps = {
    title?: string,
    href?: string,
    ico?: JSX.Element | JSX.Element[] | string | any;
    classNames?: string,
    ref?: any
    onClick?: () => void
}

const Button = (props: ButtonProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;


    return <>
        <button className={"btn-default" + (props.classNames ? " " + props.classNames : "")} title={props.title} type="button" onClick={props.onClick
        }>
            <span>{props.title}</span>
            {props.ico}
        </button>
    </>
}

export default Button;