import { useRef, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'

const CodeEditor = ({ code, onChange, readOnly = false }) => {
  const editorRef = useRef(null);
  const prevCodeRef = useRef(code);

  // שמירת רפרנס לעורך הקוד כשהוא נטען
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // טיפול בעדכון קוד חיצוני תוך שמירה על מיקום הסמן
  useEffect(() => {
    if (editorRef.current && code !== prevCodeRef.current) {
      const model = editorRef.current.getModel();
      
      if (model) {
        // שמירת מיקום הסמן הנוכחי
        const selection = editorRef.current.getSelection();
        const position = editorRef.current.getPosition();
        
        // בצע את העדכון
        const range = model.getFullModelRange();
        const op = { range, text: code, forceMoveMarkers: true };
        model.pushEditOperations([], [op], () => null);
        
        // החזר את הסמן למיקום המקורי אם אפשרי
        if (position && !readOnly) {
          editorRef.current.setPosition(position);
          if (selection) {
            editorRef.current.setSelection(selection);
          }
        }
      }
      
      prevCodeRef.current = code;
    }
  }, [code, readOnly]);

  const handleEditorChange = (value) => {
    if (value !== code) {
      onChange(value);
      prevCodeRef.current = value;
    }
  };

  return (
    <div className="h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyond: false,
          automaticLayout: true,
          wordWrap: 'on',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
          }
        }}
      />
    </div>
  )
}

export default CodeEditor 