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
        src_parent = self.find_parent(src)
        dst_parent = self.find_parent(dst)

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

    def find_parent(self, disj_set: int) -> int:
        if self.parents[disj_set] == disj_set:
            return disj_set
        self.parents[disj_set] = self.find_parent(self.parents[disj_set])
        return self.parents[disj_set]

djs = DisjointSet(8)
edges = [[0,1],[1,0],[1,2],[2,1],[6,5],[6,7],[2,7],[3,4]]
for e in edges:
  djs.union(e[0], e[1])
print(set(djs.find_parent(x) for x in range(8))) # {4, 5}
print(djs.parents) # [1, 5, 1, 4, 4, 5, 5, 5] (only care about index 4 & 5)
print(djs.ranks) # [1, 3, 1, 1, 2, 6, 1, 1] (only care about index 4 & 5)

# def union_find(n: int, edges: List[List[int]]):
#   # init parent. at first, all nodes are parents of themselves
#   parent: List[int] = [i for i in range(n)]
#   # track # nodes connected to the parent
#   # at first, all nodes have rank of 1 because they are parents themselves
#   rank: List[int] = [1] * n

#   def find_union(node: int):
#     result = node
#     print(node, parent[result])
#     # loop until the node itself is its own parent
#     while node != parent[result]:
#       # path compression
#       # optimize the path
#       # if no grandparent, this line does nothing
#       # parent[result] = parent[parent[result]]
#       result = parent[result]
#     return result

#   def union(a, b) -> int:
#     # remember, on the first run,
#     # parent1 and parent2 are obviously going to be different
#     # because every node is a parent of itself
#     parent1, parent2 = find_union(a), find_union(b)

#     # if parents are the same already, don't do any union
#     if parent1 == parent2:
#       return 0

#     # decide which node is going to be the parent
#     # for the current logic, the one that has higher
#     # rank is going to be the parent
#     if rank[parent2] > rank[parent1]:
#       parent[parent1] = parent2
#       # merge the entire set that the node belonged to
#       rank[parent2] += rank[parent1]
#     else:
#       parent[parent2] = parent1
#       # merge the entire set that the node belonged to
#       rank[parent1] += rank[parent2]

#     return 1

#   for e in edges:
#     union(e[0], e[1])
  
#   print(parent)
#   print(rank)

# union_find(8, edges)