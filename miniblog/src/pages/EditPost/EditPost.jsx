import { useEffect, useState } from 'react';
import styles from "./EditPost.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)


  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }

  }, [post])

  const { user } = useAuthValue()

  const { updateDocument, response } = useUpdateDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    setTitle("")
    setImage("")
    setBody("")
    setTags([])
    navigate("/dashboard")
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do Post como desejar!</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input type="text" name="title" required placeholder='Pense em um bom título' value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input type="text" name="image" required placeholder='Insira uma imagem que representa sdeu Post' value={image} onChange={(e) => setImage(e.target.value)} />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
            <label>
              <span>Conteúdo:</span>
              <textarea name="body" required placeholder='Insira o conteúdo do Post' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input type="text" name="tags" required placeholder='Insira as Tags separadas por vírgula' value={tags} onChange={(e) => setTags(e.target.value)} />
            </label>
            {!response.loading && <button className='btn'>Editar</button>}
            {response.loading && <button className='btn' disabled >Aguarde...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost