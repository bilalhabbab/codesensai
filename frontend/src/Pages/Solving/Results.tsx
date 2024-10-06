import { Container } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { code, task } = location.state || { code: '', task: '' };

  return (
    <>
        <Container whiteSpace="pre-wrap" mb={5}>{code}</Container>
        <Container whiteSpace="pre-wrap">{task}</Container>
    </>
  );
};

export default Results;