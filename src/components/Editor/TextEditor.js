import JoditEditor from "jodit-react";
import { useRef } from "react";

const TextEditor = (props) => {
    const editorRef = useRef(null);
    const config = {
        placeholder: 'Type your message here.....'
    }

    const onBlurHandler = (newContent) => {
        props.body(newContent);
    }

    return (
        <div className={props.className}>
            <JoditEditor
                ref={editorRef}
                tabIndex={1} // tabIndex of textarea
                onChange={onBlurHandler}
                config={config}
            />
        </div>
    )
}

export default TextEditor;