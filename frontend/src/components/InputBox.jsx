function InputBox({
    animeName,
    setAnimeName,
    genre,
    setGenre,
    minEpisodes,
    setMinEpisodes,
    maxEpisodes,
    setMaxEpisodes,
    sortBy,
    setSortBy,
    onSearch
  }) {
    return (
      <div className="w-full max-w-3xl bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Anime Name"
            value={animeName}
            onChange={(e) => setAnimeName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Genre (comma separated)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Min Episodes"
            value={minEpisodes}
            onChange={(e) => setMinEpisodes(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max Episodes"
            value={maxEpisodes}
            onChange={(e) => setMaxEpisodes(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Sort By (rating,-episodes)"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
  
  export default InputBox;
  