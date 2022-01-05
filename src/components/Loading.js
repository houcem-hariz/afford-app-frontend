import React from 'react'

export default function Loading() {
    return (
        <div className="full-width mt-3 d-flex justify-content-center">
            <span className="visually-visible mx-3">Loading...  </span>
            <div className="spinner-border custom-spinner" role="status">
            </div>
        </div>
    )
}
