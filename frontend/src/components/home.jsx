import CategoriesList from "./categories-list";
import Footer from "./footer";
import Navbar from "./navbar";
import Post from "./post";
import { postsData } from "../data";

function Home() {
  return <div>
    <h1>Hello</h1>
  </div>;
}
export default Home;
// function Home() {
//   return (
//     <div className="lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl flex flex-col px-8">
//       <Navbar />
//       <CategoriesList />
//       {postsData && postsData.length > 0 ? (
//         postsData.map((post) => (
//           <Post
//             key={post.id}
//             id={post.id}
//             author={post.author}
//             authorEmail={"test@email.com"}
//             date={post.datepublished}
//             thumbnail={post.thumbnail}
//             category={post.category}
//             title={post.title}
//             content={post.content}
//             links={post.links || []}
//           />
//         ))
//       ) : (
//         <div>No Posts to display</div>
//       )}
//       <Footer/>
//     </div>
//   );
// }

// export default Home;
