import * as crypto from 'crypto';

/**
 * BIP340 Tagged Hash: Hash_TAG_A(M) = SHA256(SHA256(TAG_A) || SHA256(TAG_A) || M)
 */
export function generateSHA256TagHash( input: Buffer, tag: string): Buffer {
    const tagHash = crypto.createHash('sha256').update(tag).digest();
    const toHash = Buffer.concat([tagHash, tagHash, input]); // Binary Concatenation
    return crypto.createHash('sha256').update(toHash).digest();
}

export function calculateMerkleRoot(transactions: string[], tag: string): string {
    if(transactions.length === 0){
        throw new Error('No transactions found');
    }

    // generate hash for each transaction - Leaf Nodes
    let level: Buffer[] = transactions.map(transaction => generateSHA256TagHash(Buffer.from(transaction), tag));

    // for each leaf node, generate Intermediate Node by combining the leaf nodes and generate a hash
    // until the node becomes one - Merkle Root node
    while(level.length > 1) {
        if(level.length % 2 !== 0){
            level.push(level[level.length - 1]); // duplicate the last item if length is odd
        }
        const nextLevel: Buffer[] = [];
        for (let i = 0; i < level.length; i += 2) {
            const combined = Buffer.concat([level[i], level[i + 1]]);
            nextLevel.push(combined);
        }
        level = nextLevel;
    }
    return level[0].toString('hex');
}
