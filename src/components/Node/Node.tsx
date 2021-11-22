import React from 'react';
import './Node.css';

interface NodeProps {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    onMouseEnter: (row: number, column: number) => void;
    toggleWall: (row: number, column: number) => void;
    setIsMousePressed: React.Dispatch<React.SetStateAction<boolean>>;
    isWall: boolean;
}

function Node({
    row,
    column,
    isStart,
    isFinish,
    onMouseEnter,
    toggleWall,
    setIsMousePressed,
    isWall,
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
            onMouseEnter={() => onMouseEnter(row, column)}
            onMouseUp={() => setIsMousePressed(false)}
        />
    );
}

export default Node;
