import React from 'react';
import styled from 'styled-components';

interface NodeProps {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
}

function Node({ row, column, isStart, isFinish }: NodeProps) {
    return <Container isStart={isStart} isFinish={isFinish} />;
}

const Container = styled.div<{ isStart: boolean; isFinish: boolean }>`
    height: 25px;
    width: 25px;
    border: 1px solid black;
    box-sizing: border-box;
    margin: 0 -1px -1px 0;
    background-color: ${({ isStart, isFinish }) =>
        isStart ? 'green' : isFinish ? 'red' : 'white'};
`;

export default Node;
