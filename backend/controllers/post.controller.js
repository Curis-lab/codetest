import { getPostByID, getAllPost, deletePostById, updatePost } from "../database.js";

export const GetPostById = async (req, res) => {
  const post_id = req.params.id;
  const post = await getPostByID(post_id);
  res.send(post);
};
export const GetAllPost = async (req, res) => {
  const posts = await getAllPost();
  res.send(posts);
};
export const DeletePostById = async (req, res) => {
  const id = req.params.id;
  await deletePostById(id);
  res.json({ status: true });
};
export const CreatePost = async (req, res) => {
  const { user_id, title, imageURL, content, referencesURL, category_id } =
    req.body;

  const createdPost = await writePost(
    user_id,
    title,
    imageURL,
    content,
    referencesURL,
    category_id
  );

  res.status(201).send(createdPost);
};
export const UpdatePostById = async(req, res)=>{
    const postId = req.params.id;
    const {title, imageURL, content, category_id, links} = req.body;
    await updatePost(title, imageURL, content, category_id, links, postId);
    res.json({status:'success'})
  }