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
    height: 25px;
    width: 25px;
    border: 1px solid black;
    box-sizing: border-box;
    margin: 0 -1px -1px 0;
`;

export default Node;
