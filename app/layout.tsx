import './globals.css'
import { CartProvider } from '../src/context/CartContext'
import { ToastProvider } from '../src/context/ToastContext'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'

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