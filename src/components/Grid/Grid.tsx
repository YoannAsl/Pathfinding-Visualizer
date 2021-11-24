import React from 'react';
import Node from '../Node/Node';
import { GridType } from '../App/App';
import './Grid.css';

interface GridProps {
    grid: GridType;
    onMouseEnter: (row: number, column: number) => void;
    onMouseDown: (row: number, column: number) => void;
    onMouseUp: () => void;
}

function Grid({ grid, onMouseEnter, onMouseDown, onMouseUp }: GridProps) {
    return (
        <main>
            {grid.map((row, index) => (
                <div className='row' key={`row-${index}`}>
                    {row.map((node) => (
                        <Node
                            key={`node-${node.row}-${node.column}`}
                            row={node.row}
                            column={node.column}
                            isStart={node.isStart}
                            isFinish={node.isFinish}
                            onMouseEnter={onMouseEnter}
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                            isVisited={node.isVisited}
                            isWall={node.isWall}
                        />
                    ))}
                </div>
            ))}
        </main>
    );
}

export default Grid;
