import * as React from "react";

import { FrontmatterEntry } from "@/lib/remark/types";
import { loadPostFrontmatterEntries } from "@/lib/writing.mjs";
import Anchor from "@/ui/core/anchor";
import Prose from "@/ui/core/prose";
import { useSeo } from "@/utils/seo";

import format from "date-fns/format";
import { GetStaticProps } from "next";

type WritingsPageProps = {
  posts: FrontmatterEntry[];
};

export default function WritingsPage({ posts }: WritingsPageProps) {
  const { Seo, title, description } = useSeo({
    title: "Writings",
    description: "My blog posts covering web development, personal thoughts, and various things",
  });

  return (
    <section>
      <Seo />

      <Prose>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
      </Prose>

      <ul className="p-4 space-y-4">
        {posts.map(([slug, post]) => (
          <li
            key={slug}
            className="relative p-4 -mx-4 space-y-2 bg-opacity-0 hover:bg-opacity-10 rounded hover:shadow-lg transition hover:-translate-y-1 bg-neutral-500"
          >
            <span className="float-right mb-2 ml-2 text-sm text-right text-neutral-500">
              {format(post.date, "PPP")}
            </span>
            <Anchor className="before:absolute before:inset-0" href={`/writings/${slug}`}>
              <h3 className="max-w-xl text-2xl font-bold tracking-tighter">{post.title}</h3>
            </Anchor>{" "}
            <p className="max-w-xl line-clamp-3 text-neutral-400">{post.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const getStaticProps: GetStaticProps<WritingsPageProps> = async () => {
  const posts = await loadPostFrontmatterEntries();
  return {
    props: {
      posts,
    },
  };
};
