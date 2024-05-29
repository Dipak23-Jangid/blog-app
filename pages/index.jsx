import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Spinner } from "components";
import { Layout } from "components/blogs";
import { blogService, userService } from "services";

export default Home;

function Home() {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    blogService.getAllPublic().then((x) => setBlogs(x));
  }, []);

  return (
    <Layout>
      <Head>
        <title>Blogging Platform</title>
      </Head>
      <div className="p-4">
        <div className="container">
          <div className="row">
          {blogs &&
            blogs.map((blog) => (
              
                  <div   key={blog.id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.content.substring(0, 100)}...</p>
                      </div>
                    </div>
                  </div>
              
            ))} 
            </div>
             {!blogs && (
                <Spinner />
          )}
          {blogs && !blogs.length && (
          <div className="alert alert-info text-center bg-info1 text-white1" role="alert">
            No blogs available at this moment.
          </div>
            
          )}
        </div>
      </div>
    </Layout>
  );
}
