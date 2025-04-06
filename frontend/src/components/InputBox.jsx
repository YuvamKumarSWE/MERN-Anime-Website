import { useState } from 'react';
import AiRecommendationSection from './AiRecommendationSection';
import SearchFilters from './SearchFilters';
import ActionButtons from './ActionButtons';

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
    // States for AI recommendation
    const [aiPrompt, setAiPrompt] = useState("");
    const [isGeneratingRecommendation, setIsGeneratingRecommendation] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState(null);
    
    // Common genre list
    const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];
    
    // Convert string of genres to array
    const selectedGenres = genre.split(',').filter(g => g.trim() !== '');
    
    // Handle genre selection
    const handleGenreClick = (clickedGenre) => {
      const genreArray = genre.split(',').filter(g => g.trim() !== '');
      
      if (genreArray.includes(clickedGenre)) {
        // Remove genre if already selected
        const newGenres = genreArray.filter(g => g !== clickedGenre);
        setGenre(newGenres.join(','));
      } else {
        // Add genre if not already selected
        const newGenres = [...genreArray, clickedGenre];
        setGenre(newGenres.join(','));
      }
    };
    
    // Handle sort selection
    const handleSortChange = (value) => {
      setSortBy(value);
    };

    // Clear all filters
    const handleClearFilters = () => {
      setAnimeName("");
      setGenre("");
      setMinEpisodes("");
      setMaxEpisodes("");
      setSortBy("");
      setAiPrompt("");
      setAiRecommendation(null);
    };

    // Generate AI recommendation
    const handleAiRecommendation = async () => {
      if (!aiPrompt.trim()) return;
      
      setIsGeneratingRecommendation(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ai/recommend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: aiPrompt }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to get recommendations');
        }
        
        const data = await response.json();
        if (data.status === "success") {
          setAiRecommendation(data.data);
          
          // Apply the AI recommendations to the search filters
          if (data.data.genres) setGenre(data.data.genres.join(','));
          if (data.data.minEpisodes) setMinEpisodes(data.data.minEpisodes);
          if (data.data.maxEpisodes) setMaxEpisodes(data.data.maxEpisodes);
        }
      } catch (error) {
        console.error("AI recommendation error:", error);
      } finally {
        setIsGeneratingRecommendation(false);
      }
    };

    // Apply AI recommendation to search
    const applyAndSearch = () => {
      if (aiRecommendation) {
        onSearch();
      }
    };

    return (
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Search Anime</h2>
        
        {/* AI Recommendation Component */}
        <AiRecommendationSection
          aiPrompt={aiPrompt}
          setAiPrompt={setAiPrompt}
          isGeneratingRecommendation={isGeneratingRecommendation}
          aiRecommendation={aiRecommendation}
          handleAiRecommendation={handleAiRecommendation}
          applyAndSearch={applyAndSearch}
        />
        
        {/* Search Filters Component */}
        <SearchFilters
          animeName={animeName}
          setAnimeName={setAnimeName}
          genres={genres}
          selectedGenres={selectedGenres}
          handleGenreClick={handleGenreClick}
          setGenre={setGenre}
          minEpisodes={minEpisodes}
          setMinEpisodes={setMinEpisodes}
          maxEpisodes={maxEpisodes}
          setMaxEpisodes={setMaxEpisodes}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />
        
        {/* Action Buttons Component */}
        <ActionButtons 
          handleClearFilters={handleClearFilters}
          onSearch={onSearch}
        />
      </div>
    );
  }
  
  export default InputBox;
