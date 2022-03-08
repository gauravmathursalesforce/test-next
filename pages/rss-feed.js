import React from 'react'
import {
    getSecurityAdvisories
} from "../lib/api";
import { generateRSSFeed } from "../lib/feed";

export async function getServerSideProps({ res }) {
    let response = await getSecurityAdvisories();
    let fields = response.fields.sections.filter((item) => item.type == "sfs_security_advisory_section");
    // console.log(fields)
    let feed = generateRSSFeed(fields, response.name, response.fields.resource_link_text)


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- We'll render the URLs for our sitemap here. -->
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(feed);
    res.end();
    return {
        props: { }
    }
}

export default function RssFeed() {
}
