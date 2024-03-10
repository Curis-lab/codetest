import { categoriesData } from "../data";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

export default function EditPost() {

  const {post_id} = useParams();

  const [links, setLinks] = useState([]);
  const [inputLinks, setInputLinks] = useState("");

  const [title, setTitle] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [content, setContent] = useState("");
  const [ctg, setCtg] = useState(0);

  const navigate = useNavigate();

  const addLink = (e) => {
    e.preventDefault();
    if (inputLinks.trim() !== "") {
      setLinks((prev) => [...prev, inputLinks]);
      setInputLinks("");
    }
  };

  const deleteLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const linkToString = links.join(',');
    // axios.put(`http://localhost:8080/post/${post_id}`,{
    //   title,
    //   imgLink,
    //   content,
    //   category_id:ctg,
    //   linkToString
    // }).then(res=>console.log(res))
    // .catch(err=>console.log('err'));
  };

  useEffect(()=>{
    axios.get(`http://localhost:8080/postbyid/${post_id}`)
    .then(res=>{
      const ref_links = res.data[0].referencesURL.split(',');
      setTitle(res.data[0].title);
      setContent(res.data[0].content);
      setImgLink(res.data[0].imageURL);
      // setCtg(res.data[0].category_id);
      setLinks(ref_links);
    })
    .catch(err=>console.log('err'));
  },[post_id]);

  return (
    <div>
      <h2>Create Post</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="link for image"
          value={imgLink}
          onChange={(e) => setImgLink(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {links &&
          links.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </span>
              <Link href={link} className="link">
                {link}
              </Link>
              <span className="cursor-pointer" onClick={() => deleteLink(i)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </span>
            </div>
          ))}
        <div className="flex gap-2">
          <input
            className="flex-1"
            type="text"
            placeholder="Paste the link and click on Add"
            onChange={(e) => setInputLinks(e.target.value)}
            value={inputLinks}
          />
          <button onClick={addLink} className="btn flex items-center gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            Add
          </button>
        </div>
        <select
          value={ctg}
          onChange={(e) => setCtg(e.target.value)}
          className="p-3 rounded-md border appearance-none"
        >
          <option value={0}>Select a categories</option>
          {categoriesData &&
            categoriesData.map((cateory) => (
              <option key={cateory.id} value={cateory.id}>
                {cateory.name}
              </option>
            ))}
        </select>
        <button type="submit" className="primary-btn">
          Create Post
        </button>
        <div className="p-2 text-red-500 font-bold">Error Message</div>
      </form>
    </div>
  );
}
