// Assuming this is your IndexPage component

"use client";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Post } from "./lib/interface";

async function getData(): Promise<Post[]> {
  try {
    const response = await fetch('/posts.json');
    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function IndexPage() {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await getData();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>

      <ul>
        {data.map((post) => (
          <li key={post._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div>
                <p className="text-base font-medium leading-6 text-teal-500">
                  {/* {post.createdAt ? new Date(post.createdAt).toISOString().split("T")[0] : ''} */}
                </p>
              </div>

              <Link href={`/post/${post.slug.current}`} >
                {/* <a className="space-y-3 xl:col-span-3"> */}
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                  </div>

                  <p className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
                    {post.overview}
                  </p>
                {/* </a> */}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
