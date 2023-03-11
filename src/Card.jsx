import React, { useEffect, useState } from "react";

function Card({ blogs, deleteItem, onEditClick }) {
  return (
    <div id="blogpage" className="p-10 grid grid-cols-3 gap-8">
      {blogs?.length === 0 ? (
        <h1 className="font-mono text-center text-4xl">NO blogs!</h1>
      ) : (
        blogs?.map((blog, index) => {
          return (
            <div
              key={index}
              className="h-full max-w-sm  overflow-hidden shadow-2xl transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black rounded-2xl cursor-pointer hover:bg-gradient-to-r from-lime-600 "
            >
              <div className=" w-full max-h-72 overflow-y-scroll no-scrollbar">
                <img className="w-full" src={blog.image} alt="Blog" />
              </div>
              <div className="px-6 py-4b mt-3">
                <div className="mb-2 ">
                  <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </p>
                </div>
                <p className=" text-slate-100 text-base">
                  "I have not failed i have just found 10,000 ways that won't
                  work."
                  <br></br>
                  <span>-----Thomas Edison</span>
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span
                  onClick={(e) => deleteItem(e, index)}
                  className="hover:bg-gradient-to-r from-red-700 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  Delete
                </span>
                <span
                  onClick={(e) => onEditClick(e, blog)}
                  className=" hover:bg-gradient-to-l from-green-700  inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  edit
                </span>
                <span className=" hover:bg-gradient-to-l from-blue-900 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Read more..
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Card;
