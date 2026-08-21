import React, { useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import BlogsComp from "../components/Blogs/BlogsComp";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaShareAlt,
  FaBookmark,
  FaCompass,
} from "react-icons/fa";

const BlogsDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const { getBlogByIdOrSlug, blogs } = useData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Lookup blog from location.state or from DataContext
  const foundBlog = getBlogByIdOrSlug(id);
  const stateData = location.state || {};

  const article = {
    title: stateData.title || foundBlog?.title || "Cambodian Travel Story",
    image: stateData.image || foundBlog?.image || (blogs[0] ? blogs[0].image : ""),
    date: stateData.date || foundBlog?.date || "Aug 2026",
    description: stateData.description || foundBlog?.description || "",
    content: foundBlog?.content || stateData.description || "",
    author: stateData.author || foundBlog?.author || "Wonder Cambodia Editorial",
    authorRole: foundBlog?.authorRole || "Cultural Travel Specialist",
    category: foundBlog?.category || "Travel Guides",
    readTime: foundBlog?.readTime || "5 min read",
  };

  return (
    <div className="pt-20 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Back Navigation Bar */}
      <div className="container py-4">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-colors"
        >
          <FaArrowLeft /> Back to Travel Stories
        </Link>
      </div>

      {/* Article Hero Header */}
      <div className="container max-w-4xl space-y-6 pb-8">
        {/* Category & Read Time Tag */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
            <FaClock className="text-primary text-[10px]" /> {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-heading font-black leading-tight text-gray-900 dark:text-white">
          {article.title}
        </h1>

        {/* Author Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 dark:border-gray-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{article.author}</p>
              <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                {article.authorRole} • Published on {article.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              title="Share Story"
            >
              <FaShareAlt size={14} />
            </button>
            <button
              onClick={() => alert("Story added to your reading bookmarks!")}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              title="Bookmark"
            >
              <FaBookmark size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="container max-w-5xl">
        <div className="relative h-[340px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Main Article Content */}
      <div className="container max-w-4xl py-12 space-y-8">
        {/* Lead Excerpt */}
        <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed italic border-l-4 border-primary pl-4 py-1">
          {article.description}
        </p>

        {/* Formatted Content Body */}
        <div className="space-y-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-sans font-normal">
          {article.content ? (
            article.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900 dark:text-white pt-4"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })
          ) : (
            <p className="leading-relaxed">{article.description}</p>
          )}
        </div>

        {/* Travel CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-primary via-cyan-700 to-secondary text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 my-10">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md inline-block">
              Plan Your Adventure
            </span>
            <h3 className="text-2xl font-heading font-black">
              Ready To Experience Cambodia Firsthand?
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100 max-w-md">
              Explore our handpicked Siem Reap, Koh Rong, and Kampot luxury tour packages.
            </p>
          </div>
          <Link
            to="/best-places"
            className="px-6 py-3.5 bg-white text-primary hover:bg-slate-50 font-extrabold text-xs rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            Explore Tours & Packages
          </Link>
        </div>
      </div>

      {/* Related Stories & Guides Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <BlogsComp />
      </div>
    </div>
  );
};

export default BlogsDetails;
