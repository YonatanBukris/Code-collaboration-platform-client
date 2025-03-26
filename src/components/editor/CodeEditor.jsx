import React, { useRef, useEffect, useState } from 'react'
import { Editor } from '@monaco-editor/react'

const CodeEditor = ({ code, onChange, readOnly = false }) => {
  const editorRef = useRef(null);
  const [localCode, setLocalCode] = useState(code);

  // שמירת רפרנס לעורך הקוד כשהוא נטען
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // טיפול בעדכון קוד חיצוני תוך שמירה על מיקום הסמן
  useEffect(() => {
    if (editorRef.current && code !== localCode) {
      const editor = editorRef.current;
      const model = editor.getModel();

      if (model) {
        // שמירת מיקום הסמן הנוכחי
        const selection = editor.getSelection();
        const position = editor.getPosition();

        // בצע את העדכון בצורה יציבה יותר
        model.setValue(code);

        // החזר את הסמן למיקום המקורי אם אפשרי
        if (position && !readOnly) {
          editor.setPosition(position);
          if (selection) {
            editor.setSelection(selection);
          }
        }

        setLocalCode(code);
      }
    }
  }, [code, readOnly]);

  // טיפול בשינויים בעורך
  const handleEditorChange = (value) => {
    if (value !== localCode) {
      setLocalCode(value);
      onChange(value);
    }
  };

  return (
    <div className="h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={localCode}
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
          },
          // הוספת אפשרויות לשיפור חווית ההקלדה
          quickSuggestions: true,
          snippetSuggestions: 'top',
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: 'on'
        }}
      />
    </div>
  )
}

export default CodeEditor