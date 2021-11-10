import React from 'react';
import styled from 'styled-components';

interface NodeProps {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    isVisited: boolean;
    distance: number;
    // visitNode: (row: number, column: number) => void;
}

function Node({
    row,
    column,
    isStart,
    isFinish,
    isVisited,
    distance,
}: // visitNode,
NodeProps) {
    return (
        <Container
            isStart={isStart}
            isFinish={isFinish}
            isVisited={isVisited}
            // onClick={() => visitNode(row, column)}
        >
            {distance === Infinity ? '∞' : distance}
        </Container>
    );
}

const Container = styled.div<{
    isStart: boolean;
    isFinish: boolean;
    isVisited: boolean;
}>`
    height: 30px;
    width: 30px;
    border: 1px solid black;
    box-sizing: border-box;
    margin: 0 -1px -1px 0;
    background-color: ${({ isStart, isFinish, isVisited }) =>
        isStart
            ? 'green'
            : isFinish
            ? 'red'
            : isVisited
            ? 'lightgrey'
            : 'white'};
`;

export default Node;
