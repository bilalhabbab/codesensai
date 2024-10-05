import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { executeCode } from "../../Utils/pistonAPI";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const runCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const sourceCode = editorRef.current.getValue();
      if (!sourceCode) return;
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
      console.log(result);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box w="100%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="25vh"
        p={2}
        borderRadius={4}
        color="white"
        bg='black'
        whiteSpace="pre-wrap"
        overflow='auto'
      >
        <Text>{output}</Text>
      </Box>
    </Box>
  );
};
export default Output;