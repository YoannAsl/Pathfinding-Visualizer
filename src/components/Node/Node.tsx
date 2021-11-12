import React from 'react';
import './Node.css';

interface NodeProps {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    isVisited: boolean;
    isWall: boolean;
    toggleWall: (row: number, column: number) => void;
    setIsMousePressed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Node({
    row,
    column,
    isStart,
    isFinish,
    isVisited,
    isWall,
    toggleWall,
    setIsMousePressed,
}: NodeProps) {
    function onMouseDown() {
        setIsMousePressed(true);
        toggleWall(row, column);
    }

    return (
        <div
            id={`${row}-${column}`}
            className={`node ${isStart ? 'start ' : isFinish ? 'finish ' : ''}`}
            onMouseDown={() => onMouseDown()}
            onMouseEnter={() => toggleWall(row, column)}
            onMouseUp={() => setIsMousePressed(false)}
        />
    );
}

export default Node;
