import { Box, Button, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { executeCode } from "../../Utils/pistonAPI";

const Output = ({ editorRef, language, minutes, seconds, onSubmit }) => {
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
    <Box w="50%" p={5}>
      <Flex justify="space-between" align="center" mb={4} px={2}>
        <HStack>
          <Button
            variant="outline"
            colorScheme="green"
            isLoading={isLoading}
            onClick={runCode}
          >
            Run Code
          </Button>
          <Button
            colorScheme="green"
            isLoading={isLoading}
            onClick={onSubmit}
          >
            Submit Code
          </Button>

        </HStack>
        <Text color={useColorModeValue("black", "white")}>
          {minutes}m {seconds}s
        </Text>
      </Flex>
      <Box
        height="90%"
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