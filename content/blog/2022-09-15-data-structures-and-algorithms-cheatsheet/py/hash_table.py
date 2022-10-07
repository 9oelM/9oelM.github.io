def set_nth_bit(num: int, n: int) -> int
  """
  perform AND between the nth bit and the number with only nth bit set as 1 and others as 0
  """
  mask = ~(1 << i)
  return num & mask

