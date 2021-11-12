import React from 'react';
import './Node.css';

interface NodeProps {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    isVisited: boolean;
    isWall: boolean;
    createWall: (row: number, column: number) => void;
}

function Node({
    row,
    column,
    isStart,
    isFinish,
    isVisited,
    isWall,
    createWall,
}: NodeProps) {
    return (
        <div
            id={`${row}-${column}`}
            className={`node ${isStart ? 'start ' : isFinish ? 'finish ' : ''}`}
            onMouseDown={() => createWall(row, column)}
        />
    );
}

export default Node;
