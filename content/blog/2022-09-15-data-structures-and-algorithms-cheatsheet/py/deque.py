from typing import Generic, TypeVar
from doubly_linked_list import DoublyLinkedList, debug

T = TypeVar("T")

class Deque(Generic[T]):
  def __init__(self):
    self.dll = DoublyLinkedList()

  def is_empty(self):
    return len(self.dll) == 0

  def append(self, value: T):
    self.dll.insert_at(len(self.dll), value)

  def prepend(self, value: T):
    self.dll.insert_at(0, value)

  def pop(self) -> T:
    return self.dll.remove_at(len(self.dll) - 1)

  def popleft(self) -> T:
    return self.dll.remove_at(0)

q = Deque[int]()

deque = Deque()

deque.prepend(1)
deque.prepend(2)
deque.prepend(3)
deque.prepend(4)
debug(deque.dll) # 1

deque.append(5)
deque.append(6)
debug(deque.dll) # [4,3,2,1,5,6]

deque.popleft() # 4
deque.pop() # 6
debug(deque.dll) # [3,2,1,5]