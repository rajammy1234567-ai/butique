import React from 'react';
import { formatPrice } from '../utils/helpers';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer group">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-200 h-72">
          <img
            src={product.images?.[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-primary-600 text-white text-xs px-2 py-1 rounded capitalize"
              >
                {tag === 'bestseller' ? '⭐ Bestseller' : tag === 'trending' ? '🔥 Trending' : tag}
              </span>
            ))}
          </div>

          {/* Stock Status */}
          <div className="absolute bottom-3 right-3">
            {product.stock > 0 ? (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">In Stock</span>
            ) : (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-primary-600 hover:text-white transition"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-primary-600' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 mb-1">{product.category?.name}</p>

          {/* Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-xs text-gray-500">(124 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-primary-600 font-bold text-lg">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && (
                <p className="text-gray-400 line-through text-sm">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
