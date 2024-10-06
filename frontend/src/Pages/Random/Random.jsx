import { Box, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Utils/firebase'; // Make sure you have your Firebase setup

const Random = () => {
  const navigate = useNavigate();

  // Function to fetch problems based on difficulty and pick a random one
  const fetchRandomProblem = async (difficulty) => {
    try {
      const problemsRef = collection(db, 'problems');
      const q = query(problemsRef, where('difficulty', '==', difficulty));
      const querySnapshot = await getDocs(q);

      // Get the list of problems that match the difficulty
      const problems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Pick a random problem
      if (problems.length > 0) {
        const randomIndex = Math.floor(Math.random() * problems.length);
        const randomProblem = problems[randomIndex];

        // Navigate to the solving page with the selected problem
        navigate(`/solving/${randomProblem.number}`, { state: randomProblem });
      } else {
        console.log(`No ${difficulty} problems found.`);
      }
    } catch (err) {
      console.error('Error fetching problems:', err);
    }
  };

  return (
    <VStack>
      <Text fontSize="5xl" mb={'15vh'}>Pick One of 3 Difficulties</Text>
      <HStack>
        {/* Easy Box */}
        <Box
          w="25vw"
          h="50%"
          bg={useColorModeValue("gray.100", 'gray.700')}
          _hover={{ 'bgColor': 'gray.400', fontStyle: 'underline', cursor: 'pointer' }}
          borderRadius="10px"
          textAlign="center"
          lineHeight="100px"
          onClick={() => fetchRandomProblem('Easy')}
        >
          <Text fontSize="5xl" color="green.300">Easy</Text>
        </Box>

        {/* Medium Box */}
        <Box
          w="25vw"
          h="50%"
          bg={useColorModeValue("gray.100", 'gray.700')}
          _hover={{ 'bgColor': 'gray.400', fontStyle: 'underline', cursor: 'pointer' }}
          borderRadius="10px"
          textAlign="center"
          lineHeight="100px"
          onClick={() => fetchRandomProblem('Medium')}
        >
          <Text fontSize="5xl" color="yellow.300">Medium</Text>
        </Box>

        {/* Hard Box */}
        <Box
          w="25vw"
          h="50%"
          bg={useColorModeValue("gray.100", 'gray.700')}
          _hover={{ 'bgColor': 'gray.400', fontStyle: 'underline', cursor: 'pointer' }}
          borderRadius="10px"
          textAlign="center"
          lineHeight="100px"
          onClick={() => fetchRandomProblem('Hard')}
        >
          <Text fontSize="5xl" color="red.300">Hard</Text>
        </Box>
      </HStack>
    </VStack>
  );
}

export default Random;
