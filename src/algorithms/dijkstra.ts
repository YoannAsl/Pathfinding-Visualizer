import { GridType, NodeType } from '../types';

function dijkstra(grid: GridType, finishNode: NodeType) {
    const unvisitedNodes = getAllNodes(grid);
    const visitedNodes = [];
    const newGrid = [...grid];

    while (unvisitedNodes.length > 0) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);

        const closestNode = unvisitedNodes.shift();
        if (closestNode!.isWall) continue;

        if (closestNode!.distance === Infinity)
            return { visitedNodes, newGrid };

        newGrid[closestNode!.row][closestNode!.column].isVisited = true;
        closestNode!.isVisited = true;
        visitedNodes.push(closestNode);

        if (closestNode === finishNode) return { visitedNodes, newGrid };
        updateNeighbourDistance(closestNode!, newGrid);
    }
}

function updateNeighbourDistance(node: NodeType, grid: GridType) {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of unvisitedNeighbours) {
        neighbour.distance = node.distance + 1;
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

export default dijkstra;
