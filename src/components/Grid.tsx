import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Node from './Node';

interface NodeType {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
}

type GridType = NodeType[][];

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
    };
}

function Grid() {
    const [grid, setGrid] = useState<GridType | []>([]);

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
                            key={index}
                        />
                    ))}
                </Row>
            ))}
        </Container>
    );
}

const Container = styled.main``;

const Row = styled.div`
    display: flex;
`;

export default Grid;
