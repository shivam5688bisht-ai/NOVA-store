import { Router } from 'express';
import Product from '../models/Product.js';
const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const { search, category } = req.query; const filter = {};
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    if (category && category !== 'All') filter.category = category;
    res.json(await Product.find(filter).sort({ featured: -1, createdAt: -1 }));
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => { try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: 'Product not found.' }); res.json(product); } catch (e) { next(e); } });
export default router;
