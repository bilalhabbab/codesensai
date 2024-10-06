import React, { useRef, useState } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
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

function CodeBox({minutes, seconds, code, setCode, onSubmit}) {
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(CODE_TEMPLATES[newLanguage]);
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <>
      <Flex color={useColorModeValue('black', 'white')} bgColor={useColorModeValue('white', '#1e1e1e')} flexDir='row' w="100%" borderRadius='20px' p={5}>
        <Box height="100%" w="50%">
          <LangSwitch language={language} onSelect={handleLanguageChange} />
          <Editor
            height="80vh"
            theme={useColorModeValue('vs-light', 'vs-dark')}
            options={{ minimap: { enabled: false } }}
            language={language}
            value={code}
            ref={editorRef}
            onMount={handleEditorMount}
            onChange={handleEditorChange}
          />
        </Box>
        <Output editorRef={editorRef} language={language} minutes={minutes} seconds={seconds} onSubmit={onSubmit} />
      </Flex>
    </>
  );
}


export default CodeBox;