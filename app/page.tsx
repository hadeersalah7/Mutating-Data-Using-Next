import { Suspense } from 'react';

import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Latest Post",
  description: "Browse out latest post and enjoy a variety of posts!"
}
async function LatestPosts() {

  const latestPosts = await getPosts(3);
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here's what you might've missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
