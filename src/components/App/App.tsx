import React, { useEffect, useState } from 'react';
import './App.css';
import dijkstra, { getShortestPath } from '../../algorithms/dijkstra';
import astar from '../../algorithms/a-star';
import Header from '../Header/Header';
import Grid from '../Grid/Grid';
import Node from '../Node/Node';
import { NodeType, GridType } from '../../types';

const START_NODE_ROW = 8;
const START_NODE_COLUMN = 5;
const FINISH_NODE_ROW = 16;
const FINISH_NODE_COLUMN = 39;

function createNode(row: number, column: number) {
    const isStart = row === START_NODE_ROW && column === START_NODE_COLUMN;
    const isFinish = row === FINISH_NODE_ROW && column === FINISH_NODE_COLUMN;

    return {
        row,
        column,
        isStart,
        isFinish,
        isVisited: false,
        isWall: false,
        previousNode: null,

        // for dijkstra algorithm
        distance: isStart ? 0 : Infinity,

        // for a* algorithm
        gScore: isStart ? 0 : Infinity,
        hScore: 0,
        fScore: isStart ? 0 : Infinity,
    };
}

function getNewGrid() {
    const newGrid = [];
    for (let row = 0; row < 25; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            const currentNode = createNode(row, col);
            currentRow.push(currentNode);
        }
        newGrid.push(currentRow);
    }
    return newGrid;
}

const App = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
    const [grid, setGrid] = useState<GridType>([]);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const newGridAfterWalls = [...grid];

    useEffect(() => {
        setGrid(getNewGrid());
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
                `node-${node!.row}-${node!.column}`
            )!.className = node.isWall ? 'node wall' : 'node';
        }
        newGridAfterWalls[row][column] = node;
    }

    function animateAlgorithm() {
        let visitedNodes: (NodeType | undefined)[] | undefined;
        let animationDelay: number;
        let newGrid: GridType;

        switch (selectedAlgorithm) {
            case 'dijkstra':
                const dijkstraResults = dijkstra(
                    grid,
                    grid[FINISH_NODE_ROW][FINISH_NODE_COLUMN]
                );
                visitedNodes = dijkstraResults!.visitedNodes;
                newGrid = dijkstraResults!.newGrid;
                animationDelay = 10;
                setGrid(newGrid);
                break;
            case 'astar':
                const astarResults = astar(
                    grid,
                    grid[START_NODE_ROW][START_NODE_COLUMN],
                    grid[FINISH_NODE_ROW][FINISH_NODE_COLUMN]
                );
                visitedNodes = astarResults!.visitedNodes;
                newGrid = astarResults!.newGrid;
                animationDelay = 25;
                setGrid(newGrid);
                break;
        }

        for (let i = 0; i <= visitedNodes!.length; i++) {
            // If we're at the last node, animate the shortest path
            if (i === visitedNodes!.length) {
                setTimeout(() => {
                    animateShortest();
                }, animationDelay! * i);
                return;
            }
            // Animate the visited nodes
            setTimeout(() => {
                const node = visitedNodes![i];
                if (!node!.isStart && !node!.isFinish) {
                    // This is not great, I am looking for another way
                    document.getElementById(
                        `node-${node!.row}-${node!.column}`
                    )!.className = 'node visited';
                }
            }, animationDelay! * i);
        }
    }

    function animateShortest() {
        // We reverse to animate the path from start node to the finish node
        const shortestPath = getShortestPath(
            grid[FINISH_NODE_ROW][FINISH_NODE_COLUMN]
        ).reverse();

        for (let i = 0; i < shortestPath!.length; i++) {
            setTimeout(() => {
                const node = shortestPath![i];
                if (!node!.isStart && !node!.isFinish) {
                    // This is not great, I am looking for another way
                    document.getElementById(
                        `node-${node!.row}-${node!.column}`
                    )!.className = 'node shortest';
                }
            }, 25 * i);
        }
    }

    function resetGrid() {
        for (const row of grid) {
            for (const node of row) {
                const nodeElement = document.getElementById(
                    `node-${node!.row}-${node!.column}`
                );

                nodeElement!.className = 'node';

                if (node.isStart) nodeElement!.className = 'node start';
                if (node.isFinish) nodeElement!.className = 'node finish';
            }
        }
        setGrid(getNewGrid());
    }

    function resetPath() {
        const newGrid = getNewGrid();

        for (const row of grid) {
            for (const node of row) {
                const nodeElement = document.getElementById(
                    `node-${node!.row}-${node!.column}`
                );

                if (!node.isWall) nodeElement!.className = 'node';
                if (node.isStart) nodeElement!.className = 'node start';
                if (node.isFinish) nodeElement!.className = 'node finish';
                if (node.isWall) newGrid[node.row][node.column].isWall = true;
            }
        }
        setGrid(newGrid);
    }

    return (
        <div className='App'>
            <Header
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                animateAlgorithm={animateAlgorithm}
                resetGrid={resetGrid}
                resetPath={resetPath}
            />
            <Grid>
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
            </Grid>
        </div>
    );
};

export default App;
