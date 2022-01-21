---
title: "Find the shortest palindrome: review of the KMP(Knuth–Morris–Pratt) algorithm"
date: "2022-01-06T09:00:00.009Z"
tags: ["algorithm"]
tab: "post"
---

```toc
# This code block gets replaced with the TOC
```

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

<iframe frameborder="0" width="100%" height="800px" src="https://replit.com/@9oelM/matching-patterns-bruteforce?lite=true"></iframe>

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

1. Create `int` variables `j` and `i` to track indices of an `lps_array` of length `len(word)`
1. Let `j` track the prefix, and let `i` track the suffix of each substring.
1. Let `j` and `i` all start from index `0`. But because index `0` is always not an LPS, just start `i` from index 1.
1. Check if `word[j] == word[i]`. If `true`, `lps_array[i] = j + 1` (which is `the length of matching suffix = the index of previously matching prefix + 1`) and increment `j` and `i` by `1`. Otherwise, increment `i` and reset `j` to `lps_array[j - 1]` (which is `the length of previously matching prefix`). Start this step again.

This Youtube video just kills it, so I've watched it multiple times. I've set it to start from the LPS part.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/GTJr8OvyEVQ?start=495" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

an LPS can be constructed with the following code:

```go
func createLpsArray(word string) []int {
    wordLen := len(word)
    lpsArray := make([]int, wordLen)

    i := 1
    j := 0

    for i < wordLen {
        if word[j] == word[i] {
            lpsArray[i] = j + 1
            j++
            i++
        // has a prefix longer than 0 already, so check backwards again
        // when there is a mismatch,
        // we will check the index of previous
        // possible prefix.
        // this is possible because every element in the lps array
        // represents the number of LPS in the substring from 
        // the beginning of the string to the index of the element.
        } else if word[j] != word[i] && j != 0 {
            j = lpsArray[j - 1]
        // this means word[j] != word[i] && j == 0
        // there has been no prefix found so far for the current index i, 
        // so just move onto the next character to find the match
        } else {
            i++
        }
    }
    return lpsArray
}
```

<iframe frameborder="0" width="100%" height="800px" src="https://replit.com/@9oelM/createLpsArray?lite=true"></iframe>

The complexities, where `m` is the length of the word, are as follows:
- Time complexity: `O(m)`, because the for loop will run `2m` times at its worst and the constant `2` can be removed.
- Space complexity: `O(m)` because `lpsArray` is `[m]int`.

# Summing everything up together for KMP substring search

Problem: given `a b x a b c a b c a b y` (spaces used for convenience), give all starting indices where substring(s) of the text contain the pattern `a b c a b y`.

## Get the LPS array

For the pattern `a b c a b y`:

1. `a` and `b` are not the same, so the array would be
    ```
    [0, 0, 0, 0, 0, 0]
    ```
1. `a` and `c` are not the same, so the array will still be
    ```
    [0, 0, 0, 0, 0, 0]
    ```
1. `a` and `a` are the same. Increment `i` and `j` together by one.
    ```
    [0, 0, 0, 1, 0, 0]
    ```
1. `b` and `b` are the same. Because `lpsArray[i] = lpsArray[j] + 1`, `lpsArray[i] = 1 + 1 = 2`. Increment `i` and `j` together by one.
    ```
    [0, 0, 0, 1, 2, 0]
    ```
1. `c` and `y` are not the same. Then, look backwards (`j = lpsArray[j - 1]`) to see if there is any other prefixes available. `j = lpsArray[j - 1] = 0`. Again, `word[0] = a` and `a != y`. Mark `0` for the last index:
    ```
    [0, 0, 0, 1, 2, 0]
    ```

## Perform the substring search using the KMP algorithm

what we have so far:
```
a b x a b c a b c a b y
a b c a b y
[0, 0, 0, 1, 2, 0]
```

1. index 0: `a` and `a` are the same, so proceed together
1. index 1: `b` and `b` are the same, so proceed together
1. index 2: `x` and `c` are not the same. `lpsArray[2 - 1] == 0`, so there is no prefix found previously. Start fresh again
1. index 3: `a` and `a` are the same, so proceed together
1. index 4: `b` and `b` are the same, so proceed together
1. index 5: `c` and `c` are the same, so proceed together
1. index 6: `a` and `a` are the same, so proceed together
1. index 7: `b` and `b` are the same, so proceed together
1. index 7: `c` and `y` are not the same. But `lpsArray[5 - 1] == 2`, so there is a previously found prefix, of which length is `2`. This means that we already have a match of length 2 right before `c` in the text being searched, which we can now safely ignore. Therefore, start the match from `lpsArray[2]`, which is `c` and `text[8]` which is also `c`.
1. index 8+: just proceed and we find that the pattern is the substring at the end of the text

