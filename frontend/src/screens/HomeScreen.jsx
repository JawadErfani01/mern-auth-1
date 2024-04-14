import Hero from "../components/Hero";
import ListOfPost from "../components/posts/ListOfPost";
import NewPostForm from "../components/posts/NewPostForm";
const HomeScreen = () => {
  return (
    <>
      <Hero />
      <h1 className="text-center text-3xl m-5 capitalize">List of posts</h1>
      <NewPostForm />
      <ListOfPost />
    </>
  );
};

export default HomeScreen;
