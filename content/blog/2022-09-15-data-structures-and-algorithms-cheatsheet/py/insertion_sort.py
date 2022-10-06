def insertion_sort(the_list):

  # For each item in the input list
  for index in range(len(the_list)):

      # Shift it to the left until it's in the right spot
      while index > 0 and the_list[index - 1] >= the_list[index]:
          the_list[index], the_list[index - 1] =\
              the_list[index - 1], the_list[index]
          index -= 1