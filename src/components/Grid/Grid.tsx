import React from 'react';
import './Grid.css';
import { GridProps } from '../../types';

function Grid({ children }: GridProps) {
    return <main>{children}</main>;
}

export default Grid;
