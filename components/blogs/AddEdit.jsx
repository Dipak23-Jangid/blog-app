import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { blogService, alertService } from "services";

export { AddEdit };

function AddEdit(props) {
  const blog = props?.blog;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    author: Yup.string().required("Author is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // edit mode default value
  if (blog) {
    formOptions.defaultValues = props.blog;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    alertService.clear();
    try {
      // create or update user based on user prop
      let message;
      if (blog) {
        await blogService.update(blog.id, data);
        message = "Blog updated";
      } else {
        await blogService.create(data);
        message = "Blog added";
      }

      // redirect to blog list with success message
      router.push("/blogs");
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          name="title"
          type="text"
          {...register("title")}
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.title?.message}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          name="content"
          {...register("content")}
          className={`form-control ${errors.content ? "is-invalid" : ""}`}
          rows="10"
        ></textarea>
        <div className="invalid-feedback">{errors.content?.message}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          name="author"
          type="text"
          {...register("author")}
          className={`form-control ${errors.author ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.author?.message}</div>
      </div>
      <div className="mb-3">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary me-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm me-1"></span>
          )}
          Save
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/blogs" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
