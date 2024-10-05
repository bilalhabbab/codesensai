import React, { useRef, useState } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LangSwitch from "./LangSwitcher";
import Output from "./Output";

const CODE_TEMPLATES = {
  javascript: `function greet(name) {
  console.log("Hello, " + name + "!");
  }
      
  greet("Paul");
  `,
  typescript: `type Params = {
  name: string;
};
      
function greet(data: Params) {
  console.log("Hello, " + data.name + "!");
}
      
greet({ name: "Paul" });
  `,
  python: `def greet(name):
  print("Hello, " + name + "!")
      
greet("Paul")
  `,
};

function CodeBox() {
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);
  const [code, setCode] = useState(CODE_TEMPLATES.javascript);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(CODE_TEMPLATES[newLanguage]);
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <>
    <Box w="48%">
      <LangSwitch language={language} onSelect={handleLanguageChange} />
      <Editor height="90vh" theme={useColorModeValue('vs-light', 'vs-dark')} options={{minimap: { enabled: false },}} language={language} value={code} ref={editorRef} onMount={handleEditorMount}/>
    </Box>
    {<Output editorRef={editorRef} language={language} />}
    </>
  );
}


export default CodeBox;