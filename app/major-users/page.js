'use client'

import Image from 'next/image'

export default function MajorUsers() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Major Users</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="content">
          <h2 className="text-2xl font-semibold mb-4">Financial Management</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enterprise resource planning</li>
            <li>Financial reporting and analysis</li>
            <li>Budgeting and forecasting</li>
            <li>Risk management</li>
          </ul>
        </div>
        
        <div className="image-container">
          <Image 
            src="/images/financial-management.jpg" 
            alt="Financial Management" 
            className="section-image rounded-lg shadow-lg" 
            width={500} 
            height={300}
            priority
          />
        </div>
      </div>
    </div>
  )
} 