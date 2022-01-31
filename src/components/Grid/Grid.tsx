import React from 'react';
import './Grid.css';
import { GridProps } from '../../types';

export function Grid({ children }: GridProps) {
    return <main>{children}</main>;
}
