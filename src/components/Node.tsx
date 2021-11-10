import React from 'react';
import styled from 'styled-components';

interface NodeProps {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    isVisited: boolean;
}

function Node({ row, column, isStart, isFinish, isVisited }: NodeProps) {
    return (
        <div
            id={`${row}-${column}`}
            className={`node ${isStart ? 'start ' : isFinish ? 'finish ' : ''}`}
        />
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
