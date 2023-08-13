import { Link } from 'react-router-dom';
import { formatDate } from '../utils';

const Blog = ({ blog }) => {
  return (
    <>
      <div className='border-b-2 border-dashed border-b-white p-8'>
        <h2 className='text-lg font-semibold'>
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h2>
        <p className='text-sm'>by {blog.author.name}</p>
        <p className='my-2'>{blog.description}</p>
        <div className='flex justify-between'>
          <div className='flex flex-wrap gap-2'>
            {blog.tags.map((tag) => (
              <a key={tag} href='0' className='bg-gray-950 px-2 py-1 text-sm'>
                {tag}
              </a>
            ))}
          </div>
          <p>{formatDate(blog.createdAt).toLowerCase()}</p>
        </div>
      </div>
    </>
  );
};

export default Blog;
