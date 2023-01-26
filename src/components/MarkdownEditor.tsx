
import React from 'react'
import MDEditor from '@uiw/react-md-editor';


interface MarkdownEditorProps {
}


export default function MarkdownEditor({
}) {
    const [value, setValue] = React.useState("**Hello world!!!**");
    return (
        <div>
            <MDEditor
                value={value}
                onChange={setValue}
                preview={'edit'}
                extraCommands={[]}
                highlightEnable={false}
                style={{ fontSize: '250px !important' }}
                data-color-mode="light"
                placeholder="Post content"
            />
            {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </div>
    );
}