export const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with fresh vegetables and our special sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop",
    category: "Burgers",
    popular: true,
    spicy: false
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, and extra virgin olive oil",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&h=400&fit=crop",
    category: "Pizza",
    popular: true,
    vegetarian: true
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crispy romaine with classic Caesar dressing and parmesan",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop",
    category: "Salads",
    popular: false,
    vegetarian: true
  },
  {
    id: 4,
    name: "Spicy Ramen",
    description: "Rich pork broth with noodles, chashu, and seasonal vegetables",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop",
    category: "Asian",
    popular: true,
    spicy: true
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with lemon herb butter and asparagus",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80",
    category: "Seafood",
    popular: false,
    healthy: true
  },
  {
    id: 6,
    name: "Chicken Tikka Masala",
    description: "Tender chicken in rich, spiced tomato-cream sauce with naan",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop",
    category: "Indian",
    popular: true,
    spicy: true
  },
  {
    id: 7,
    name: "Veggie Buddha Bowl",
    description: "Quinoa, roasted vegetables, avocado, and tahini dressing",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop",
    category: "Healthy",
    vegetarian: true,
    healthy: true
  },
  {
    id: 8,
    name: "BBQ Ribs",
    description: "Slow-cooked pork ribs with house-made barbecue sauce",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop",
    category: "BBQ",
    popular: true
  },
  {
    id: 9,
    name: "Mushroom Risotto",
    description: "Creamy Arborio rice with wild mushrooms and truffle oil",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop",
    category: "Italian",
    vegetarian: true
  },
  {
    id: 10,
    name: "Fish Tacos",
    description: "Grilled fish, cabbage slaw, and chipotle crema",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop",
    category: "Mexican",
    popular: false
  },
  {
    id: 11,
    name: "Pad Thai",
    description: "Rice noodles with tofu, shrimp, peanuts, and tamarind sauce",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&h=400&fit=crop",
    category: "Asian",
    popular: true
  },
  {
    id: 12,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=400&fit=crop",
    category: "Desserts",
    popular: true
  }
];

export const categories = [
  { id: 1, name: 'All', icon: '🍽️' },
  { id: 2, name: 'Burgers', icon: '🍔' },
  { id: 3, name: 'Pizza', icon: '🍕' },
  { id: 4, name: 'Salads', icon: '🥗' },
  { id: 5, name: 'Asian', icon: '🍜' },
  { id: 6, name: 'Seafood', icon: '🐟' },
  { id: 7, name: 'Indian', icon: '🍛' },
  { id: 8, name: 'Healthy', icon: '🥑' },
  { id: 9, name: 'BBQ', icon: '🥩' },
  { id: 10, name: 'Italian', icon: '🍝' },
  { id: 11, name: 'Mexican', icon: '🌮' },
  { id: 12, name: 'Desserts', icon: '🍰' }
];

export const dietaryTags = {
  vegetarian: { label: 'Vegetarian', icon: '🌱' },
  spicy: { label: 'Spicy', icon: '🌶️' },
  healthy: { label: 'Healthy', icon: '💪' }
}; 