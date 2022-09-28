from typing import Iterator, Union


class Node:
  def __init__(self, value=None, nxt=None, prev=None):
    self.value = value
    self.nxt = nxt
    self.prev = prev
  
  def __str__(self) -> str:
    return f"{{value:{self.value}}}"

class SinglyLinkedList:
  def __init__(self):
    self.head = Node()
    self.len = 0

  def __len__(self):
    return self.len

  def is_empty(self) -> bool:
    return len(self) == 0

  def connect_in_between(self, prev: Node, middle: Node, nxt: Node):
    prev.nxt = middle
    middle.nxt = nxt

  def traverse(self) -> Iterator[Node]:
    # head is a dummy pointer
    ptr = self.head.nxt

    while ptr is not None:
      yield ptr
      ptr = ptr.nxt
  
  def traverse_right_before(self, index: int) -> Node:
    ptr = self.head

    visit_count = index
    while ptr.nxt is not None and visit_count > 0:
      ptr = ptr.nxt
      visit_count -= 1

    if visit_count != 0:
      raise Exception(f"Index out of bounds: {index}")

    return ptr

  def insert_at(self, index: int, value) -> Node:
    prev = self.traverse_right_before(index)
    middle = Node(value)
    nxt = prev.nxt
    self.connect_in_between(prev, middle, nxt)

    self.len += 1
  
    return middle

  def remove_at(self, index: int) -> Node:
    prev = self.traverse_right_before(index)
    prev_nxt = prev.nxt
    two_nodes_away_node: Union[Node, None] = prev.nxt.nxt
    prev.nxt = two_nodes_away_node

    self.len -= 1
    # assert self.len >= 0

    return prev_nxt

ll = SinglyLinkedList()
def debug():
  for node in ll.traverse():
    print(node, end=" ")
  print("")
  
ll.insert_at(0, 1)
ll.insert_at(0, 2)
ll.insert_at(0, 3)
ll.insert_at(0, 4)
ll.insert_at(0, 5)
ll.insert_at(0, 6)
ll.insert_at(0, 1)
ll.insert_at(0, 3)
ll.insert_at(5, 100)
debug() 
# {value:3} {value:1} {value:6} {value:5} {value:4} {value:100} {value:3} {value:2} {value:1} 
ll.remove_at(5)
debug()
# {value:3} {value:1} {value:6} {value:5} {value:4} {value:3} {value:2} {value:1} 
ll.remove_at(0)
ll.remove_at(0)
ll.remove_at(3)
debug()
# {value:6} {value:5} {value:4} {value:2} {value:1}
ll.remove_at(0)
ll.remove_at(len(ll) - 1)
debug()
# {value:5} {value:4} {value:2} 
ll.insert_at(2, 50)
debug()
# {value:5} {value:4} {value:50} {value:2} 

