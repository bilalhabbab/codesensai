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
    <Box w="48%">
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
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor={useColorModeValue("black", "gray.300")}
        color={useColorModeValue("white", "black")}
        bg={useColorModeValue("black", "white")}
      >
        <Text>{output}</Text>
      </Box>
    </Box>
  );
};
export default Output;