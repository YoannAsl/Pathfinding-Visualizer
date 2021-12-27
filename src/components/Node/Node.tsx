import React from 'react';
import './Node.css';
import { NodeProps } from '../../types';

function Node({
    row,
    column,
    isStart,
    isFinish,
    onMouseEnter,
    onMouseDown,
    onMouseUp,
    isWall,
    isVisited,
}: NodeProps) {
    return (
        <div
            id={`node-${row}-${column}`}
            className={`node ${isStart ? 'start ' : isFinish ? 'finish ' : ''}`}
            onMouseDown={() => onMouseDown(row, column)}
            onMouseEnter={() => onMouseEnter(row, column)}
            onMouseUp={onMouseUp}
        >
            {/* {isWall ? 't' : ''}
            {isVisited ? 'v' : ''} */}
        </div>
    );
}

export default Node;
