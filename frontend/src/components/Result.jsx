import React from 'react';
import AnimeCard from './AnimeCard';

function Result({ data, loading, error, searchPerformed }) {
  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!searchPerformed) return null; // Don't render anything if no search performed
  if (data.length === 0) return <p className="text-center mt-6">No anime found.</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Results:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((anime) => (
          <AnimeCard key={anime._id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default Result;