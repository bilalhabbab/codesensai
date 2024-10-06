import { Box, Button, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Home = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  return (
    <VStack 
      spacing={8} 
      align='center' 
      justifyContent='center' 
      minH="100vh" 
      bg={bgColor} 
      px={8}
    >
      <Heading 
        fontSize="6xl" 
        textAlign="center" 
        color={textColor} 
        mb={4}
      >
        Welcome to CodeSensAI
      </Heading>
      
      <Text 
        fontSize="2xl" 
        color={textColor} 
        textAlign="center" 
        maxW="800px"
      >
        Are you ready to nail your next technical interview? 
        CodeSensAI is here to help you sharpen your coding skills, 
        boost your problem-solving ability, and ace every technical challenge you face.
        Whether it's solving algorithms, mastering complexity, or refining code readability, 
        our platform offers personalized feedback to help you improve every step of the way.
      </Text>
      
      <Text 
        fontSize="xl" 
        color={textColor} 
        textAlign="center" 
        maxW="800px"
      >
        Built with the future in mind, CodeSensAI uses real-time evaluation of your code, 
        analyzing it for comments, time and storage complexity, readability, and much more. 
        Whether you're just getting started or preparing for your final round of interviews, 
        we’ve got problems at every difficulty level: Easy, Medium, and Hard.
      </Text>

      <Box 
        p={4} 
        bg="blue.500" 
        color="white" 
        borderRadius="md" 
        _hover={{ bg: 'blue.600' }}
        cursor="pointer" 
        onClick={() => navigate('/problems')}
      >
        <Text fontSize="2xl" textAlign="center">Start Solving Problems</Text>
      </Box>

      <Text 
        fontSize="xl" 
        color={textColor} 
        textAlign="center" 
        maxW="800px"
      >
        Ready to test your skills? Click the button above to begin solving hand-picked problem sets 
        that simulate real interview scenarios. Track your progress, see where you need improvement, 
        and optimize your approach with detailed feedback from our AI-powered evaluation system.
      </Text>

      <Box mt={6}>
        <Button 
          size="lg" 
          colorScheme="teal" 
          onClick={() => navigate('/problems')}
        >
          View Problem Sets
        </Button>
      </Box>
    </VStack>
  );
};

export default Home;
