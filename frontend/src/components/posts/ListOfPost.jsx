import { useEffect, useState } from "react";
import { getBackendImageDomain } from "../../utils/getBackendDomain";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../slices/postApiSlice"; // Import useDeletePostMutation
import { IoMdMore } from "react-icons/io";

const ListOfPost = () => {
  const [selectedPost, setSelectedPost] = useState(null); // Track selected post for more options
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation(); // Destructure deletePost from useDeletePostMutation

  useEffect(() => {
    if (error) {
      console.error("Error fetching posts:", error);
    }
  }, [error]);

  const handleMoreOptionsClick = (postId) => {
    setSelectedPost(postId === selectedPost ? null : postId); // Toggle selected post
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id); // Call deletePost mutation with post ID
      setSelectedPost(null); // Reset selected post after deletion
      refetch();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts?.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="max-w-md mx-auto my-3 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl relative"
          >
            <div className="absolute top-5 right-5 ">
              <IoMdMore
                size={24}
                onClick={() => handleMoreOptionsClick(post._id)} // Handle click on more options icon
                className="cursor-pointer"
              />
              {selectedPost === post._id && ( // Show more options if post is selected
                <div className="absolute right-4 top-2 bg-white p-2 rounded-md shadow-md">
                  <button
                    onClick={() => handleDelete(post._id)} // Pass post ID to handleDelete
                    className="border w-full my-2 bg-red-400 text-white rounded-md px-1"
                  >
                    Delete
                  </button>
                  <button className="border w-full my-2 bg-green-400 text-white rounded-md px-1">
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:w-48"
                  src={
                    post.image
                      ? `${getBackendImageDomain()}/${post.image}`
                      : "https://source.unsplash.com/random/400x200"
                  }
                  alt="Park image"
                />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-center ">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {post.title}
                  </div>
                </div>
                <p className="mt-2 text-gray-500">{post.content}</p>
                <div className="flex items-center mt-4">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={`${getBackendImageDomain()}/${post.author.image}`}
                    alt="Author image"
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">
                      {post.author.name}
                    </p>
                    <p className="text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 className="capitalize m-5 text-center py-3 border-t-2 text-red-500 text-xl">
          there is no any post
        </h2>
      )}
    </div>
  );
};

export default ListOfPost;
