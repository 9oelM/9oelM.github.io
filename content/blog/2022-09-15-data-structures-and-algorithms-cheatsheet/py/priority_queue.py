from typing import Generic, Tuple, TypeVar, Union
import heapq

T = TypeVar('T')

class PriorityQueue(Generic[T]):
  def __init__(self):
    self.heap = []
  
  def put(self, item: T):
    heapq.heappush(self.heap, item)
  
  def get(self) -> Union[T, None]:
    if not self.heap:
      raise Exception("No elements in the heap")

    return heapq.heappop(self.heap)

  def __len__(self) -> None:
    return len(self.heap)

  def __bool__(self) -> bool:
    return len(self.heap) != 0
pq = PriorityQueue[Tuple[int, str]]()

pq.put((1, "one"))
pq.put((5, "five"))
pq.put((2, "two"))
pq.put((10, "ten"))

while pq:
  # (1, 'one')
  # (2, 'two')
  # (5, 'five')
  # (10, 'ten')
  print(pq.get())