This process can be written in code as follows:

```go
package main

import (
	"fmt"
)


func createLpsArray(word string) []int {
    wordLen := len(word)
    lpsArray := make([]int, wordLen)

    i := 1
    j := 0

    for i < wordLen {
        if word[j] == word[i] {
            lpsArray[i] = j + 1
            j++
            i++
        // has a prefix longer than 0 already, so check backwards again
        // when there is a mismatch,
        // we will check the index of previous
        // possible prefix.
        // this is possible because every element in the lps array
        // represents the number of LPS in the substring from 
        // the beginning of the string to the index of the element.
        } else if word[j] != word[i] && j != 0 {
            j = lpsArray[j - 1]
        // this means word[j] != word[i] && j == 0
        // there has been no prefix found so far for the current index i, so just move onto the next
        // character to find the match
        } else {
            i++
        }
    }
    return lpsArray
}

func kmp(text string, pattern string) []int {
    matchingIndices := make([]int, 0)
    // always false
    if len(pattern) > len(text) {
      return matchingIndices
    }
    
    lpsArray := createLpsArray(pattern)

    fmt.Println(lpsArray)

    i := 0
    j := 0
    for i < len(text) {
    // uncomment to debug
    // fmt.Printf("i: %v, j: %v, text[i]: %v, pattern[j]: %v\n", i, j, string(text[i]), string(pattern[j]))
      if text[i] == pattern[j] {
        i++
        j++
        if j == len(pattern) {
          // store the index of the text where the pattern starts inside the text
          matchingIndices = append(matchingIndices, i - j)
          j = lpsArray[j - 1]
        }
      } else if text[i] != pattern[j] && j != 0 {
        j = lpsArray[j - 1]
      // same as text[i] != pattern[j] && j == 0
      } else {
        i++
      }
    }

    return matchingIndices
}

func main() {
  cases := [][]string{
    {"abxabcabcaby", "abcaby"},
    {"aaaaaaaaaaabbb", "cc"},
    {"aaaaaccccccaccaaaaaccbbb", "cc"},{"aabxabcabczabybxabcabcabxaabxabcabcabybcabcabxabcabcabyabyaby", "abcaby"},
  }

  for _, c := range(cases) {
	  fmt.Println(kmp(c[0], c[1]))
  }
}
```

<iframe width="100%" height="800px" src="https://replit.com/@9oelM/kmp?lite=true"></iframe>

## Complexities

Given:
- `n = length of the string to be matched`
- `m = length of the pattern to be matched`

**The time complexity** to build the LPS array is `O(m)` as we've seen before, and that to find the substring from the text is `O(n)`. Therefore, adding them up together yields **`O(m + n)`**, which is the time complexity of the KMP substring search.

**The space complexity** for LPS array is `O(m)` because it stores length of an array equivalent to `m`. The KMP search alone has the space complexity of `O(1)` because it does not require any variables other than constants. Therefore, the space complexity is `O(1 + m)` which is **`O(m)`**.

# Back to the original problem: find the shortest palindrome

So let's revisit the problem again:

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

But you revisit the problem description and ponder upon it once more. Do you think you can reword it to something relevant to LPS or KMP search while preserving the same goal?

Yes! If you reword it this way:

> Find the longest palindrome substring that starts from index 0.

Actually, we mentioned this already in a very similar term at the beginning of this post:

> **Find the longest palindrome substring from the beginning of the substring.**

Yes. So let's take the first example for explanation. `aacecaaa` has `aacecaa` as the longest palindrome substring starting from index 0, so we just need to reverse the rest of the string, which happens to be `a`, and prepend it to the string, yielding `aaacecaaa`.

Now, we don't have to use KMP algorithm to solve this problem efficiently, but we are going to use the LPS table. KMP algorithm itself isn't really actually relevant to this problem. Only the LPS table is.

What we really need to do is to build a string like:

```
s + "#" + reverse(s)
```

and just run `createLpsArray()` function which we learned how to create with that string.

## Solving `aacecaaa`

For example, for the string: `aacecaaa`,

