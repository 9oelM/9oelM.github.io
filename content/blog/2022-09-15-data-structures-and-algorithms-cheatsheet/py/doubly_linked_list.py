from typing import Iterator, Union


class Node:
  def __init__(self, value=None, nxt=None, prev=None):
    self.value = value
    self.nxt = nxt
    self.prev = prev
  
  def __str__(self) -> str:
    return f"{{value:{self.value}}}"

class DoublyLinkedList:
  def __init__(self):
    self.head = Node()
    self.tail = Node()
    self.head.nxt = self.tail
    self.tail.prev = self.head
    self.length = 0

  def __len__(self) -> int:
    return self.length

  def traverse(self) -> Iterator[Node]:
    ptr = self.head
    while ptr:
      if ptr == self.head or ptr == self.tail:
        ptr = ptr.nxt
      else:
        yield ptr
        ptr = ptr.nxt

  def traverse_from_right(self) -> Iterator[Node]:
    ptr = self.tail
    while ptr:
      if ptr == self.head or ptr == self.tail:
        ptr = ptr.prev
      else:
        yield ptr
        ptr = ptr.prev

  def connect_in_between(self, prev: Node, middle: Node, nxt: Node):
    prev.nxt = middle
    middle.prev = prev

    middle.nxt = nxt
    nxt.prev = middle

  def traverse_up_to(self, index: int):
    if len(self) < index:
      raise Exception(f"Index out of bounds at {index}")

    ptr = self.head
    
    visit_count = index
    
    while ptr.nxt is not None and visit_count > 0:
      ptr = ptr.nxt
      visit_count -= 1
    
    # should never get here, but just an exhaustive check
    if visit_count != 0:
      raise Exception(f"Index out of bounds at {index}")

    return ptr

  def insert_at(self, index: int, value):
    prev = self.traverse_up_to(index)

    nxt = prev.nxt
    middle = Node(value)
    self.connect_in_between(prev, middle, nxt)
    self.length += 1

  def at(self, index: int) -> Union[Node, None]:
    if len(self) <= index:
      raise Exception(f"Index out of bounds at {index}")

    prev = self.traverse_up_to(index)
    if prev.nxt == self.tail:
      return None
    return prev.nxt

  def remove_at(self, index: int):
    prev = self.traverse_up_to(index)
    prev_nxt = prev.nxt
    two_nodes_away_node = prev.nxt.nxt

    prev.nxt = two_nodes_away_node
    two_nodes_away_node.prev = prev
    self.length -= 1
    return prev_nxt.value

def debug(dll: DoublyLinkedList):
  for node in dll.traverse():
    print(node, end="")
  print("")
  for node in dll.traverse_from_right():
    print(node, end="")
  print("")
  print("--")

# doubly_linked_list = DoublyLinkedList()
# doubly_linked_list.insert_at(0, 0)
# doubly_linked_list.insert_at(0, 1)
# doubly_linked_list.insert_at(0, 2)
# doubly_linked_list.insert_at(0, 3)
# doubly_linked_list.insert_at(4, 100)
# debug(doubly_linked_list)
# doubly_linked_list.remove_at(0)
# doubly_linked_list.remove_at(3)
# doubly_linked_list.remove_at(1)
# debug(doubly_linked_list)