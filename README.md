# Merkle Tree - Merkle Root

### What is Merkle Tree?
    - Also known as Hash Tree, is a type of a Binary Tree.
    - Each Leaf Node represents Hash of a data.
    - Each Non-Leaf(Intermediate) Node is hash of concatenation of its 2 child nodes hashes. 
    - The top most node is known as the Merkle Root.

### What is the use of Merkle Tree?
    - Data Integrity : Verify that data hasn't been tampered with.
    - Efficiency : Just download a piece of data to verify instead of full download.
    - Scalablity : works well for larg dataset.

### What are the applications of Merkle Tree?
    - Blockchain : to verify transactions
        - In Bitcoin each block contains
            - A list of transactions
            - A Merkle Root, summarizing all those transactions
        - To prove a transaction exists in the block, a small "Merkle Proof" is needed.
    - Git : To track file content
    - Secure File Storage


### Libs used

    crypto : built-in Node.js library used for Cryptography

# Build - Run - Test

## Run test
change directory to "/merkleroot/test" and run the following command

    - npx jest --watch

Sample Output
```
 PASS  ./merkleroot.test.ts
  generateSHA256TagHash
    ✓ generates a SHA256 Tagged Hash (4 ms)
  calculateMerkleRoot
    ✓ generates a Merkle Root

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.223 s, estimated 4 s
Ran all test suites related to changed files.

```