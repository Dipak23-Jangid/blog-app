import { Layout, AddEdit } from 'components/blogs';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Add Blog</h1>
            <hr></hr>
            <AddEdit />
        </Layout>
    );
}