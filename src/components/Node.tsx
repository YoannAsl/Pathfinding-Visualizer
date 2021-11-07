import React from 'react';
import styled from 'styled-components';

export interface NodeProps {
    row: number;
    column: number;
}

function Node({ row, column }: NodeProps) {
    return <Container />;
}

const Container = styled.div`
    height: 20px;
    width: 20px;
    border: 1px solid black;
`;

export default Node;
