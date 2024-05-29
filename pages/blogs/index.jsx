import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Spinner } from "components";
import { Layout } from "components/blogs";
import { blogService, alertService } from "services";

export default Index;

function Index() {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    blogService.getAll().then((x) => setBlogs(x));
  }, []);

  function deleteBlog(id) {
    setBlogs(
      blogs.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );

    try {
      blogService
        .delete(id)
        .then(() => {
          setBlogs((blogs) => blogs.filter((x) => x.id !== id));
          alertService.success("Blog Deleted", true);
        })
        .catch((error) => {
          alertService.error(
            error.message || "An error occurred while deleting the blog."
          );
          console.error("Error deleting blog:", error);
        });
    } catch (error) {
      alertService.error(error.message || "An unexpected error occurred.");
      console.error("Unexpected error:", error);
    }
  }

  return (
    <Layout>
      <Head>
        <title>My Blogs: Blogging Platform</title>
      </Head>
      <h1>My Blogs</h1>
      <Link href="/blogs/add" className="btn btn-sm btn-success mb-2">
        Add Blog
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Title</th>
            <th style={{ width: "50%" }}>Content</th>
            <th style={{ width: "10%" }}>Author</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {blogs &&
            blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.content}</td>
                <td>{blog.author}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/blogs/edit/${blog.id}`}
                    className="btn btn-sm btn-primary me-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="btn btn-sm btn-danger btn-delete-blog"
                    style={{ width: "60px" }}
                    disabled={blog.isDeleting}
                  >
                    {blog.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!blogs && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {blogs && !blogs.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Blogs To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
