import express from 'express';
import { users } from './data';
import { calculateMerkleRoot } from './merkleroot';
import { generateMerkleProof } from './merkleproof';

const app = express();
const PORT = 3000;

const tag = 'ProofOfReserve_Leaf';
const serialize = (id: number, balance: number) => `(${id},${balance})`;

const userDataSerialized = users.map(([id, bal]) => serialize(id, bal));

app.get('/api/merkle-root', (req, res) => {
    try {
        const root = calculateMerkleRoot(userDataSerialized, tag);
        res.json({ merkleRoot: root });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

app.get('/api/merkle-proof/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(([id]) => id === userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const serialized = serialize(user[0], user[1]);

    try {
        const proof = generateMerkleProof(userDataSerialized, serialized, tag);
        res.json({ userBalance: user[1], proof });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

app.listen(PORT, () => {
    console.log(`Proof of Reserve API running at http://localhost:${PORT}`);
});
