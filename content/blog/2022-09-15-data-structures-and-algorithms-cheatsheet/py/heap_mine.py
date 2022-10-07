from typing import Generic, List, TypeVar
import math
T = TypeVar('T')

class MinHeap(Generic[T]):
  def __init__(self):
    pass

  def parent_index(self, index: int) -> int:
    return (index - 1) // 2

  def left_child_index(self, index: int) -> int:
    return index * 2 + 1
  
  def right_child_index(self, index: int) -> int:
    return index * 2 + 2

  def is_index_valid(self, index: int, arr: List[T]) -> bool:
    return 0 <= index <= len(arr) - 1

  def bubble_down(self, parent_index: int, arr: List[T]) -> None:
    while self.is_index_valid(parent_index, arr):
      left = self.left_child_index(parent_index)
      right = self.right_child_index(parent_index)

      # find the smaller one between left and right (it may not exist)
      smaller_child_index = None
      if self.is_index_valid(left, arr) and arr[left] < arr[parent_index]:
        smaller_child_index = left
      if self.is_index_valid(right, arr) and arr[right] < arr[parent_index] and arr[right] <= arr[left]:
        smaller_child_index = right

      if smaller_child_index is not None:
        arr[smaller_child_index], arr[parent_index] = arr[parent_index], arr[smaller_child_index]
        # keep bubbling down
        parent_index = smaller_child_index
      else:
        break

  def bubble_up(self, child_index: int, arr: List[T]) -> None:
      while self.is_index_valid(child_index, arr):
        parent_index = self.parent_index(child_index)
        # if child_index == 0
        if not self.is_index_valid(parent_index, arr):
          break
        if arr[child_index] < arr[parent_index]:
          arr[child_index], arr[parent_index] = arr[parent_index], arr[child_index]
          child_index = parent_index
        else:
          break

  def peek(self, arr: List[T]) -> T:
    return arr[0]

  def push(self, arr: List[T], new_elem: T) -> List[T]:
    arr.append(new_elem)
    self.bubble_up(len(arr) - 1, arr)

    return arr

  def pop(self, arr: List[T]) -> T:
    smallest = arr[0]
    last = arr.pop()
    if last is not smallest:
      arr[0] = last
      self.bubble_down(0, arr)

    return smallest

  def heapify(self, arr: List[T]) -> None:
    # last level leaves don't need to be bubbled down
    for i in range(len(arr) // 2, -1, -1):
      self.bubble_down(i, arr)

# heap = MinHeap()
# arr = [3,2,1]
# heap.heapify(arr)
# print(arr)