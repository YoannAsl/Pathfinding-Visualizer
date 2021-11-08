import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Node from './Node';

type GridType = NodeProps[][];

function createNode(row: number, column: number) {
    return {
        row,
        column,
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
                        <Node row={node.row} column={node.column} key={index} />
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
