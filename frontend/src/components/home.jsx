import CategoriesList from "./categories-list";
import Footer from "./footer";
import Post from "./post";
import { postsData } from "../data";


function Home() {
  return (
    <>
      <CategoriesList />
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            authorEmail={"test@email.com"}
            date={post.datepublished}
            thumbnail={post.thumbnail}
            category={post.category}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div>No Posts to display</div>
      )}
      <Footer/>
    </>
  );
}

export default Home;
