---
layout: post
title: "Base64, Hex, ASCII, URL"
date: 2018-05-11 09:00:00 -0100
categories: hacking
---
### Sources
* [lifewire](https://www.lifewire.com/base64-encoding-overview-1166412)
* [mozilla](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)
* [oracle](https://blogs.oracle.com/rammenon/base64-explained)
* [base64 helper](https://www.base64encode.org/)

### Base64
> "Base64 is a group of similar binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation."

Conversion table (value to encoding char)
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

> :The following is the character subset of US-ASCII that is used for Base64.:

```
[a-z] – 26 characters           
[A-Z] – 26 characters         
[0-9] – 10 characters          
[+]  - 1 character [filler character]
[/]   - 1 character [filler character]
[=]  - Used for Padding purposes, as explained later."
```

The padding's use:
> "If the modified input data contains any octets that contain only padded zeroes, replace each of those octets with the padding character “=”."

Base64 only uses 6 bits because only 2^6 = 64 characters are used.

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

### ASCII
American Standard Code for Information Interchange.

Each character is represented by 7 bit string.
