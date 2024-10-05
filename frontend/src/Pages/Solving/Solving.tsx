import React from 'react'
import CodeBox from './CodeBox'
import { Flex, useColorModeValue } from '@chakra-ui/react'

const Solving = () => {
  return (
    <div>
    <Flex minH="100vh" bg={useColorModeValue('#FAFAFA', 'gray.700')} color={useColorModeValue('black', 'white')} justifyContent="space-between" px={6} py={8}>
      <CodeBox />
    </Flex>
    </div>
  )
}

export default Solving