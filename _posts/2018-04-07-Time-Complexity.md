---
layout: post
title: "Time Complexity"
date: 2018-04-07 09:00:00 -0100
categories: knowledge
---
## What is it?
According to [Codilty.com](codility.com):

> COMPLEXITY CAN BE VIEWED AS THE MAXIMUM NUMBER OF PRIMITIVE OPERATIONS THAT A PROGRAM MAY EXECUTE. REGULAR OPERATIONS ARE SINGLE ADDITIONS, MULTIPLICATIONS, ASSIGNMENTS ETC. WE MAY LEAVE SOME OPERATIONS UNCOUNTED AND CONCENTRATE ON THOSE THAT ARE PERFORMED THE LARGEST NUMBER OF TIMES. SUCH OPERATIONS ARE REFERRED TO AS DOMINANT.

## Why care?
Well, some nice answer from Quora.com? Basically, it's saying, as processing power of computers gets larger, so do the problems:

> SUPPOSE YOU BUILD A PROGRAM THAT HAS A TIME COMPLEXITY OF O(N^2), SAY, A BUBBLESORT. YOU USE BUBBLE SORT BECAUSE IT HAPPENS TO RUN FAST ENOUGH, AND YOU THINK, WELL, OVER TIME COMPUTERS GET FASTER ANYWAY SO IT WON'T MATTER IN THE FUTURE.

> NOW TIME PASSES. COMPUTERS GET 1000 TIMES FASTER, MEMORY GETS 1000 TIMES BIGGER, AND SO PROBLEMS GET 1000 TIMES BIGGER. WHEN YOU TRY TO STUFF A MODERN SIZED PROBLEM INTO YOUR OLD PROGRAM, IT SUDDENLY RUNS 1000 TIMES SLOWER THAN IT DID BACK IN THE DAY!

> THAT'S ONE REASON WHY WORRYING ABOUT COMPLEXITY IS IMPORTANT (THERE ARE OTHERS). AS COMPUTERS SCALE UP IN SPEED, THE PROBLEMS SCALE UP IN SIZE.

And a similar line of answer from [nick's blog](http://callmenick.com/post/time-complexity-analysis-why-its-important):

> AS A FRONT-END DEVELOPER WORKING ON SMALLER PROJECTS, COMPUTER SCIENCE TOPICS LIKE TIME COMPLEXITY ANALYSIS MAY NEVER ENTER YOUR FRAME AT ALL. BUT AS THE SIZE, SCOPE, AND SCALE OF A PROJECT CHANGES AND GROWS, IT MUST.

> ....

> AS I MENTIONED BEFORE, TIME COMPLEXITY BECOMES AN EXTREMELY IMPORTANT ISSUE WHEN THE SCALE OF AN APPLICATION GROWS.

## How do you calculate it?
We focus more on the magnitude of a complexity, rather than the constants. Codility.com gives a nice example to explain this:

```python
DEF DOMINANT(N): 
    RESULT = 0
    FOR I IN XRANGE(N):
        RESULT += 1
    RETURN RESULT 
```

> THE OPERATION IN LINE 4 IS DOMINANT AND WILL BE EXECUTED N TIMES. THE COMPLEXITY IS DESCRIBED IN BIG-O NOTATION: IN THIS CASE O(N) — LINEAR COMPLEXITY. 

> THE COMPLEXITY SPECIFIES THE ORDER OF MAGNITUDE WITHIN WHICH THE PROGRAM WILL PERFORMITS OPERATIONS. MORE PRECISELY, IN THE CASE OF O(N), THE PROGRAM MAY PERFORM C · N OPERA-TIONS, WHERE C IS A CONSTANT; HOWEVER, IT MAY NOT PERFORM N2 OPERATIONS, SINCE THIS INVOLVESA DI ERENT ORDER OF MAGNITUDE OF DATA. 

> IN OTHER WORDS, WHEN CALCULATING THE COMPLEXITY WE OMIT CONSTANTS: I.E. REGARDLESS OF WHETHER THE LOOP IS EXECUTED 20 · N TIMES OR N TIMES, WE STILL 5 HAVE A COMPLEXITY OF O(N), EVEN THOUGH THE RUNNING TIME OF THE PROGRAM MAY VARY. 
Codility.com explained it quite clearly and concisely so I don't really have anything to add onto this. But what about more complicated operations? First of all,

```
Statement;
```

is clearly independent of the input N. It will run only a set number of times regardless of what N is. Time complexity: `O(1)`.

```python
FOR ( I = 0; I < N; I++ ) 
  STATEMENT;
```

This for loop is directly proportional to N. For example, when `N = N * 2`, `running time = running time * 2`. Time complexity:O(N)

```python
FOR ( I = 0; I < N; I++ )      // RUN N TIMES HERE
 FOR ( J = 0; J < N; J++ )   // RUN N TIMES HERE FOR EACH I
     STATEMENT;            // (WHICH ESSENTIALLY SUMS UP TO N*N AT THE END)
```

This nested loop structure is quadratic in relation to N. When N doubles, the running time increases by `N^2`. Time complexity:  `O(N^c)`, where `c = # loops`. In the example here, c = 2)

```python
FOR (INT I = 1; I <=N; I *= C) {       
  // SOME O(1) EXPRESSIONS   
}   
FOR (INT I = N; I > 0; I /= C) {       
  // SOME O(1) EXPRESSIONS   
}
```
Time Complexity of a loop is considered as `O(Log(n))` if the loop variables is divided / multiplied by a constant amount. Note that the base of log does not matter, because it only refers to different scales, not different magnitudes.

## Links for help
* http://bigocheatsheet.com
* https://stackoverflow.com/questions/11032015/how-to-find-time-complexity-of-an-algorithm
* http://www.geeksforgeeks.org/analysis-of-algorithms-set-4-analysis-of-loops/
* http://discrete.gr/complexity/
* https://www.quora.com/Why-we-care-for-time-n-space-complexity-even-if-we-have super-fast-processors-today
* http://callmenick.com/post/time-complexity-analysis-why-its-important