import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./index.css";
import SearchBar from "./SearchBar";

const getBlogs = () => {
  let blogs = [];
  if (!localStorage.getItem("blogs")) {
    blogs = [];
  } else {
    blogs = JSON.parse(localStorage.getItem("blogs"));
  }
  return blogs;
};

function Home() {
  const [post, setPost] = useState({ id: "", title: "", image: "" });
  const [blogs, setBlogs] = useState(getBlogs);
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  //Search submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setIsSearched(true);
    handleSearchResults();
  };

  //search for blogs by category
  const handleSearchResults = () => {
    const filteredBlogs = blogs.filter((blog) =>
      blog.title?.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setSearchedBlogs(filteredBlogs);
  };
  const handleClearSearch = () => {
    setBlogs(blogs);
    setIsSearched(false);
    setSearchKey("");
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "image") {
      setPost({ ...post, image: URL.createObjectURL(e.target.files[0]) });
    } else {
      setPost({ ...post, title: value });
    }
  };
  //submit handle
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setBlogs([...blogs, { ...post, id: blogs.length + 1 }]);
    setPost({ id: "", title: "", image: "" });
  };
  //edit blogs
  const onEditHandler = (e) => {
    e.preventDefault();
    setBlogs((prev) => prev.map((blog) => (blog.id === post.id ? post : blog)));
    setPost({ id: "", title: "", image: "" });
  };

  const onEditClick = (e, post) => {
    e.preventDefault();
    setEdit(true);
    setPost({ id: post.id, title: post.title, image: post.image });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  //DELETE BLOGS
  const deleteItem = (e, index) => {
    e.preventDefault();
    const updateditems = blogs.filter((_, id) => id !== index);
    setBlogs(updateditems);
  };

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    if (!localStorage.getItem("blogs")) {
      setBlogs([]);
    } else {
      setBlogs(JSON.parse(localStorage.getItem("blogs")));
    }
  }, []);

  return (
    <>
      <section className="homePage">
        <div className="container">
          <SearchBar
            value={searchKey}
            clearSearch={handleClearSearch}
            formSubmit={handleSearchSubmit}
            handleSearchKey={(e) => setSearchKey(e.target.value)}
          />
          <div className="header">
            <h1> Create Your Blog </h1>
            <blockquote>
              The only dreams impossible to reach are the ones you never pursue.
            </blockquote>
          </div>
          <div className="main">
            <form onSubmit={edit ? onEditHandler : onSubmitHandler}>
              <span>
                <input
                  type="text"
                  name="title"
                  placeholder="Title..."
                  value={post.title}
                  onChange={onChangeHandler}
                />
              </span>
              <br></br>

              <div className="flex justify-center items-center w-full mb-4">
                <label className="flex flex-col justify-center items-center w-80 h-10 bg-gray-50 rounded-lg border-1 border-gray-400 border-solid cursor-pointer hover:bg-gray-200 ">
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="mb-0 mt-2 w-20 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-0 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    onChange={onChangeHandler}
                  />
                </label>
              </div>

              <button
                className="bg-gradient-to-r from-green-400 to blue-500 hover:from-pink-500 hover:to-yellow-500"
                type="submit"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <hr />
      <section className="postPage">
        <div>
          {!isSearched ? (
            <Card
              blogs={blogs}
              deleteItem={deleteItem}
              onEditClick={onEditClick}
            />
          ) : (
            <Card
              blogs={searchedBlogs}
              deleteItem={deleteItem}
              onEditClick={onEditClick}
            />
          )}
        </div>
      </section>
    </>
  );
}
export default Home;
