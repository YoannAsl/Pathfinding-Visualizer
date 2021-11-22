import React from 'react';
import './Node.css';

interface NodeProps {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    onMouseEnter: (row: number, column: number) => void;
    onMouseDown: (row: number, column: number) => void;
    onMouseUp: () => void;
    isVisited: boolean;
    isWall: boolean;
}

function Node({
    row,
    column,
    isStart,
    isFinish,
    onMouseEnter,
    isWall,
    onMouseDown,
    onMouseUp,
    isVisited,
}: NodeProps) {
    return (
        <div
            id={`node-${row}-${column}`}
            className={`node ${isStart ? 'start ' : isFinish ? 'finish ' : ''}`}
            onMouseDown={() => onMouseDown(row, column)}
            onMouseEnter={() => onMouseEnter(row, column)}
            onMouseUp={() => onMouseUp()}
        >
            {isWall ? 't' : ''}
            {isVisited ? 'v' : ''}
        </div>
    );
}

export default Node;
