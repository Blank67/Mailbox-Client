// import { EditorState } from 'draft-js';
// import React, { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// const TextEditor = (props) => {
//     const initialEditorState = EditorState.createEmpty();
//     const [mailContent, setMailContent] = useState(initialEditorState);

//     const onEditorStateChange = (editorState) => {
//         // debugger;
//         // console.log(editorState);
//         setMailContent(editorState);
//     }

//     return (
//         <div className="editor">
//             <Editor
//                 editorState={mailContent}
//                 wrapperClassName="demo-wrapper"
//                 editorClassName="demo-editor"
//                 onEditorStateChange={onEditorStateChange}
//             />
//         </div>
//     )
// }

// export default TextEditor;

const TextEditor = (props) => {
    return (
        <div>
            <h1>TEXT EDITOR</h1>
        </div>
    )
}

export default TextEditor;