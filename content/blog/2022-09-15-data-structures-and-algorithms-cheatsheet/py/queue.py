from typing import Generic, TypeVar
from doubly_linked_list import DoublyLinkedList

T = TypeVar("T")

class Queue(Generic[T]):
  def __init__(self):
    self.dll = DoublyLinkedList()

  def is_empty(self):
    return len(self.dll) == 0

  def prepend(self, value: T):
    self.dll.insert_at(0, value)

  def pop(self) -> T:
    return self.dll.remove_at(len(self.dll) - 1)

q = Queue[int]()

print(q.is_empty())
q.prepend(1)
print(q.pop()) # 1
q.prepend(2) # 2 1
q.prepend(3) # 3 2 1
print(q.pop())
q.prepend(4) # 4 3 2 1
print(q.is_empty()) # false
print(q.pop()) # 1
print(q.pop()) # 2
print(q.is_empty())