import Hero from "../components/Hero";
import Posts from "../components/posts";

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <h1>List of posts</h1>
      <Posts />
    </>
  );
};

export default HomeScreen;
