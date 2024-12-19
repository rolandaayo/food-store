'use client'

import { createContext, useState, useContext, useEffect } from 'react'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  updateQuantity: (itemId: number, newQuantity: number) => void
  clearCart: () => void
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'foodOrder_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          setCartItems(parsedCart)
        } catch (error) {
          console.error('Error parsing cart data:', error)
          localStorage.removeItem(CART_STORAGE_KEY)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    }
  }, [cartItems])

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)
      
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 0) return
    
    setCartItems(prevItems => {
      if (newQuantity === 0) {
        return prevItems.filter((item) => item.id !== itemId)
      }
      
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 