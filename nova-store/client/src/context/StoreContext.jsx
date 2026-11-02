import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const StoreContext = createContext(null);
export function StoreProvider({ children }) {
 const [cart,setCart] = useState(() => JSON.parse(localStorage.getItem('nova-cart') || '[]'));
 const [user,setUser] = useState(() => JSON.parse(localStorage.getItem('nova-user') || 'null'));
 useEffect(()=>localStorage.setItem('nova-cart',JSON.stringify(cart)),[cart]);
 const addToCart = product => setCart(old => { const found=old.find(i=>i._id===product._id); return found?old.map(i=>i._id===product._id?{...i,quantity:i.quantity+1}:i):[...old,{...product,quantity:1}]; });
 const updateQty = (id,quantity) => setCart(old=>old.map(i=>i._id===id?{...i,quantity:Math.max(1,Math.min(20,quantity))}:i));
 const removeFromCart = id => setCart(old=>old.filter(i=>i._id!==id));
 const clearCart = () => setCart([]);
 const login = data => { localStorage.setItem('nova-token',data.token); localStorage.setItem('nova-user',JSON.stringify(data.user)); setUser(data.user); };
 const logout = () => { localStorage.removeItem('nova-token'); localStorage.removeItem('nova-user'); setUser(null); };
 const total = useMemo(()=>cart.reduce((sum,i)=>sum+i.price*i.quantity,0),[cart]);
 return <StoreContext.Provider value={{cart,user,addToCart,updateQty,removeFromCart,clearCart,total,login,logout}}>{children}</StoreContext.Provider>;
}
export const useStore=()=>useContext(StoreContext);
