import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ToastProvider } from '@/context/ToastContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Food Store',
  description: 'Order delicious food online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body>
        <ToastProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              {children}
              <Footer />
            </div>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}