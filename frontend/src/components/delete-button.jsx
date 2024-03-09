import axios from 'axios';

export default function DeleteButton(postId) {
  const handleDelete = (id)=>{
    axios.get(`http://localhost:8080/posts/${id}`)
    .then(res=>console.log('success'))
    .catch(err=>console.log('error on delete post'));   
  }
  return <button className="text-red-600" onClick={()=>handleDelete(postId)}>Delete</button>;
}
