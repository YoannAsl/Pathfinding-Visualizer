import { GridType, NodeType } from '../components/Grid';

function dijkstra(grid: GridType, startNode: NodeType, finishNode: NodeType) {
    const unvisitedNodes = getAllNodes(grid);
    const visitedNodes = [];

    while (unvisitedNodes.length > 0) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        const currentNode = unvisitedNodes.shift();
        currentNode!.isVisited = true;
        // console.log(unvisitedNodes);

        updateNeighbourDistance(currentNode!, grid);
    }
}

function updateNeighbourDistance(node: NodeType, grid: GridType) {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of unvisitedNeighbours) {
        // console.log(neighbour);
        neighbour.distance = node.distance + 1;
    }
}

function getUnvisitedNeighbours(node: NodeType, grid: GridType) {
    const neighbours: NodeType[] = [];
    const { row, column } = node;

    if (row < grid.length - 1) neighbours.push(grid[row + 1][column]);
    if (row > 0) neighbours.push(grid[row - 1][column]);
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    if (column > 0) neighbours.push(grid[row][column - 1]);

    // console.log(neighbours.filter((neighbour) => !neighbour.isVisited));
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

export default dijkstra;
