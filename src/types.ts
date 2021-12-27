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

export interface HeaderProps {
    selectedAlgorithm: string;
    setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>;
    animateAlgorithm(): void;
    resetGrid(): void;
    resetPath(): void;
}

export interface NodeProps {
    row: number;
    column: number;
    isStart: boolean;
    isFinish: boolean;
    onMouseEnter: (row: number, column: number) => void;
    onMouseDown: (row: number, column: number) => void;
    onMouseUp: () => void;

    // Only used for development
    isVisited?: boolean;
    isWall?: boolean;
}
