import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {
    getPostsData, getAllPostsPaginated
} from "../../../lib/api";


export async function getStaticProps({ params }) {
    const page = parseInt(params.page, 10);
    const { posts, prevPage, nextPage } = await getPostsData(page);


    return {
        props: { posts, prevPage, nextPage },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    let paths =[];
    return {
        paths,
        fallback: true,
    };
}

export default function Posts({ posts, prevPage, nextPage }) {
    return (
        <div>
            {posts && posts.map((post, i) => {
                return (
                    <div key={i}>
                        <Image
                            src={post.featured_image}
                            alt="Picture of the author"
                            height={300}
                            width={300}
                        />

                        <Link href={`/posts/${post.slug}`}>
                            <a>{post.title}</a>
                        </Link>
                    </div>
                );
            })}

            <div>
                {prevPage && (
                    <Link href={`/posts/page/${prevPage}`}>
                        <a>Prev</a>
                    </Link>
                )}
                {nextPage && (
                    <Link href={`/posts/page/${nextPage}`}>
                        <a>Next</a>
                    </Link>
                )}
            </div>
        </div>
    )
}
