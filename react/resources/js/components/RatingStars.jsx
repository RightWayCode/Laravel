const RatingStars = ({ rating = 4 }) => {
    return (
        <div className="flex items-center space-x-1">
            {Array(5).fill().map((_, i) => (
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < rating ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-yellow-400 stroke-yellow-500"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89-3.977 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674-3.977-2.89c-.783-.57-.38-1.81.588-1.81h4.911l1.518-4.674z" />
                </svg>
            ))}
        </div>
    );
};

export default RatingStars;