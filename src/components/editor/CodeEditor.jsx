import React, { useRef, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'

const CodeEditor = ({ code, onChange, readOnly = false }) => {
  const editorRef = useRef(null);

  // שמירת רפרנס לעורך הקוד כשהוא נטען
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // שמירת מיקום הסמן בעת עדכון הקוד
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      
      // עדכן את הערך רק אם העורך כבר מוכן וזה לא הערך הראשון
      const currentValue = editor.getValue();
      if (currentValue !== code) {
        // שמירת מיקום הסמן הנוכחי
        const position = editor.getPosition();
        
        // עדכון הקוד
        editor.setValue(code);
        
        // החזרת הסמן למיקום המקורי (אם העורך אינו לקריאה בלבד)
        if (position && !readOnly) {
          setTimeout(() => {
            editor.setPosition(position);
            editor.focus();
          }, 0);
        }
      }
    }
  }, [code, readOnly]);

  // טיפול בשינויים בעורך
  const handleEditorChange = (value) => {
    onChange(value);
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
          },
          quickSuggestions: false,  // ביטול הצעות קוד אוטומטיות
          cursorSmoothCaretAnimation: true,  // אנימציה חלקה יותר של הסמן
          smoothScrolling: true  // גלילה חלקה
        }}
      />
    </div>
  )
}

export default CodeEditor