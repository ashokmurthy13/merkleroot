import { generateSHA256TagHash } from './merkleroot';

export type MerkleProofStep = {
    hash: string;
    position: 0 | 1;
};

export function generateMerkleProof(data: string[], target: string, tag: string): MerkleProofStep[] {
    const hashedLeaves = data.map(val => generateSHA256TagHash(Buffer.from(val), tag));
    const targetHash = generateSHA256TagHash(Buffer.from(target), tag);

    let index = hashedLeaves.findIndex(h => h.equals(targetHash));
    if (index === -1) throw new Error('Target not found');

    let layers: Buffer[][] = [hashedLeaves];
    let current = hashedLeaves;

    while (current.length > 1) {
        if (current.length % 2 !== 0) {
            current = [...current, current[current.length - 1]];
        }

        const next: Buffer[] = [];
        for (let i = 0; i < current.length; i += 2) {
            const combined = Buffer.concat([current[i], current[i + 1]]);
            next.push(generateSHA256TagHash(combined, tag));
        }

        layers.push(next);
        current = next;
    }

    const proof: MerkleProofStep[] = [];

    index = hashedLeaves.findIndex(h => h.equals(targetHash));
    for (let i = 0; i < layers.length - 1; i++) {
        const layer = layers[i];
        const siblingIndex = index ^ 1;
        if (siblingIndex < layer.length) {
            proof.push({
                hash: layer[siblingIndex].toString('hex'),
                position: siblingIndex < index ? 0 : 1,
            });
        }
        index = Math.floor(index / 2);
    }

    return proof;
}
