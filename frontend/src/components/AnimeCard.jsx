import React from 'react';
import { Star, Calendar } from 'lucide-react';

const AnimeCard = ({ anime }) => {
  
  
  const randomGradient = 'from-slate-800 to-teal-700';
  
  // Calculate star display based on rating
  const rating = anime.rating || 0;
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;
  
  return (
    <div className="relative group h-54 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105">
      {/* Gradient Background with Hover Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${randomGradient} opacity-90 group-hover:opacity-100`}></div>
      
      {/* Card Content */}
      <div className="relative h-full flex flex-col justify-between p-4 z-10 text-white">
        {/* Top Section */}
        <div>
          <h3 className="font-bold text-xl mb-2 truncate">{anime.name}</h3>
          
          <div className="flex items-center mb-1 text-sm">
            <div className="bg-black bg-opacity-30 rounded-full px-3 py-1 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{anime.episodes} Episodes</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2 text-white">
           {(() => {
                const genres = Array.isArray(anime.genre) ? anime.genre.slice(0, 3) : [anime.genre];
                return (
                    <>
                        {genres.map((g, index) => (
                        <span key={index} className="bg-slate-600 bg-opacity-20 rounded-full px-4 py-0.5 text-md">
                            {g}
                        </span>
                        ))}
                        {Array.isArray(anime.genre) && anime.genre.length > 3 && (
                        <span className="bg-white bg-opacity-20 rounded-full px-2 py-0.5 text-xs">
                            +{anime.genre.length - 3}
                        </span>
                        )}
                    </>
                );
            })()}
        </div>
        </div>
        
        {/* Bottom Section */}
        <div className='text-black'>
          {/* Rating Stars */}
          {anime.rating !== undefined && (
            <div className="flex items-center">
              <div className="flex mr-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${
                      i < fullStars ? 'fill-yellow-400 text-yellow-400' : 
                      (i === fullStars && hasHalfStar ? 'fill-yellow-400 text-yellow-400 opacity-60' : 'text-gray-300')
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold">{anime.rating}/10</span>
            </div>
          )}
          
          
      
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;