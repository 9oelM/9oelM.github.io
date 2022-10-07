import copy
import heapq
from heap_mine import MinHeap

my_heap = MinHeap()

def compare_and_check(a, b):
  if a != b:
    raise Exception(f"not same: {a} and {b}")

def test():
  for arr in [
    [9,8,7,6,5,4,3,214,124,51,516,7,48,8,345869,8,16,6176,16,78,71],
    [1],
    [2,1],
    [1,1],
    [1,2],
    [1,2,3],
    [3,2,1,2,3,4],
    [3,2,1,2,3,4,-1,-100,15,161,16666,1,-555,-1],
    [1],
    [-1],
    [5,3,4,2,3,6],
    [-1,-2,-3,-4,-5,-10,-15,1,2,4,7,9,1,3,2,1,2,3,4,-1,-100,15,161,16666,1,-555,-1]
  ]:
    test_arr = copy.deepcopy(arr)
    my_heap.heapify(test_arr)
    heapq.heapify(arr)

    compare_and_check(arr, test_arr)
    
    for num in [0, 100, 500, -5, -100,15,16,734,1651,617,89,9,1612738,3789]:
      my_heap.push(test_arr, num)
      heapq.heappush(arr, num)
      compare_and_check(arr, test_arr)
    for _ in range(10):
      a = heapq.heappop(arr)
      b = my_heap.pop(test_arr)
      compare_and_check(a, b)
      compare_and_check(arr, test_arr)

  print("Pass")
test()
