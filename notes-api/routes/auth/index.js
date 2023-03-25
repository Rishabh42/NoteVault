import express from "express"
import { User } from "../../models/user";
const router = express.Router();

// Function to check if user exists and return nonce (handled by user schema)
router.get('/users', async (req, res) => {
    const user = await User.findOne({ publicAddress: req.params.publicAddress });
    if (user)
        res.status(200).json({ user: user });
    else
        res.status(404).json({ error: 'User not found' });
})

export default router;