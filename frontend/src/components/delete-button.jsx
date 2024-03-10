import axios from "axios";

export default function DeleteButton(postId) {
  const handleDelete = (id) => {
    axios
      .get(`http://localhost:8080/delete-post/${id.postId}`)
      .then((res) => {
        if (res.data.status) {
          console.log("have been deleted");
        } else {
          console.log("have not been deleted");
        }
      })
      .catch((err) => console.log("error on delete post"));
  };
  return (
    <button className="text-red-600" onClick={() => handleDelete(postId)}>
      Delete
    </button>
  );
}
