import React from 'react';
import './Grid.css';

interface GridProps {
    children: any;
}

function Grid({ children }: GridProps) {
    return <main>{children}</main>;
}

export default Grid;
