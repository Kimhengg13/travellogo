import React from "react";
import { useData } from "../../context/DataContext";
import BlogCard from "./BlogCard";
import { FaBookOpen } from "react-icons/fa";

const BlogsComp = () => {
  const { blogs } = useData();

  return (
    <div className="dark:bg-gray-950 dark:text-white bg-gray-50/60 py-16 transition-colors duration-300">
      <section data-aos="fade-up" className="container space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <span className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <FaBookOpen /> Travel Stories & Guides
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white">
              Latest Insights & Inspiration
            </h2>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((item) => (
            <BlogCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogsComp;
