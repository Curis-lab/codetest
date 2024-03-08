
import { BrowserRouter as Link } from 'react-router-dom';
import DeleteButton from "./delete-button";

export default function Post({
  id,
  author,
  date,
  thumbnail,
  authorEmail,
  title,
  content,
  links,
  category,
}) {
  const isEditable = true;
  return (
    <div className="my-5 border-b border-blue-300 py-8">
      <div className="my-4">
        Posted by:<span className="font-bold">{author}</span> on {date}
      </div>
      <div className="relative w-full h-72">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="imag"
            className="object-cover object-center rounded-md"
          />
        ) : (
          <img
            src={"/default.jpg"}
            alt="Default"
            fill
            className="object-cover rounded-md object-center"
          />
        )}
      </div>
      {category && (
        <Link
          className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block"
          to={`category/${category}`}
        >
          {category}
        </Link>
      )}
      <h2>{title}</h2>
      <p className="content">{content}</p>
      {links && (
        <div className="my-4 flex flex-col gap-3">
          {links.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <Link href={link} className="link">
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}
      {isEditable && (
        <div className="flex gap-3 font-bold py-2 px-4 w-fit rounded-md bg-slate-200">
          <Link href={`/edit-post/${id}`}>Edit</Link>
          <DeleteButton />
        </div>
      )}
    </div>
  );
}
