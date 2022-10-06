def selection_sort(the_list):

  for i in range(len(the_list)):

      # Run through the unsorted elements in the input, finding
      # the smallest one.
      smallest_index = i
      for j in range(i + 1, len(the_list)):
          if the_list[j] < the_list[smallest_index]:
              smallest_index = j

      # Move the smallest element to the front of the unsorted portion
      # of the input (swapping with whatever's already there).
      the_list[i], the_list[smallest_index] = the_list[smallest_index], the_list[i]