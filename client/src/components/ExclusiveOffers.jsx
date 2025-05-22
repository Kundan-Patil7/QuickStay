import React from 'react';
import Title from './Title';
import { assets, exclusiveOffers } from '../assets/assets';

const ExclusiveOffers = () => {
  return (
    <div className="flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 py-10 bg-gray-50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <Title 
          align="left" 
          title="Exclusive Offers" 
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering luxurious accommodations and unforgettable experiences." 
        />

        <div className="mt-4 md:mt-0">
          <button className="group flex items-center gap-2 px-6 py-3 text-black text-sm font-medium rounded-lg shadow-md transition-all focus:ring-2 focus:ring-blue-500">
            View All Offers
            <img
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              src={assets.arrowIcon || 'fallback-arrow-icon.png'}
              alt="arrow icon"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div 
            key={item._id} 
            className="group relative flex flex-col items-start justify-between gap-4 pt-12 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center" 
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
              {item.priceOff}% OFF
            </p>

            <div>
              <p className="text-2xl font-medium font-playfair">{item.title}</p>
              <p className="mt-2">{item.description}</p>
              <p className="text-xs text-white/70 mt-3">Expires {item.expiryDate}</p>
            </div>

            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
              View Offers
              <img 
                className="invert group-hover:translate-x-1 transition-transform" 
                src={assets.arrowIcon || 'fallback-arrow-icon.png'} 
                alt="arrow icon"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
