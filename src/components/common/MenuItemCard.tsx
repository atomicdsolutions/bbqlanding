import React from 'react';
import Link from 'next/link';
import ResponsiveImage from '@/components/common/ResponsiveImage';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  price?: string;
  halfPanPrice?: string;
  fullPanPrice?: string;
  popular?: boolean;
}

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  type: 'protein' | 'side';
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, index, type }) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-lg border ${item.popular ? 'border-ph-gold' : 'border-gray-200'}`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative h-60 md:h-auto">
          <ResponsiveImage 
            src={item.imagePath}
            alt={item.name}
            priority={index === 0}
          />
          {item.popular && (
            <div className="absolute top-2 left-2 bg-ph-gold text-white text-xs font-bold px-2 py-1 rounded-full">
              Popular
            </div>
          )}
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-ph-purple">{item.name}</h3>
            {type === 'protein' && (
              <span className="font-bold text-ph-gold">{item.price}</span>
            )}
          </div>
          <p className="mt-2 text-gray-600">{item.description}</p>
          {type === 'side' && (
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <span className="text-sm text-gray-500">Half Pan:</span>
                <span className="ml-2 font-bold text-ph-gold">{item.halfPanPrice}</span>
                <span className="text-xs text-gray-500 ml-1">(Serves 15-20)</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Full Pan:</span>
                <span className="ml-2 font-bold text-ph-gold">{item.fullPanPrice}</span>
                <span className="text-xs text-gray-500 ml-1">(Serves 35-45)</span>
              </div>
            </div>
          )}
          <div className="mt-4">
            <Link href="#consultation" className="inline-block text-ph-purple font-medium hover:text-ph-gold">
              Add to Consultation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;