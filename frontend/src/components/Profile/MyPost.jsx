import { useEffect, useState } from "react";
import { getBackendImageDomain } from "../../utils/getBackendDomain";
import { useGetMePostsQuery } from "../../slices/postApiSlice";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const { data, error, isLoading } = useGetMePostsQuery();
  console.log(data);
  useEffect(() => {
    if (data) {
      setPosts(data?.posts);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {posts?.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="max-w-md mx-auto my-3 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
          >
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
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {post.title}
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

export default MyPost;
