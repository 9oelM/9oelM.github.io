---
title: "Review of KMP(Knuth–Morris–Pratt) algorithm"
date: "2022-01-06T09:00:00.009Z"
tags: ["algorithm"]
tab: "post"
---

# Find the shortest palindrome

So I encountered [this problem](https://leetcode.com/problems/shortest-palindrome/) during my study: 'shortest palindrome'. The problem reads:

> You are given a string s. You can convert s to a palindrome by adding characters in front of it. Return the shortest palindrome you can find by performing this transformation.

    Example 1:

    Input: s = "aacecaaa"
    Output: "aaacecaaa"
    Example 2:

    Input: s = "abcd"
    Output: "dcbabcd"
    
    Constraints:

    0 <= s.length <= 5 * 104
    s consists of lowercase English letters only.

I tried to solve this problem with some naive algorithm, and it passed but almost failed on time and space complexity contraints. So I was wondering if there would be a specific algorithm that would solve this problem more efficiently.

The gist of this solution lies in the point that we just need to **_find the longest palindrome substring from the beginning of the substring_**. If we find that palindrome substring, we can just add the reverse of the rest of the string to the front of it to get the shortest palindrome.

For example, `aacecaaa` has the longest palindrome substring `aacecaa`. Therefore, the leftover is `a`, which can be appended to the front of the original string, which yields `aaacecaaa`.

If we don't use the longest palindrome substring, we can see that the answer will not be the shortest. For example, `aacecaaa` also has the palindrome substring `aa` at its beginning. Adding the reverse of the leftover to the beggining of the original string will yield `aaacecaacecaaa`, which is longer than the shortest palindrome we've found above. 

Now, how can we possibly find the longest palindrome substring from the beginning of the substring in an efficient way?

# Inefficient algorithm: bruteforcing

when:
- `n = length of the string to be matched`
- `m = length of the pattern to be matched`

Whenever we are naively doing some pattern matching task, there are inefficient steps that would make the algorithm at most `O(n*m)`. 

For example, let's say that you are looking for every occurence of `abc` in `abceabcii`. This means `n = 3` and `m = 9`.

Then, [the naive approach would be brute forcing](https://replit.com/@9oelM/matching-patterns-bruteforce?v=1) each character with the pattern:

```go
package main

import "fmt"

func brute(s string, pattern string) []int {
	n := len(s)
	m := len(pattern)
	var matchingIndices []int

	for i := range s {
		if i+m > n {
			break
		}
		if s[i:i+m] == pattern {
			matchingIndices = append(matchingIndices, i)
		}
	}

	return matchingIndices
}

func main() {
	cases := []string{
		"abceabciiabc",
	}
	for _, c := range cases {
		fmt.Println(brute(c, "abc"))
	}
}
```

<iframe frameborder="0" width="100%" height="300px" src="https://replit.com/@9oelM/matching-patterns-bruteforce?embed=true"></iframe>

The time complexity will be `O(n*m)` because we are iterating over the string `n` times and each time we are iterating over the pattern `m` times because `s[i:i+m] == pattern` will take at most `O(m)` times to complete, as it is checking string equality.

Anyway, it is easy to spot the inefficiency. Let's take a look at the algorithm step by step. First, we will try to match `abc` with `abc`, `bce` with `abc`, `cea` with `abc`, and then `eab` with `abc` and so on. But what we know for sure is that when you encounter `abc`, you already know that the next two words of length `m` will start with `b` and `c`, which are not the start of the characters we are looking for. So we can safely skip the `b` and `c`, and start fresh at `currentIndex+m`.

Therefore, what's important is how many characters you can safely skip. But exactly how many characters can you skip?

# Longest Proper Prefix which is Suffix (LPS)
To precisely find how many characters can be safely skipped, we need to find the longest proper prefix which is also a suffix. It _does sound weird_, but it is what it exactly reads.
- A proper prefix is any prefix of a word that is not the word itself.
- A suffix is any suffix of a word that is also the word itself.

Let's take the word `MOM` for example:
- Proper prefixes: `''`, `'M'`, `'MO'`
- Suffixes: `''`, `'M'`, `'OM'`, `'MOM'`

Then, we can see that the LPS is `M`.

The algorithm to find LPS is pretty simple. First, we will make an array (also called an auxiliary array) for storing the length of LPS in each unique prefix, like so:

Given a string `ACABACACD`,

1. check `A` is no LPS at all. record 0
1. check `AC` has no LPS at all. record 0
1. check `ACA` has an LPS of length 1 which is `A`. record `1`
1. check `ACAB` has no LPS at all. record 0
1. check `ACABA` has an LPS of length 1 which is `A`. record `1`
1. check `ACABAC` has an LPS of length 2 which is `AC`. record `2`
1. check `ACABACA` has an LPS of length 3 which is `ACA`. record `3`
1. check `ACABACAC` has an LPS of length 2 which is `AC`, record `2`
1. check `ACABACACD` has no LPS at all. record 0

The resulting LPS array should then be:

```
[0, 0, 1, 0, 1, 2, 3, 2, 0]
```

# The KMP algorithm

KMP is a string matching algorithm that runs in `O(n+m)` times, where
- `n = length of the string to be matched`
- `m = length of the pattern to be matched`

This example runs with the following to elaborate the idea of KMP algorithm:
- text: `abcxabcdabxabcdabcdabcy`
- pattern: `abcdabcy`

We realize that three characters (`abc`) match until we get to `text[3]` and `pattern[3]`. 

The aim is to _not go back to the previous indices_ when we find this mismatch. We only want to go forward.

Then we would need to find the LPS inside the `pattern` string right before `pattern[3]`: trivially, we know that `abc` does not have LPS inside itself because all characters are unique. 

This means we can start our next comparison directly from `text[3]` and `pattern[3]`, which are `x` and `a`.

We compare `x` and `a` and they're not a match, so we move to the next character. Forward on, we can see that `text[4:10]`, which is `abcdab`, has a exact match with `pattern[:6]`. But it's not an entire match because `text[10]` and `pattern[6]` don't match, which are `x` and `c`.

Then we look for the LPS again in the substring of the pattern that had a match: `text[4:10]`, which is `abcdab`. Easily we can find that `ab` is an LPS at `pattern[0:2]` and `pattern[4:6]`. Having such an LPS means that the characters before `text[10]`, which is `x`, must be `ab`, trivially. But what this also means is that because `ab` is also a prefix of `abcdab`, we can start our next search from `text[10]` (`x`) and `pattern[2]` (`c`).

Why? The search always consists of trivial character-by-character match, and the aim is to skip the redundant searches. `abcdab` of `abcdabcy` has an LPS as `ab` and the text we were matching has `... abcdabx ...`. This means that by the time we get to `x`, we already know that we don't have to go back to the beginning of the pattern to start the search over, because we have already matched `ab`. Therefore, the next search will start from `x` and `pattern[2]`, which is `c`.

Again, comparing `c` and `x`. Check if `pattern[0:2]` has an LPS: no. Then we start character matching from `x` and `pattern[0]`, all fresh again.

Next up, we see that `... xabcdabcdabcy ...` has a match of `abcdabc` with `pattern[:7]`, but it's not an entire match, leaving `y` in the last index in the pattern unmatched with `d` (`text[18]`). Again, we see if there is an LPS in `abcdabc`. This time, the LPS is `abc`. _This means that the last three characters that were checked for match are also the three characters at the beginning of the match, so we can safely say that we already have matched the last three characters (`abc`) in `... xabcdabcdabc ...` with the three first characters of the pattern (`abc`)._ So we can start pattern matching from the next character: `d` (`text[18]`) and `pattern[4]`, which is also `d`. 

Then finally we find the substring `abcdabcy` at the end of the text with trivial character-by-character comparison.

# Finding the LPS: the efficient way

We know how KMP algorithm works, but we didn't discuss what an efficient way of obtaining an LPS would be when we looked at how to find an LPS. This is how it's done:

```py
def create_lps_array(word):
    lps_array = [0] * len(word)

    # for index 0, it will always be 0
    # so start from index 1
    i = 1
    j = 0
    while i < len(word):
        if word[i] == word[j]:
            j += 1
            lps_array[i] = j
            i += 1
        # this one is a little tricky,
        # when there is a mismatch,
        # we will check the index of previous
        # possible prefix.

				# this is possible because every element in the lps array
				# represents the number of LPS in the substring from 
				# the beginning of the string to the index of the element.
        elif word[i] != word[j] and j != 0:
            # Note that we do not increment i here.
            j = lps_array[j-1]
        else:
            # j = 0, we move to the next letter,
            # there was no any prefix found which 
            # is equal to the suffix for index i
            lps_array[i] = 0
            i += 1

    return lps_array
```

The complexities, where `n` is the length of the string, are as follows:
- Time complexity: `O(n)`
- Space complexity: `O(n)`

# References
- https://binary-baba.medium.com/string-matching-kmp-algorithm-27c182efa387
- https://towardsdatascience.com/pattern-search-with-the-knuth-morris-pratt-kmp-algorithm-8562407dba5b
- https://leetcode.com/problems/shortest-palindrome/solution/
- https://youtu.be/GTJr8OvyEVQ

