---
title: "MD5 and SHA"
date: "2018-05-12T09:00:00.009Z"
tab: "post"
tags: ["hacking"]
---
### Sources
* [Lifewire](https://www.lifewire.com/what-is-md5-2625937)
* [SSLStore](https://www.thesslstore.com/blog/difference-sha-1-sha-2-sha-256-hash-algorithms/)

### Hash
* A hashing algorithm is a mathematical function that condenses data to a fixed size. 
* It is easier for the computer to first compute a hash and then compare them than it would be to compare the original files.
* Two crucial characteristics on hashing algorithm are: **irreversible and unique**--Not being able to get the input by looking at the output(but don't be relieved--it could still be cracked by just producing lots of outputs to get the same hash), and not being able to produce the same output with another input. 
* Hash and **Checksum** are almost the same things. Just use the terms interchangeably until things get more familiar to you for now. 

### MD5
* MD5 (technically called MD5 Message-Digest Algorithm) is a cryptographic hash function whose **main purpose is to verify that a file has been unaltered.**
* MD5 has many security breaches that have been revealed, so it is useless for any security applications.
* It is however still useful for **checking non-cryptographic checksum to verify data integrity and detect unintentional data corruption.**
* MD5 hashes are 128-bits in length and are normally shown in their 32 digit hexadecimal value equivalent.

### SHA
Secure Hash Algorithm. It's got different kinds:
* SHA-1
* SHA-2
* SHA-256
* SHA-...

And here are things to know:
* SHA-1 is a 160-bit hash.
* SHA-2 is most popularly 256-bit but it has other versions as well. When you say SHA-2, you are referring to a 'family'.
* SHA-1 is not safe anymore. From 2016 onward, SHA-2 is the new standard. If you are receiving a certificate today it must be using that signature at a minimum.
* The variety of SHA-2 hashes can lead to a bit of confusion, as websites and authors express them differently. If you see “SHA-2,” “SHA-256” or “SHA-256 bit,” those names are referring to the same thing. If you see “SHA-224,” “SHA-384,” or “SHA-512,” those are referring to the alternate bit-lengths of SHA-2. You may also see some sites being more explicit and writing out both the algorithm and bit-length, such as “SHA-2 384.”
* One future implication: computing powers maintain to grow, so SHA-2 will be likely to be insecure after about 2020. 
