import React, { useEffect, useState } from 'react';
import CodeBox from './CodeBox';
import { useTimer } from 'react-timer-hook';
import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CODE_TEMPLATES: Record<'javascript' | 'typescript' | 'python', string> = {
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

const Solving = ({ submitCode }: { submitCode: (language: string, problemDescription: string, userCode: string) => Promise<void> }) => {
  const [code, setCode] = useState(CODE_TEMPLATES.javascript);
  const [language, setLanguage] = useState<'javascript' | 'typescript' | 'python'>('javascript'); // Default to JavaScript
  const [evaluationResult, setEvaluationResult] = useState(null); // Stores the evaluation result
  const [errorMessage, setErrorMessage] = useState('');

  let navigate = useNavigate();

  const fortyMins = new Date();
  fortyMins.setMinutes(fortyMins.getMinutes() + 40);

  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onTimeOver = () => {
    setIsTimeOver(true);
  };

  const onTimeOverClose = () => {
    setIsTimeOver(false);
    navigate('/results', { state: { code, evaluationResult } }); // Pass the result to the results page
  };

  const onSubmitClick = async () => {
    setIsSubmitted(true);

    try {
      await submitCode(language, "Your task description here", code); // Submits the code for evaluation
      setIsSubmitted(false); // Close the modal after submission
      onTimeOverClose(); // Navigate to results
    } catch (error) {
      console.error('Error during code evaluation:', error);
      setErrorMessage('There was an error evaluating your code. Please try again.');
    }
  };

  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value as 'javascript' | 'typescript' | 'python'; // Type assertion
    setLanguage(selectedLanguage);
    setCode(CODE_TEMPLATES[selectedLanguage]); // Update the code template based on selected language
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, []);

  const {
    seconds,
    minutes,
    start,
  } = useTimer({ expiryTimestamp: fortyMins, onExpire: () => onTimeOver(), autoStart: false });

  const onContinue = () => {
    start();
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are You Ready!?</ModalHeader>
          <ModalBody pb={6}>
            <Text>
              You will have 40 minutes to complete the task. Upon submission, or 
              when the time runs out, your code will be evaluated. You will be given
              feedback based on your comments, efficiency, and readability.
              Make sure you write down your comments as if you are explaining
              your code to the interviewer. Good Luck!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { onClose(); onContinue(); }} colorScheme='blue' mr='auto' ml='auto'>
              Let's Go!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal closeOnOverlayClick={false} isOpen={isTimeOver} onClose={onTimeOverClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Time's up!</ModalHeader>
          <ModalBody pb={6}>
            <Text>
              Now press continue, and your results will be displayed in a few moments.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onTimeOverClose} colorScheme='blue' mr='auto' ml='auto'>
              Continue!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal closeOnOverlayClick={true} isOpen={isSubmitted} onClose={() => setIsSubmitted(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Submission</ModalHeader>
          <ModalBody pb={6}>
            <Text>Are you sure you want to submit your code for evaluation?</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsSubmitted(false)} colorScheme='red' mr='auto' ml='auto'>
              No, go back!
            </Button>
            <Button onClick={onSubmitClick} colorScheme='green' mr='auto' ml='auto'>
              Yes, submit!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack spacing={4} mt={5}>
        <Text fontSize="lg">Select Language:</Text>
        <Select value={language} onChange={onLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </Select>
      </HStack>

      <CodeBox minutes={minutes} seconds={seconds} code={code} setCode={setCode} onSubmit={onSubmitClick} />

      {errorMessage && <Text color="red">{errorMessage}</Text>}
    </>
  );
};

export default Solving;