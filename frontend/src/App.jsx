import { useState } from 'react';
import axios from 'axios';
import InputBox from './components/InputBox';
import Result from './components/Result';

function App() {
  // State variables
  const [animeName, setAnimeName] = useState(""); //For anime name input 
  const [genre, setGenre] = useState("");
  const [minEpisodes, setMinEpisodes] = useState("");
  const [maxEpisodes, setMaxEpisodes] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [data, setData] = useState([]); // Data fetched from the API in the backend
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    let query = [];

    if (animeName) query.push(`name=${animeName}`);
    if (genre) query.push(`genre=${genre}`);
    if (minEpisodes) query.push(`minEpisodes=${minEpisodes}`);
    if (maxEpisodes) query.push(`maxEpisodes=${maxEpisodes}`);
    if (sortBy) query.push(`sortBy=${sortBy}`);

    const queryString = query.join("&");

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/anime?${queryString}`);
      
      if (response.data.status === "success") {
        setData(response.data.data.anime);
        setSearchPerformed(true);
      } else {
        setError("Failed to fetch anime.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" mx-auto p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Anime Search</h1>
        <InputBox
          animeName={animeName}
          setAnimeName={setAnimeName}
          genre={genre}
          setGenre={setGenre}
          minEpisodes={minEpisodes}
          setMinEpisodes={setMinEpisodes}
          maxEpisodes={maxEpisodes}
          setMaxEpisodes={setMaxEpisodes}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onSearch={handleSearch}
        />
        <Result data={data} loading={loading} error={error} searchPerformed={searchPerformed} />
      </div>
    </div>
  );
}

export default App;
