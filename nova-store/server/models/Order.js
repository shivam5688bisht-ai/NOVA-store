import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, name: String, image: String, price: Number, quantity: Number }], shipping: { fullName: String, address: String, city: String, postalCode: String, phone: String }, subtotal: Number, status: { type: String, default: 'Placed' } }, { timestamps: true });
export default mongoose.model('Order', orderSchema);
