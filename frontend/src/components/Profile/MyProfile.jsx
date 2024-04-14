import { useEffect, useState } from "react";
import { getBackendImageDomain } from "../../utils/getBackendDomain";
import { useGetProfileQuery } from "../../slices/usersApiSlice";

const MyProfile = () => {
  const { data, error, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div
        key={data.user._id}
        className="max-w-md mx-auto my-3 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={
                data.user.image
                  ? `${getBackendImageDomain()}/${data.user.image}`
                  : "https://source.unsplash.com/random/400x200"
              }
              alt="Park image"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {data.user.name}
            </div>
            <p className="mt-2 text-gray-500">{data.user.email}</p>
            <p className="mt-2 text-gray-500">
              Number Of Post:{" "}
              <span className="font-bold"> {data.numberOfPost}</span>
            </p>
            <p className="mt-2 text-gray-500">
              Last Post:{" "}
              <span className="font-bold border-b-2 border-blue-300 capitalize bold">
                {data.lastPost.title}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
