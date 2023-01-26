
import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'


interface MarkdownDisplayProps {
    markdown: string
}


export default function MarkdownDisplay({
    markdown
}) {
    return (
        <ReactMarkdown remarkPlugins={[gfm]}>{markdown}</ReactMarkdown>
    )
}