function GenreButton({ genre, onClick }) {
  return (
    <button onClick={onClick} className="bg-slate-600 bg-opacity-20 rounded-full px-4 py-0.5 text-md">
      {genre}
    </button>
    
  );
}
export default GenreButton;