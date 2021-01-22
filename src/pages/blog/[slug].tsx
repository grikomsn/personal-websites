import { stringify } from "querystring";
import * as React from "react";

import { BlogJsonLd, BreadcrumbJsonLd, NextSeo } from "next-seo";
import {
  Box,
  Divider,
  HStack,
  Heading,
  Img,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import type { BlogPost } from "@/generated/graphql";
import Error from "next/error";
import Markdown from "react-markdown";
import { cms } from "@/lib/cms";
import dateFnsFormat from "date-fns/format";
import { postRenderer } from "@/utils/renderers";
import siteConfig from "site-config";
import { useRouter } from "next/router";

interface BlogPostPageProps {
  post: BlogPost;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  const data = await cms().blogPostStaticProps({ slug });

  return {
    props: {
      post: data.blogPostCollection.items[0] ?? null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await cms().blogPostStaticPaths();

  return {
    paths: data.blogPostCollection.items.map((params) => ({ params })),
    fallback: false,
  };
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const { isFallback } = useRouter();

  if (!isFallback && !post) {
    return <Error statusCode={404} title="Post not found" />;
  }

  const discussUrl = `https://twitter.com/search?${stringify({
    q: `${siteConfig.url}/blog/${post.slug}`,
  })}`;

  const shareUrl = `https://twitter.com/share?${stringify({
    url: `${siteConfig.url}/blog/${post.slug}`,
    text: `${post.title}`,
    via: siteConfig.twitterUsername.split("@").pop(),
  })}`;

  const postedAtIso = new Date(post.postedAt).toISOString();

  const socialImageUrl = `${siteConfig.url}/blog/${post.slug}/social.png`;

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.subtitle}
        openGraph={{
          title: post.title,
          description: post.subtitle,
          type: "article",
          article: {
            publishedTime: postedAtIso,
            modifiedTime: postedAtIso,
            authors: [siteConfig.url],
            tags: post.tags.map((t) => t.trim()),
          },
          images: [
            {
              url: socialImageUrl,
              width: 1024,
              height: 512,
              alt: post.title,
            },
          ],
        }}
      />

      <BlogJsonLd
        url={`${siteConfig.url}/blog/${post.slug}`}
        title={post.title}
        images={post.image ? [socialImageUrl] : []}
        datePublished={postedAtIso}
        dateModified={postedAtIso}
        authorName={siteConfig.title}
        description={post.subtitle}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Blog Posts",
            item: `${siteConfig.url}/blog`,
          },
          {
            position: 2,
            name: post.title,
            item: `${siteConfig.url}/blog/${post.slug}`,
          },
        ]}
      />

      <Box as="article" bgColor="gray.700" borderRadius="md">
        {post.image && (
          <Box
            backgroundColor="gray.100"
            borderTopLeftRadius={{ base: 0, md: 4 }}
            borderTopRightRadius={{ base: 0, md: 4 }}
            overflow="hidden"
          >
            <Img alt={post.title} src={post.image.url} />
          </Box>
        )}
        <Stack
          as="header"
          alignItems="center"
          p={8}
          spacing={4}
          textAlign="center"
        >
          <Heading>{post.title}</Heading>
          <Heading fontWeight="normal" lineHeight="base" size="md">
            {post.subtitle}
          </Heading>
          <Text color="gray.400" fontSize="sm">
            Posted at {dateFnsFormat(new Date(), "LLLL do, uuuu")}
          </Text>
        </Stack>

        <Box px={8} py={4}>
          <Divider />
        </Box>

        <Stack
          fontSize={{ md: "lg" }}
          lineHeight="tall"
          p={8}
          spacing={8}
          wordBreak="break-word"
        >
          <Markdown
            escapeHtml={false}
            renderers={postRenderer}
            source={post.content}
          />
        </Stack>

        <HStack p={8} spacing={4}>
          <Box flexGrow={1}>
            <Divider />
          </Box>
          <Stack fontSize="sm" isInline>
            <Link href={discussUrl} isExternal variant="link">
              Discuss on Twitter
            </Link>
            <span>·</span>
            <Link href={shareUrl} isExternal variant="link">
              Share on Twitter
            </Link>
          </Stack>
        </HStack>
      </Box>
    </>
  );
};

export default BlogPostPage;