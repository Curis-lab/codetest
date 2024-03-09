import CategoriesList from "./categories-list";
import Footer from "./footer";
import Post from "./post";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/all-post")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  function simpleDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const categories = {
    1: "Technology",
    2: "Tips & Ticks",
    3: "AI",
    4: "web dev",
    5: "programming",
  };
  return (
    <>
      <CategoriesList />
      {posts && posts.length> 0? posts.map((post) => (
        <Post
          key={post.post_id}
          id={post.post_id}
          author={"current user"}
          date={simpleDate(post.post_date)}
          thumbnail={post.imageURL}
          category={categories[post.category_id]}
          title={post.title}
          content={post.content}
          links={post.referencesURL.split(",") || []}
        />
      )):(<div>No Post to display</div>)}
      <Footer />
    </>
  );
}

export default Home;
