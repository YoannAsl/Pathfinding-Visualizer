import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Node from './Node';
import dijkstra from '../algorithms/dijkstra';

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

    // function visitNode(row: number, column: number) {
    //     const copiedGrid = [...grid];
    //     const node = copiedGrid[row][column];
    //     node.isVisited = !node.isVisited;
    //     setGrid(copiedGrid);
    // }

    return (
        <Container>
            {grid.map((row, index) => (
                <Row key={index}>
                    {row.map((node, index) => (
                        <Node
                            row={node.row}
                            column={node.column}
                            isStart={node.isStart}
                            isFinish={node.isFinish}
                            isVisited={node.isVisited}
                            // visitNode={visitNode}
                            distance={node.distance}
                            key={index}
                        />
                    ))}
                </Row>
            ))}
            <button
                onClick={() =>
                    dijkstra(
                        grid,
                        grid[START_NODE_ROW][START_NODE_COLUMN],
                        grid[FINISH_NODE_ROW][FINISH_NODE_COLUMN]
                    )
                }
            >
                Visualize Algorithm
            </button>
        </Container>
    );
}

const Container = styled.main``;

const Row = styled.div`
    display: flex;
`;

export default Grid;
