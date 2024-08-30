export default function Home() {
  const posts = [
    {
      author: "Magnus Flours",
      date: "Aug 30",
      title: "NEON OSS Next.js Starter Kit",
      tags: ["#devchallenge", "#neonchallenge", "#postgres", "#database"],
      reactions: 3,
      readTime: "1 min read",
    },
    {
      author: "Andy Arenas",
      date: "Aug 29",
      title: "React 18 Released",
      tags: ["#react", "#javascript", "#webdev"],
      reactions: 12,
      readTime: "2 min read",
    },
    {
      author: "Hazel Bulatao",
      date: "Aug 28",
      title: "Understanding Async/Await in JavaScript",
      tags: ["#javascript", "#async", "#webdev"],
      reactions: 5,
      readTime: "3 min read",
    },
    {
      author: "Tristan Gascon",
      date: "Aug 27",
      title: "CSS Grid vs. Flexbox: When to Use Which",
      tags: ["#css", "#webdesign", "#frontend"],
      reactions: 8,
      readTime: "4 min read",
    },
    {
      author: "Hazmin Diaz",
      date: "Aug 26",
      title: "Exploring Node.js Performance Tips",
      tags: ["#nodejs", "#performance", "#backend"],
      reactions: 10,
      readTime: "5 min read",
    },
  ];

  return (
    <main className="h-full bg-slate-50 mt-14">
      <div className="max-w-[1440px] px-8 py-4 m-auto flex space-x-4">
        <div className="w-60 p-4 max-w-xs bg-white">Tech Hive is a community of 1,980,279 amazing developers</div>
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex space-x-6">
            <p>Relevant</p>
            <p>Latest</p>
            <p>Top</p>
          </div>
          {posts.map((post, index) => (
            <div key={index} className="p-4 bg-white">
              <p>
                {post.author} {post.date} {post.title} {post.tags.join(" ")} {post.reactions} reactions Add Comment{" "}
                {post.readTime}
              </p>
            </div>
          ))}
        </div>
        <div className="max-w-xs p-4 bg-white">What&apos;s happening this week</div>
      </div>
    </main>
  );
}
