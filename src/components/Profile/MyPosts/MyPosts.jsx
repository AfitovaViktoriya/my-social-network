import React from "react";
import style from './myPosts.module.css';
import Post from "./Post/Post";
import { useFormik } from 'formik';

const MyPosts = (props) => {
  let postsElement = props.posts.map( (post) => <Post key={post.id} message={post.message} likesCount={post.likesCount} />)

  return (
    <div className={style.postsContainer}>
      <h2 className={style.item}>My posts</h2>
      <div>
        <AddPostForm/>
        {postsElement}
      </div>
    </div>
  );
};

const initialValues = {
  text: ''
}

const onSubmit = (values) => {
  console.log(values)
}

const validate = (values) => {
  let errors = {};

  if(!values.text) {
    errors.text = 'Required';
  // } else if (/^(?:(?![\s\n]+$)[\s\S])+$/.test(values.text)) {
  //   errors.text = 'Invalid format'
  }

  return errors;
}


const AddPostForm = (props) => {

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  console.log(formik.errors);

  return (
     <div>
       <form onSubmit={formik.handleSubmit}>
         <div className={style.formControl}>
           <textarea
            type='text'
            id='text'
            name='text'
            value={formik.values.text}
            onChange={formik.handleChange}
            onSubmit={formik.handleSubmit}
          />
          {formik.errors.text ? <div className={style.error}>{formik.errors.text}</div> : null}
         </div>

        <div><button type='submit'>Add post</button></div>
      </form>
    </div>
  )

}

export default MyPosts;
