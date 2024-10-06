import React, { useEffect, useState } from 'react'
import CodeBox from './CodeBox'
import { useTimer } from 'react-timer-hook';
import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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

const Solving = () => {

  const [code, setCode] = useState(CODE_TEMPLATES.javascript);

  let navigate = useNavigate();

  const fortyMins = new Date();
  fortyMins.setMinutes(fortyMins.getMinutes() + 40);

  const [isTimeOver, setIsTimeOver] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onTimeOver = () => {
    setIsTimeOver(true)
  }
  
  const onTimeOverClose = () => {
    setIsTimeOver(false);
    navigate('/results', { state: { code } });
  }

  const onSubmitClick = () => {
    setIsSubmitted(true)
  }

  const onSubmittedClose = () => {
    setIsSubmitted(false)
  }

  const onConfirmSubmit = () => {
    setIsSubmitted(false)
    onTimeOverClose()
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => { onOpen() }, [])


  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: fortyMins, onExpire: () => onTimeOver(), autoStart: false });


  const onContinue = () => {
    start()
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are You Ready!?</ModalHeader>
          <ModalBody pb={6}>
            <Text>
              You will have 40 minutes to complete the task. Upon submission, or 
              when the time runs out, your code will be evaluated. you will be given
              feedback based on your comments, efficiency, and readability.
              Make sure you write down your comments as if you are explaining
              your code to the interviewer. Good Luck!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => {onClose(); onContinue()}} colorScheme='blue' mr='auto' ml='auto'>
              Let's Go!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Modal closeOnOverlayClick={false} isOpen={isTimeOver} onClose={onTimeOverClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tiiiimmes up!</ModalHeader>
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

      <Modal closeOnOverlayClick={true} isOpen={isSubmitted} onClose={onSubmittedClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Submission</ModalHeader>
          <ModalBody pb={6}>
            <Text>
              We just wanna make sure that you are acc serious about submitting.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmittedClose} colorScheme='red' mr='auto' ml='auto'>
              Nooo!
            </Button>
            <Button onClick={onConfirmSubmit} colorScheme='green' mr='auto' ml='auto'>
              Continue!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CodeBox minutes={minutes} seconds={seconds} code={code} setCode={setCode} onSubmit={onSubmitClick}/>
    </>
  )
}

export default Solving