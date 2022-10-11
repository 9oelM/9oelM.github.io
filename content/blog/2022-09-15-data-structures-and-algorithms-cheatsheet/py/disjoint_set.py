from typing import List


class DisjointSet:
  # assume that 
  # num_nodes is the total number of the nodes
  # edges are the undirected edges between nodes
    def __init__(self, num_nodes: int) -> None:
        # track # nodes connected to the parent
        # at first, all nodes have rank of 1 because they are parents themselves
        self.ranks = [1] * num_nodes
        # init parent. at first, all nodes are parents of themselves
        self.parents = list(range(num_nodes))

    def union(self, src: int, dst: int) -> bool:
        """
        src and dst nodes must be connected nodes, probably represented by an adjacency list
        """
        src_parent = self.find_parent_iterative(src)
        dst_parent = self.find_parent_iterative(dst)

        # they already have the same parents. Don't unify them
        if src_parent == dst_parent:
            return False

        # decide which node is going to be the parent
        # the one that has a higher rank is going to be the parent
        if self.ranks[dst_parent] >= self.ranks[src_parent]:
            self.parents[src_parent] = dst_parent
            self.ranks[dst_parent] += self.ranks[src_parent]
        else:
            self.parents[dst_parent] = src_parent
            self.ranks[src_parent] += self.ranks[dst_parent]

        return True
    
    def find_parent(self, node: int) -> int:
        """
        find the parent until you find the 'root' parent of sets
        the root parent has its parent as itself, so the recursion
        must stop here
        """
        if self.parents[node] == node:
            return node
        self.parents[node] = self.find_parent(self.parents[node])
        return self.parents[node]

    def find_parent_iterative(self, node: int) -> int:
        """
        iterative version of find_parent (use this when recursion depth is likely to exceed)
        again, don't stop until we find the 'root' parent in the set
        """
        while self.parents[node] != node:
            self.parents[node] = self.parents[self.parents[node]]
            node = self.parents[node]
        return self.parents[node]

djs = DisjointSet(8)
edges = [[0,1],[1,0],[1,2],[2,1],[6,5],[6,7],[2,7],[3,4]]
for e in edges:
  djs.union(e[0], e[1])
print(set(djs.find_parent(x) for x in range(8))) # {4, 5}. This means there are two disjoint sets in total, respectively having 4 and 5 as their parents
print(djs.parents) # [1, 5, 1, 4, 4, 5, 5, 5] (only care about index 4 & 5)
print(djs.ranks) # [1, 3, 1, 1, 2, 6, 1, 1] (only care about index 4 & 5)
