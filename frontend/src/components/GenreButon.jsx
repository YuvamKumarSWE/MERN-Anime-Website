function GenreButton({ genre, onClick, isSelected }) {
  return (
    <button 
      onClick={() => onClick(genre)} 
      className={`rounded-full px-4 py-0.5 text-md transition-colors ${
        isSelected 
          ? "bg-blue-500 text-white" 
          : "bg-slate-600 bg-opacity-20 hover:bg-slate-700 hover:bg-opacity-30"
      }`}
    >
      {genre}
    </button>
  );
}
export default GenreButton;