import { generateSHA256TagHash } from '../src/merkleroot';
import { calculateMerkleRoot } from '../src/merkleroot';

describe('generateSHA256TagHash', () => {
    it('generates a SHA256 Tagged Hash', () => {
        const input = "abcd";

        const buffer = generateSHA256TagHash(Buffer.from(input), 'Bitcoin_Transaction');
        const hash = buffer.toString('hex');
        const expected = "edc6b2a8005048cbeb53d44f054ee67dd12385f80fdd52832e610c7a51ce7d1d";

        expect(hash).toBe(expected);
    })
})


describe('calculateMerkleRoot', () => {
    it('generates a Merkle Root', () => {
        let arr: string[] = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
        const merkleRoot = calculateMerkleRoot(arr, 'Bitcoin_Transaction');
        const expected = "d2d838724571ff750eb7f498a667c32f522efae2b403eae6f678207ac6f978de7cdf701413062eaba020af83441a6762ee2910e36b1805bad072103b0257f441bb59c31efe4ce0afe0270532d6a04cf1c8edbaa42c255cf4a1ff0ca798ae534fdd7b959996c19bca35079db6801669f6125343a1877498aa0013431cf1ea6b486a1737ad69148fc1992260c0ceefdeaacebab8872a8d2ab7eb8496d3d8a7592e6a1737ad69148fc1992260c0ceefdeaacebab8872a8d2ab7eb8496d3d8a7592e6a1737ad69148fc1992260c0ceefdeaacebab8872a8d2ab7eb8496d3d8a7592e6a1737ad69148fc1992260c0ceefdeaacebab8872a8d2ab7eb8496d3d8a7592e";
        expect(merkleRoot).toBe(expected);
    })
})