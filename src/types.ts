export interface NodeType {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    isVisited: boolean;
    isWall: boolean;
    distance: number;
    previousNode: NodeType | null;
    gScore: number;
    hScore: number;
    fScore: number;
}

export type GridType = NodeType[][];

export interface GridProps {
    children: React.ReactNode;
}
