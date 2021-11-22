import React, { useEffect, useState } from 'react';
import Node from '../Node/Node';
import dijkstra, { getShortestPath } from '../../algorithms/dijkstra';
import astar from '../../algorithms/a-star';
import './Grid.css';

interface GridProps {
    selectedAlgorithm: string;
}

export interface NodeType {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    isVisited: boolean;
    isWall: boolean;
    distance: number;
    previousNode: NodeType | null;
    gScore: number;
    hScore: number;
    fScore: number;
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
        isWall: false,
        distance:
            row === START_NODE_ROW && column === START_NODE_COLUMN
                ? 0
                : Infinity,
        previousNode: null,
        gScore:
            row === START_NODE_ROW && column === START_NODE_COLUMN
                ? 0
                : Infinity,
        hScore: 0,
        fScore:
            row === START_NODE_ROW && column === START_NODE_COLUMN
                ? 0
                : Infinity,
    };
}

function Grid({ selectedAlgorithm }: GridProps) {
    const [grid, setGrid] = useState<GridType>([]);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const newGridAfterWalls = [...grid];

    useEffect(() => {
        createNewGrid();
    }, []);

    function onMouseDown(row: number, column: number) {
        setIsMousePressed(true);
        toggleWall(row, column);
    }

    function onMouseEnter(row: number, column: number) {
        if (isMousePressed) toggleWall(row, column);
    }

    function onMouseUp() {
        setIsMousePressed(false);
        setGrid(newGridAfterWalls);
    }

    function toggleWall(row: number, column: number) {
        const newGrid = [...grid];
        const node = newGrid[row][column];

        if (!node.isStart && !node.isFinish) {
            node.isWall = !node.isWall;
            // This is not great, I am looking for another way
            document.getElementById(
                `node-${node?.row}-${node?.column}`
            )!.className = node.isWall ? 'node wall' : 'node';
        }
        newGridAfterWalls[row][column] = node;
    }

    function animateAlgorithm() {
        let visitedNodes: (NodeType | undefined)[] | undefined;
        let animationsLength: number;

        switch (selectedAlgorithm) {
            case 'dijkstra':
                visitedNodes = dijkstra(
                    grid,
                    grid[FINISH_NODE_ROW][FINISH_NODE_COLUMN]
                );
                animationsLength = 10;
                break;
            case 'astar':
                visitedNodes = astar(
                    grid,
                    grid[START_NODE_ROW][START_NODE_COLUMN],
                    grid[FINISH_NODE_ROW][FINISH_NODE_COLUMN]
                );
                animationsLength = 30;
                break;
        }

        for (let i = 0; i <= visitedNodes!.length; i++) {
            if (i === visitedNodes!.length) {
                setTimeout(() => {
                    animateShortest();
                }, animationsLength! * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes![i];
                if (!node?.isStart && !node?.isFinish) {
                    // This is not great, I am looking for another way
                    document.getElementById(
                        `node-${node?.row}-${node?.column}`
                    )!.className = 'node visited';
                }
            }, animationsLength! * i);
        }
    }

    function animateShortest() {
        const shortestPath = getShortestPath(
            grid[FINISH_NODE_ROW][FINISH_NODE_COLUMN]
        );
        for (let i = 0; i < shortestPath!.length; i++) {
            setTimeout(() => {
                const node = shortestPath![i];
                if (!node?.isStart && !node?.isFinish) {
                    // This is not great, I am looking for another way
                    document.getElementById(
                        `node-${node?.row}-${node?.column}`
                    )!.className = 'node shortest';
                }
            }, 20 * i);
        }
    }

    function resetGrid() {
        createNewGrid();
        for (const row of grid) {
            for (const node of row) {
                document.getElementById(
                    `node-${node?.row}-${node?.column}`
                )!.className = 'node';

                if (node.isStart) {
                    document.getElementById(
                        `node-${node?.row}-${node?.column}`
                    )!.className = 'node start';
                }

                if (node.isFinish) {
                    document.getElementById(
                        `node-${node?.row}-${node?.column}`
                    )!.className = 'node finish';
                }
            }
        }
    }

    function createNewGrid() {
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
    }

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
            <button onClick={() => animateAlgorithm()}>
                Visualize Algorithm
            </button>
            <button onClick={() => resetGrid()}>Reset grid</button>
        </main>
    );
}

export default Grid;
