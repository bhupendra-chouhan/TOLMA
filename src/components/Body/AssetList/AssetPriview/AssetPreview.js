import React from 'react'
import AssetVideo from './AseetVideo'
import PricingOptions from './PricingOptions'

const AssetPreview = () => {
  return (
    <div className='flex gap-5 flex-col h-[95%]'>
    <AssetVideo/>
    <PricingOptions/>
    </div>
  )
}

export default AssetPreview