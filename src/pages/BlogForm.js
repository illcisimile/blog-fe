import { useState, useRef } from 'react';
import { useField } from '../hooks';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { newBlog } from '../reducers/blogReducer';

import Container from '../components/Container';
import BlogEditor from '../components/BlogEditor';

const BlogForm = () => {
  const title = useField('text');
  const description = useField('text');
  const content = useField('text');
  const tag = useField('text');
  const [tags, setTags] = useState([]);
  const tagRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePublish = (event) => {
    event.preventDefault();

    const blog = {
      title: title.input.value,
      description: description.input.value,
      content: content.input.value,
      tags,
    };

    dispatch(newBlog(blog))
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  };

  const handleTag = (event) => {
    if (event.key !== 'Enter') return;

    if (tag.input.value === '') {
      alert('cannot be empty');
    } else if (
      tags.find((t) => t.toLowerCase() === tag.input.value.toLowerCase())
    ) {
      alert('already added');
    } else {
      setTags(tags.concat(tag.input.value));
    }

    tag.reset();
    tagRef.current.focus();
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <>
      <Helmet>
        <title>new blog | blog: any</title>
      </Helmet>
      <Container semantic='main'>
        <div className='p-8'>
          <h1 className='mb-4 text-center text-xl'>create a new blog</h1>
          <form>
            <div className='mb-4'>
              <label className='block'>title</label>
              <input
                {...title.input}
                className='mt-2 w-full rounded-md border-2 border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none'
                placeholder='Hello, world!'
              />
            </div>
            <div className='mb-4'>
              <label className='block'>description</label>
              <input
                {...description.input}
                className='mt-2 w-full rounded-md border-2 border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none'
                placeholder='Some say polymath; some say dilettante. I specialize in everything.'
              />
            </div>
            <div className='mb-4'>
              <label className='mb-2 block'>content</label>
              <BlogEditor
                html={content.input.value}
                handleChange={content.input.onChange}
              />
            </div>
            <div className='mb-4'>
              <label className='block'>enter tag</label>
              <input
                {...tag.input}
                className='mt-2 w-full rounded-md border-2 border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none'
                placeholder='press Enter to add a new tag'
                ref={tagRef}
                onKeyUp={handleTag}
              />
            </div>
            {tags.length > 0 && (
              <div className='mb-4 flex w-full flex-wrap items-center gap-2'>
                <label className='block'>Tags:</label>
                {tags.map((t) => (
                  <div
                    key={t}
                    className='flex gap-1 rounded-full border-2 border-black px-2 py-1 text-sm hover:bg-black hover:text-white'
                    onClick={() => removeTag(t)}
                  >
                    <p>{t}</p>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </div>
                ))}
              </div>
            )}
            <button
              className='w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 hover:bg-black hover:text-white'
              type='button'
              onClick={handlePublish}
            >
              publish
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default BlogForm;