import { GridType, NodeType } from '../types';

export function astar(
    grid: GridType,
    startNode: NodeType,
    finishNode: NodeType
) {
    const newGrid = [...grid];
    const unvisitedNodes = getAllNodes(grid);
    const visitedNodes: (NodeType | undefined)[] = [];

    while (unvisitedNodes.length > 0) {
        unvisitedNodes.sort((a, b) => a.fScore - b.fScore);

        const closestNode = unvisitedNodes.shift();
        if (closestNode!.isWall) continue;

        if (closestNode!.fScore === Infinity) return { visitedNodes, newGrid };

        newGrid[closestNode!.row][closestNode!.column].isVisited = true;
        closestNode!.isVisited = true;

        visitedNodes.push(closestNode);

        if (closestNode === finishNode) return { visitedNodes, newGrid };
        updateNeighbourDistance(closestNode!, newGrid, startNode, finishNode);
    }
}

function manhattanEuristic(node: NodeType, finishNode: NodeType) {
    const dx = Math.abs(node.column - finishNode.column);
    const dy = Math.abs(node.row - finishNode.row);
    return dx + dy;
}

function updateNeighbourDistance(
    node: NodeType,
    grid: GridType,
    startNode: NodeType,
    finishNode: NodeType
) {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of unvisitedNeighbours) {
        const distanceToStart =
            Math.abs(neighbour.row - startNode.row) +
            Math.abs(neighbour.column - startNode.column);
        const distanceToFinish = manhattanEuristic(neighbour, finishNode);

        neighbour.gScore = distanceToStart;
        neighbour.hScore = distanceToFinish;
        neighbour.fScore = distanceToStart + distanceToFinish;

        neighbour.previousNode = node;
    }
}

function getUnvisitedNeighbours(node: NodeType, grid: GridType) {
    const neighbours = [];
    const { row, column } = node;

    if (row < grid.length - 1) neighbours.push(grid[row + 1][column]);
    if (row > 0) neighbours.push(grid[row - 1][column]);
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    if (column > 0) neighbours.push(grid[row][column - 1]);

    return neighbours.filter((neighbour) => !neighbour.isVisited);
}

function getAllNodes(grid: GridType) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getShortestPath(finishNode: NodeType) {
    let node = finishNode;
    const shortestPath = [];
    while (node.previousNode !== null) {
        shortestPath.push(node);
        node = node.previousNode;
    }
    return shortestPath;
}
