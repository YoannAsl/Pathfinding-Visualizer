import React from 'react';
import './Node.css';

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

export default Node;
