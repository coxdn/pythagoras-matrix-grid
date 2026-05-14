import React from 'react'

const formatAuditTooltip = (createdAt, updatedAt) => {
    const lines = []
    if (createdAt) lines.push(`Создано: ${createdAt}`)
    if (updatedAt) lines.push(`Изменено: ${updatedAt}`)
    return lines.join('\n')
}

const formatCreatedAtTooltip = (createdAt) => createdAt ? `Создано: ${createdAt}` : ''

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

export { TooltipText, formatAuditTooltip, formatCreatedAtTooltip }
