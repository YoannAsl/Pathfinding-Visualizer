import React from 'react';
import './Grid.css';
import { GridProps } from '../../types';

const Grid = ({ children }: GridProps) => {
    return <main>{children}</main>;
};

export default Grid;
