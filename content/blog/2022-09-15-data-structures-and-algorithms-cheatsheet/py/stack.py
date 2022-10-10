from typing import TypeVar, Generic, Union

T = TypeVar('T')

class Stack(Generic[T]):
  def __init__(self):
    self.arr = []

  def __len__(self):
    return len(self.arr)

  def pop(self) -> Union[T, None]:
    return self.arr.pop()

  def push(self, item: T) -> None:
    self.arr.append(item)

  def peek(self) -> T:
    if len(self.arr) == 0:
      raise Exception("Length is zero")

    return self.arr[-1]

s = Stack[int]()

s.push(1)

print(len(s))

