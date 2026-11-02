import { Router } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import protect from '../middleware/auth.js';
const router = Router();
router.use(protect);
router.post('/', async (req, res, next) => {
  try {
    const { items, shipping } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ message: 'Your cart is empty.' });
    const required = ['fullName', 'address', 'city', 'postalCode', 'phone'];
    if (!shipping || required.some(k => !String(shipping[k] || '').trim())) return res.status(400).json({ message: 'Please complete all delivery details.' });
    const ids = items.map(i => i.productId);
    if (ids.some(id => !mongoose.isValidObjectId(id))) return res.status(400).json({ message: 'An item in your cart is invalid.' });
    const products = await Product.find({ _id: { $in: ids } });
    if (products.length !== new Set(ids).size) return res.status(400).json({ message: 'A product in your cart is no longer available.' });
    const orderItems = items.map(i => { const p = products.find(p => p._id.toString() === i.productId); const quantity = Math.max(1, Math.min(20, Number(i.quantity) || 1)); return { product: p._id, name: p.name, image: p.image, price: p.price, quantity }; });
    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await Order.create({ user: req.user.id, items: orderItems, shipping, subtotal });
    res.status(201).json(order);
  } catch (e) { next(e); }
});
router.get('/mine', async (req, res, next) => { try { res.json(await Order.find({ user: req.user.id }).sort({ createdAt: -1 })); } catch (e) { next(e); } });
export default router;
