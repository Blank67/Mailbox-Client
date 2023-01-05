import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const TextEditor = (props) => {
    const editorRef = useRef(null);
    const [content, setContent] = useState('');

    const onChangeHandler = (newContent) => {
        setContent(newContent);
        console.log(content);
    }

    return (
        <div className={props.className}>
            <JoditEditor
                ref={editorRef}
                value={content}
                // config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={onChangeHandler}
            />
        </div>
    )
}

export default TextEditor;