import React from 'react';

function Result({ data, loading, error }) {
  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (data.length === 0) return <p className="text-center mt-6">No anime found.</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Results:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((anime) => (
          <div
            key={anime._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold mb-2">{anime.name}</h3>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Genre:</span> {Array.isArray(anime.genre) ? anime.genre.join(', ') : anime.genre}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Episodes:</span> {anime.episodes}</p>
            {anime.rating !== undefined && (
              <p className="text-gray-700"><span className="font-semibold">Rating:</span> {anime.rating}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
