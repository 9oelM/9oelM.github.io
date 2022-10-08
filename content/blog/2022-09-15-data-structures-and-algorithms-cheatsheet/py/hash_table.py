def clear_nth_bit(num: int, n: int) -> int:
  """
  perform AND between the nth bit and the number with only nth bit set as 1 and others as 0
  """
  mask = ~(1 << n)
  return num & mask

# 103 99 99
print(0b01100111, 0b01100011, clear_nth_bit(0b01100111, 2))