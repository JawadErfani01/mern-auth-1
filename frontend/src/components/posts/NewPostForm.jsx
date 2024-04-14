import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "../../slices/postApiSlice";
import { toast } from "react-toastify";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Store the selected image as a file object
  const [showForm, setShowForm] = useState(false);
  const [createPost] = useCreatePostMutation(); // Destructure createPost directly
  const { refetch } = useGetPostsQuery(); // Fetch posts data

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      await createPost(formData); // Use createPost directly with form data
      console.log("Post submitted successfully!");

      // Clear form fields after successful submission
      setTitle("");
      setContent("");
      setImage(null);
      setShowForm(false); // Hide the form after successful submission

      // Refetch the posts data to update the list
      refetch();
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div>
      {/* Button to toggle form visibility */}
      <div className="text-xl fixed bottom-10 right-10 cursor-pointer hover:scale-[0.95] duration-300 flex text-center justify-center items-center rounded-full">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white rounded-full w-16 h-16 flex justify-center items-center"
        >
          <FaPlus />
        </button>
      </div>
      {/* Form to add new post */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <form
            className="bg-white w-full sm:w-[70%] md:w-[50%] lg:w-[40%] mx-5 z-30 p-6 rounded-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-4">New Post</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block font-bold mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block font-bold mb-2">
                Image
              </label>
              <input
                type="file" // Change input type to file
                id="image"
                onChange={(e) => setImage(e.target.files[0])} // Store the selected file in state
                className="w-full p-2 border border-gray-300 rounded"
                accept="image/*" // Allow only image files
                required
              />
            </div>
            <div className="flex justify-between">
              {" "}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewPostForm;
