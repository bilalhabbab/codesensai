import { Box, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'

const Random = () => {
  return (
    <VStack>
        <Text fontSize="5xl" mb={'15vh'}>Pick One of 3 Difficulties</Text>
        <HStack>
            <Box 
            w="25vw" 
            h="50%" 
            bg={useColorModeValue("gray.100", 'gray.700')}
            _hover={{'bgColor':'gray.400', fontStyle:'underline'}} 
            borderRadius="10px" 
            textAlign="center" 
            lineHeight="100px"
            >
                <Text fontSize="5xl" color="green.300">Easy</Text>
            </Box>
            <Box 
            w="25vw" 
            h="50%" 
            bg={useColorModeValue("gray.100", 'gray.700')}
            _hover={{'bgColor':'gray.400', fontStyle:'underline'}} 
            borderRadius="10px" 
            textAlign="center" 
            lineHeight="100px"
            >
                <Text fontSize="5xl" color="yellow.300">Medium</Text>
            </Box>
            <Box 
            w="25vw" 
            h="50%" 
            bg={useColorModeValue("gray.100", 'gray.700')}
            _hover={{'bgColor':'gray.400', fontStyle:'underline'}} 
            borderRadius="10px" 
            textAlign="center" 
            lineHeight="100px"
            >
                <Text fontSize="5xl" color="red.300">Hard</Text>
            </Box>
        </HStack>
    </VStack>
  )
}

export default Random