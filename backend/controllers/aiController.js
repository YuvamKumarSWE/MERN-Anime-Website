const Anime = require('../models/animeModel');
const OpenAI = require('openai');

exports.generateAnimeRecommendation = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide a prompt for anime recommendations'
      });
    }
    
    const availableGenres = await Anime.distinct('genre');
    
    // Initialize the OpenAI API client using environment variables
    const openai = new OpenAI({
     
      baseURL: process.env.OPENAI_BASE_URL,
    });
    
    const systemPrompt = `You are an anime recommendation assistant. You should analyze the user's request and suggest 
    appropriate filters to search for anime in our database. Our database has these genres: ${availableGenres.join(', ')}.
    Your recommendations must only include genres that exist in our database.
    
    Return your response in this JSON format:
    {
      "genres": ["Genre1", "Genre2"], // 1-3 genres that match the request
      "minEpisodes": number or null, // minimum episodes if specified
      "maxEpisodes": number or null, // maximum episodes if specified
      "explanation": "Brief explanation of your recommendation"
    }
    
    Keep the explanation under 100 words and focus on genres in our database. Don't mention any specific anime titles.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Changed to use the model in your example
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });
    
    // Parse the AI response
    const aiResponseText = response.choices[0].message.content.trim();
    let aiRecommendation;
    
    try {
      const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiRecommendation = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Couldn't extract JSON from response");
      }
      
      // Validate the genres exist in our database
      if (aiRecommendation.genres && Array.isArray(aiRecommendation.genres)) {
        aiRecommendation.genres = aiRecommendation.genres.filter(genre => 
          availableGenres.some(availableGenre => 
            availableGenre.toLowerCase().includes(genre.toLowerCase()) || 
            genre.toLowerCase().includes(availableGenre.toLowerCase())
          )
        );
      }
      
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to parse AI recommendation'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: aiRecommendation
    });
    
  } catch (error) {
    console.error("AI recommendation error:", error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate AI recommendation'
    });
  }
};