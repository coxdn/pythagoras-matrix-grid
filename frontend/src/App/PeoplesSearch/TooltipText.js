import React from 'react'

const TooltipText = ({ children, title, style }) => {
    if (!title) {
        return <span style={style}>{children}</span>
    }

    return (
        <span className="people-tooltip" data-tooltip={title} style={style}>
            {children}
        </span>
    )
}

export { TooltipText }
