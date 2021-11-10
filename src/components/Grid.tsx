import React, { useEffect, useState } from 'react';
import Node from './Node';
import dijkstra from '../algorithms/dijkstra';
import './Grid.css';

export interface NodeType {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    isVisited: boolean;
    distance: number;
    previousNode: NodeType | null;
}

export type GridType = NodeType[][] | [];

const START_NODE_ROW = 8;
const START_NODE_COLUMN = 5;
const FINISH_NODE_ROW = 13;
const FINISH_NODE_COLUMN = 34;

function createNode(row: number, column: number) {
    return {
        row,
        column,
        isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
        isFinish: row === FINISH_NODE_ROW && column === FINISH_NODE_COLUMN,
        isVisited: false,
        distance:
            row === START_NODE_ROW && column === START_NODE_COLUMN
                ? 0
                : Infinity,
        previousNode: null,
    };
}

function Grid() {
    const [grid, setGrid] = useState<GridType>([]);

    useEffect(() => {
        const newGrid = [];
        for (let row = 0; row < 25; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                const currentNode = createNode(row, col);
                currentRow.push(currentNode);
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
    }, []);

    function animateAlgorithm() {
        const visitedNodes = dijkstra(
            grid,
            grid[FINISH_NODE_ROW][FINISH_NODE_COLUMN]
        );

        for (let i = 0; i < visitedNodes!.length; i++) {
            setTimeout(() => {
                const node = visitedNodes![i];
                if (!node?.isStart && !node?.isFinish) {
                    document.getElementById(
                        `${node?.row}-${node?.column}`
                    )!.className = 'node visited';
                }
            }, 10 * i);
        }
    }

    return (
        <main>
            {grid.map((row, index) => (
                <div className='row' key={index}>
                    {row.map((node, index) => (
                        <Node
                            row={node.row}
                            column={node.column}
                            isStart={node.isStart}
                            isFinish={node.isFinish}
                            isVisited={node.isVisited}
                            key={index}
                        />
                    ))}
                </div>
            ))}
            <button onClick={() => animateAlgorithm()}>
                Visualize Algorithm
            </button>
        </main>
    );
}

export default Grid;
