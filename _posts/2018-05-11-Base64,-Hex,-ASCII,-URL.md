---
layout: post
title: "Base64, Hex, ASCII, URL"
date: 2018-05-11 09:00:00 -0100
categories: hacking
---


## Base64

### Sources
* [lifewire](https://www.lifewire.com/base64-encoding-overview-1166412)
* [mozilla](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)
* [oracle](https://blogs.oracle.com/rammenon/base64-explained)
* [base64 helper](https://www.base64encode.org/)

### Definition
> "Base64 is a group of similar binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation."

### Conversion table (value to encoding char)
```
0	A	16	Q	32	g	48	w
1	B	17	R	33	h	49	x
2	C	18	S	34	i	50	y
3	D	19	T	35	j	51	z
4	E	20	U	36	k	52	0
5	F	21	V	37	l	53	1
6	G	22	W	38	m	54	2
7	H	23	X	39	n	55	3
8	I	24	Y	40	o	56	4
9	J	25	Z	41	p	57	5
10	K	26	a	42	q	58	6
11	L	27	b	43	r	59	7
12	M	28	c	44	s	60	8
13	N	29	d	45	t	61	9
14	O	30	e	46	u	62	+
15	P	31	f	47	v	63	/
                        padding =
```

### Relation to ASCII
> The following is the character subset of US-ASCII that is used for Base64.

```
[a-z] – 26 characters           
[A-Z] – 26 characters         
[0-9] – 10 characters          
[+]  - 1 character [filler character]
[/]   - 1 character [filler character]
[=]  - Used for Padding purposes, as explained later."
```

### The padding's use
> "If the modified input data contains any octets that contain only padded zeroes, replace each of those octets with the padding character “=”."

### Bits
Base64 only uses 6 bits to represent one character because only 2^6 = 64 characters are used.

### Conversion

Here's how you could convert some data to base64:
1. Take in 3 bytes (24 bits) *reminder: a byte can hold (unsigned) numbers from 0 through 255.
```
211 19 46
```

2. List them as if they are just one number in binary format. 
```
11010011 00010011 00110001, so:

110100110001001100110001
```

3. Dissect them again into 4 segments of 6 bits (because base64 uses 6 bits to represent one character). 
```
110100 110001 001100 110001
```

4. Get the decimal values of these 6 bit numbers.
```
110100 110001 001100 110001

52 49 12 49
```

5. Refer to the encoding table to find the matches. Padded zeros at the end become `=`, the padding.
```
w5MTLg==
```

Another example for an ASCII string
1. Data
```
Hello
```

2. Break it down into bits (refer to ASCII table)
```
01001000 01100101 01101100 01101100 01101111 00001010 
```

3. Get them into 6 bits each
```
010010 000110 010101 101100 011011 000110 111100 001010 
```

4. Get decimal values of these numbers.
```
18 6 21 44 27 6 60 10
```

5. Get the encoding from the table
```
SGVsbG8=
```

## ASCII

### Sources
* [stackoverflow](https://stackoverflow.com/questions/19212306/whats-the-difference-between-ascii-and-unicode)
* [Carnegie mellon](https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html)

### Definition
American Standard Code for Information Interchange. Each character is represented by 7-bit number, defining 128 characters only. 

### Conversion table
```
Dec  Char                           Dec  Char     Dec  Char     Dec  Char
---------                           ---------     ---------     ----------
  0  NUL (null)                      32  SPACE     64  @         96  `
  1  SOH (start of heading)          33  !         65  A         97  a
  2  STX (start of text)             34  "         66  B         98  b
  3  ETX (end of text)               35  #         67  C         99  c
  4  EOT (end of transmission)       36  $         68  D        100  d
  5  ENQ (enquiry)                   37  %         69  E        101  e
  6  ACK (acknowledge)               38  &         70  F        102  f
  7  BEL (bell)                      39  '         71  G        103  g
  8  BS  (backspace)                 40  (         72  H        104  h
  9  TAB (horizontal tab)            41  )         73  I        105  i
 10  LF  (NL line feed, new line)    42  *         74  J        106  j
 11  VT  (vertical tab)              43  +         75  K        107  k
 12  FF  (NP form feed, new page)    44  ,         76  L        108  l
 13  CR  (carriage return)           45  -         77  M        109  m
 14  SO  (shift out)                 46  .         78  N        110  n
 15  SI  (shift in)                  47  /         79  O        111  o
 16  DLE (data link escape)          48  0         80  P        112  p
 17  DC1 (device control 1)          49  1         81  Q        113  q
 18  DC2 (device control 2)          50  2         82  R        114  r
 19  DC3 (device control 3)          51  3         83  S        115  s
 20  DC4 (device control 4)          52  4         84  T        116  t
 21  NAK (negative acknowledge)      53  5         85  U        117  u
 22  SYN (synchronous idle)          54  6         86  V        118  v
 23  ETB (end of trans. block)       55  7         87  W        119  w
 24  CAN (cancel)                    56  8         88  X        120  x
 25  EM  (end of medium)             57  9         89  Y        121  y
 26  SUB (substitute)                58  :         90  Z        122  z
 27  ESC (escape)                    59  ;         91  [        123  {
 28  FS  (file separator)            60  <         92  \        124  |
 29  GS  (group separator)           61  =         93  ]        125  }
 30  RS  (record separator)          62  >         94  ^        126  ~
 31  US  (unit separator)            63  ?         95  _        127  DEL
```

### Note on characters 
* Control characters are from `0` to `31`, and `127`.
* Printable characters are from `32` to `126`.

### Extended ASCII
It has 8 bits, thus allowing a room for 256 characters. It just has some special characters and weird looking characters like Ã. 

## Unicode

### Sources
* [stackoverflow](https://stackoverflow.com/questions/22404493/is-there-a-drastic-difference-between-utf-8-and-utf-16/22404874#22404874)

### Notes on Unicode
> "Unicode is a superset of ASCII, and the numbers 0–128 have the same meaning in ASCII as they have in Unicode. For example, the number 65 means Latin capital 'A'."

So obviously if you were Chinese or Korean, you would not be able to express characters in your language using ASCII. So this is where Unicode kicks in.

### Different number of bits
UTF is a short for Unicode Transformation Format.
* UTF-8: minimum 8 bits. **Only this** uses first 128 characters as those in ASCII.
* UTF-16: minimum 16 bits.
* UTF-32: minimum and maximum 32 bits.

## URL Encoding

### Sources
* [Dan's tools](https://www.url-encode-decode.com/)

### Definition
> "URL encoding stands for encoding certain characters in a URL by replacing them with one or more character triplets that consist of the percent character "%" followed by two hexadecimal digits. The two hexadecimal digits of the triplet(s) represent the numeric value of the replaced character."

This concept may also in fact be applied to URN and URI. Same thing for them.

### Why.

> "The characters allowed in a URI are **either reserved or unreserved** (or a percent character as part of a percent-encoding). 

 
> **Unreserved characters** have no such meaning:"

```
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
a b c d e f g h i j k l m n o p q r s t u v w x y z
0 1 2 3 4 5 6 7 8 9 - _ . ~
```
> The unreserved characters can be encoded, but should not be encoded.


> "**Reserved characters** are those characters that sometimes have special meaning:"

```
! * ' ( ) ; : @ & = + $ , / ? % # [ ]
```

> The reserved characters have to be encoded only under certain circumstances. 

And percent encoding is used to represent the characters that do not belong to neither of these groups of characters--for example, a Korean character `안녕`. 

### Conversion
1. Convert the character string into a sequence of bytes using the UTF-8 encoding
2. Convert each byte that is not an ASCII letter or digit to %HH, where HH is the hexadecimal value of the byte

Example

```
안녕 in text.

\xec\x95\x88\xeb\x85\x95 in UTF-8.

%ec%95%88%eb%85%95 in percent encoding.
```


