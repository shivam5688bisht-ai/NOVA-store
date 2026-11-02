import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({ name: { type: String, required: true }, description: { type: String, required: true }, price: { type: Number, required: true, min: 0 }, category: { type: String, required: true }, image: { type: String, required: true }, featured: { type: Boolean, default: false }, stock: { type: Number, default: 20 } }, { timestamps: true });
export default mongoose.model('Product', productSchema);
