import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Problem = () => {
  return (
    <>
        <Flex flexDir="row" justifyContent='space-between' w="100%" bg={useColorModeValue('gray.300', 'gray.600')} p={3}>
            <Text fontSize="xl" w={'25%'} textAlign="center">63. Sort Arrays</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center" color="green.500">Easy</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center">Completed</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center">Arrays</Text>
        </Flex>
        <Flex flexDir="row" justifyContent='space-between' w="100%" bg={useColorModeValue('gray.100', 'gray.500')} p={3}>
            <Text fontSize="xl" w={'25%'} textAlign="center">64. do hashmaps dumdum</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center" color="red.500">Hard</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center">New</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center">Hashmaps</Text>
        </Flex>
        <Flex flexDir="row" justifyContent='space-between' w="100%" bg={useColorModeValue('gray.300', 'gray.600')} p={3}>
            <Text fontSize="xl" w={'25%'} textAlign="center">65. we making it to apple with this</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center" color="yellow.500">Medium</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center">Attempted</Text>
            <Text fontSize="xl" w={'25%'} textAlign="center">Security</Text>
        </Flex>
    </>
  )
}

export default Problem