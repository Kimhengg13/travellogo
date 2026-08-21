import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaArrowRight } from "react-icons/fa";

const BlogCard = ({ id, image, date, title, description, content, author, authorRole, category, readTime }) => {
  const targetSlug = id || encodeURIComponent(title);

  return (
    <Link
      to={`/blogs/${targetSlug}`}
      onClick={() => window.scrollTo(0, 0)}
      state={{ id, image, date, title, description, content, author, authorRole, category, readTime }}
      className="group block h-full"
    >
      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-full transform hover:-translate-y-2">
        {/* Cover Image Container */}
        <div className="relative overflow-hidden h-[220px] w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

          {/* Date Tag */}
          <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-800 dark:text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
            {date || "Aug 2026"}
          </span>

          {category && (
            <span className="absolute top-4 right-4 bg-primary/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md uppercase">
              {category}
            </span>
          )}
        </div>

        {/* Card Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300">
              <FaUser className="text-primary text-[11px]" /> {author || "Travel Team"}
            </span>

            <span className="flex items-center gap-1 font-bold text-primary group-hover:translate-x-1 transition-transform">
              Read Story <FaArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
