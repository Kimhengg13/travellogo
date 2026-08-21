import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import {
  MdArticle,
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdClose,
  MdOpenInNew,
  MdPerson,
  MdAccessTime,
  MdCategory,
} from "react-icons/md";

// Preset images
import AngkorImg from "../../assets/cambodia/angkor-wat.jpg";
import KohRongImg from "../../assets/cambodia/koh-rong.jpg";
import PhnomPenhImg from "../../assets/cambodia/phnom-penh.jpg";
import KampotImg from "../../assets/cambodia/kampot.jpg";
import KepImg from "../../assets/cambodia/kep.jpg";
import MondulkiriImg from "../../assets/cambodia/mondulkiri.jpg";

const presetBlogImages = [
  { name: "Angkor Wat", src: AngkorImg },
  { name: "Koh Rong", src: KohRongImg },
  { name: "Phnom Penh", src: PhnomPenhImg },
  { name: "Kampot River", src: KampotImg },
  { name: "Kep Coast", src: KepImg },
  { name: "Mondulkiri Sanctuary", src: MondulkiriImg },
];

const AdminBlogs = () => {
  const { blogs, addBlog, editBlog, deleteBlog } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const initialBlogState = {
    title: "",
    category: "Guides & Tips",
    author: "Wonder Cambodia Editorial",
    authorRole: "Travel Specialist",
    description: "",
    content: "",
    readTime: "5 min read",
    image: AngkorImg,
    customImgUrl: "",
  };

  const [blogForm, setBlogForm] = useState(initialBlogState);

  const filteredBlogs = blogs.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      !searchQuery ||
      b.title.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q)
    );
  });

  const handleOpenAdd = () => {
    setBlogForm(initialBlogState);
    setShowAddModal(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      category: blog.category || "Guides & Tips",
      author: blog.author || "Wonder Cambodia Team",
      authorRole: blog.authorRole || "Travel Specialist",
      description: blog.description || "",
      content: blog.content || blog.description || "",
      readTime: blog.readTime || "4 min read",
      image: blog.image,
      customImgUrl: typeof blog.image === "string" && blog.image.startsWith("http") ? blog.image : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.description) return;

    const finalImage = blogForm.customImgUrl ? blogForm.customImgUrl : blogForm.image;

    if (editingBlog) {
      editBlog(editingBlog.id, {
        ...blogForm,
        image: finalImage,
      });
      setEditingBlog(null);
    } else {
      addBlog({
        ...blogForm,
        image: finalImage,
      });
      setShowAddModal(false);
    }

    setBlogForm(initialBlogState);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            Travel Stories & Blog Posts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish insider guides, cultural stories, and travel advice for explorers.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white text-xs font-bold rounded-2xl transition-all shadow-md active:scale-95 self-start sm:self-auto"
        >
          <MdAdd size={18} /> Write New Article
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
            {blogs.length} Published Articles
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search articles by title, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-medium"
          />
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-card border border-slate-100 dark:border-slate-800 flex flex-col justify-between group hover:shadow-lg transition-all"
          >
            {/* Image Banner */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white text-[10px] font-bold uppercase rounded-full shadow-md">
                {blog.category || "Travel Guides"}
              </span>
              <span className="absolute bottom-3 left-3 text-white text-[11px] font-semibold">
                {blog.date} • {blog.readTime || "4 min"}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {blog.description}
                </p>
              </div>

              {/* Author & Actions Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  <MdPerson className="text-primary text-sm" />
                  <span className="truncate max-w-[110px]">{blog.author}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/blogs/${blog.id}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 transition-colors"
                    title="View on Public Site"
                  >
                    <MdOpenInNew size={16} />
                  </Link>
                  <button
                    onClick={() => handleOpenEdit(blog)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                    title="Edit Blog"
                  >
                    <MdEdit size={16} />
                  </button>
                  <button
                    onClick={() => setBlogToDelete(blog)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Delete Blog"
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL: WRITE / EDIT BLOG --- */}
      {(showAddModal || editingBlog) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingBlog(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <MdClose size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {editingBlog ? "Edit Travel Article" : "Compose Article"}
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                {editingBlog ? "Edit Blog Post" : "Publish New Guide"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hidden Waterfalls of Mondulkiri: An Eco-Trekker's Paradise"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    <option value="Guides & Tips">Guides & Tips</option>
                    <option value="Beach & Nature">Beach & Nature</option>
                    <option value="Culinary & Culture">Culinary & Culture</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Luxury Escapes">Luxury Escapes</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Est. Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
              </div>

              {/* Cover Image Preset */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Select Cover Image or URL
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {presetBlogImages.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setBlogForm({ ...blogForm, image: preset.src, customImgUrl: "" })}
                      className={`relative rounded-xl overflow-hidden h-14 border-2 transition-all ${
                        blogForm.image === preset.src && !blogForm.customImgUrl
                          ? "border-primary ring-2 ring-primary/40 scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={preset.src} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Or external image URL (https://...)"
                  value={blogForm.customImgUrl}
                  onChange={(e) => setBlogForm({ ...blogForm, customImgUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Short Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Catchy synopsis shown on blog cards and search results..."
                  value={blogForm.description}
                  onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Full Article Content</label>
                <textarea
                  rows={6}
                  placeholder="Write the full travel guide, tips, recommendations, itineraries..."
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                {editingBlog ? "Save Changes" : "Publish Article Now"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CONFIRM DELETE --- */}
      {blogToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto text-2xl">
              <MdDelete />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Article?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete <strong>"{blogToDelete.title}"</strong>?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  deleteBlog(blogToDelete.id);
                  setBlogToDelete(null);
                }}
                className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setBlogToDelete(null)}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
