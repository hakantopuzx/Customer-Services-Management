"use client"

import React from 'react'
import { ColorRing } from 'react-loader-spinner'

export const Loading = () => {
    return (
        <div className="loading">
            <ColorRing
                visible={true}
                height="120"
                width="120"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    )
}
