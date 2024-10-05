import { Box, Container, HStack, Select, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import Problem from './Problem'

const Problems = () => {
  return (
    <>
        <Text fontSize="6xl">Problems</Text>
        <Box w='330px' h='3px' bgColor={useColorModeValue('black', 'gray.400')} boxShadow='2px 2px 5px gray' />

        <HStack mt={5} px={5} spacing={10}>
        <Select placeholder='Difficulty'>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
        </Select>
        <Select placeholder='Status'>
            <option value='new'>New</option>
            <option value='attempted'>Attempted</option>
            <option value='solved'>Solved</option>
        </Select>
        <Select placeholder='Question Type'>
            <option value='array'>Array</option>
            <option value='string'>String</option>
            <option value='hashmap'>Hashmap</option>
        </Select>
        </HStack>
        <VStack mt={5} spacing={0}>
            <HStack w="100%" justifyContent='space-between' px={6} mb={3}>
                <Text fontSize="2xl" w={'25%'} textAlign="center">Problem</Text>
                <Text fontSize="2xl" w={'25%'} textAlign="center">Diffuculty</Text>
                <Text fontSize="2xl" w={'25%'} textAlign="center">Status</Text>
                <Text fontSize="2xl" w={'25%'} textAlign="center">Type</Text>
            </HStack>
            <Problem />
        </VStack>
    </>
  )
}

export default Problems