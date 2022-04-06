import React from 'react'
import Image from "next/image";
import {
    getPostData
} from "../../lib/api";

export async function getStaticProps({ params }) {


    const { posts } = await getPostData(params.slug);


    // console.log(posts)
    return {
        props: { ...posts },
        revalidate: 1,
    };
}


export async function getStaticPaths() {
    let paths = [];
    return {
        paths,
        fallback: true
    };
}

export default function Post({ featured_image, body, title }) {
    return (
        <div>
            <Image
                src={featured_image}
                alt="Picture of the author"
                height={300}
                width={300}
            />
            <br></br>
           Title:  <span>{title}</span>
            <p dangerouslySetInnerHTML={{
              __html: body
            }}>
                
            </p>
        </div>
    )
}