1. do `s+some_unique_delimiter+reverse(s)`. `some_unique_delimiter` could be anything that is not in the set of chars specified to be available in the problem, because it will otherwise mix up the LPS table obviously. For this example, we are using a `#`: 
    ```
    aacecaaa#aaacecaa
    ```

1. create an LPS table on that string first:

    ```
    a  a  c  e  c  a  a  a  #  a  a  a  c  e  c  a  a

    [0, 1, 0, 0, 0, 1, 2, 2, 0, 1, 2, 2, 3, 4, 5, 6, 7]
    ```

1. at this step, we can then notice that the `aacecaaa` has the longest palindrome string of length 7 from index 0. In essence, _**the LPS table of the crafted string works as viewing the reflection of the original string, which helps to find the longest palindrome in an efficient way.**_

1. we now know the longest palindrome string is 7 from the index 0. Therefore, the answer has to be:

    ```
    reverse(s[7:]) + s
    ```

    which is

    ```
    a + aacecaaa = aaacecaaa
    ```

## Solving `abcd` (just to give another example for perfection)

1. do `s+some_unique_delimiter+reverse(s)`. again: 
    ```
    abcd#dcba
    ```

1. create an LPS table on that string first:

    ```
     a  b  c  d  #  d  c  b  a

    [0, 0, 0, 0, 0, 0, 0, 0, 1]
    ```

1. the longest palindromic string has the length of 1. Therefore, this will be the answer:
    ```
    reverse(s[1:]) + s
    ```

    which is

    ```
    d c b a + b c d = dcbabcd
    ```

# Solution code

Finally, the solution will look like this:

```go
package main

import "fmt"

func createLpsArray(word string) []int {
    wordLen := len(word)
    lpsArray := make([]int, wordLen)

    i := 1
    j := 0

    for i < wordLen {
        if word[j] == word[i] {
            lpsArray[i] = j + 1
            j++
            i++
        // has a prefix longer than 0 already, so check backwards again
        // when there is a mismatch,
        // we will check the index of previous
        // possible prefix.
        // this is possible because every element in the lps array
        // represents the number of LPS in the substring from 
        // the beginning of the string to the index of the element.
        } else if word[j] != word[i] && j != 0 {
            j = lpsArray[j - 1]
        // this means word[j] != word[i] && j == 0
        // there has been no prefix found so far for the current index i, so just move onto the next
        // character to find the match
        } else {
            i++
        }
    }
    return lpsArray
}

func reverse(s string) string {
    r := []rune(s)
    for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
        r[i], r[j] = r[j], r[i]
    }
    return string(r)
}

func shortestPalindrome(s string) string {
  // s + # + reverse(s)
  //  a a c e c a a a # a a a c e c a a
  // [0 1 0 0 0 1 2 2 0 1 2 2 3 4 5 6 7]
  reversed := reverse(s)
  lpsArray := createLpsArray(s + "#" + reversed)
  fmt.Println(lpsArray)
  longestPalindromeLength := lpsArray[len(lpsArray) - 1]

  // a aacecaaa
  return reverse(s[longestPalindromeLength:]) + s
}

func main() {
  cases := []string{
    "aacecaaa", "abcd",
  }
  for _, c := range(cases) {
    fmt.Println(shortestPalindrome(c))
  }
}
```

<iframe frameborder="0" width="100%" height="800px" src="https://replit.com/@9oelM/shortest-palindrome-with-lps?lite=true"></iframe>

# Conclusion

So that really sums it up. So far we've looked at the mechanics of KMP substring search and its core component: LPS table. Although finding the shortest palindrome is not directly related to KMP substring search algorithm, the LPS table can be borrowed from its underlying idea to solve the problem in an efficient way.

Personally, this one was hard. The algorithm is really just a few lines, but it requires a lot of thought process to get there. But nice job me, I understood how it works. Hope this post helps someone else too.

# More substring search algorithms
This post is about KMP algorithm. But there are also other algorithms that can do substring search as efficiently. Check these out too:

- [Boyer-Moore string-search](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string-search_algorithm)
- [Rabin-Karp substring search](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm)

# Credits
- https://binary-baba.medium.com/string-matching-kmp-algorithm-27c182efa387
- https://towardsdatascience.com/pattern-search-with-the-knuth-morris-pratt-kmp-algorithm-8562407dba5b
- https://leetcode.com/problems/shortest-palindrome/solution/
- https://youtu.be/GTJr8OvyEVQ
- https://leetcode.com/problems/shortest-palindrome/discuss/60113/Clean-KMP-solution-with-super-detailed-explanation
