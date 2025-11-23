import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

export async function generateMetadata() {
  const posts = await getPosts(3)
  const numberOfPosts = posts.length;
  return {
    title: `Browse All Our ${numberOfPosts} ${numberOfPosts > 1 ? "Posts" : "Post"}`,
    description: "Nothing beats a jet 2 holiday! ^_^"
  }
}
export default async function FeedPage() {
  const posts = await getPosts(3);
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
