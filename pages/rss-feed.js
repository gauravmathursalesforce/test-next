
import {
  getSecurityAdvisories, getProductCollection
} from "../lib/api";
import { generateRSSFeed } from "../lib/feed";

export async function getServerSideProps(context) {

  let response = await getSecurityAdvisories();
  let collection = await getProductCollection();

  let coll = [];
  collection.forEach(element => {
    coll.push(element.name)
  });
  let fields = [];
  if (context.query.product && coll.indexOf(context.query.product) > -1) {
    let output = response.fields.sections.filter((item) => item.type == "sfs_security_advisory_section");

    const checkProductName = obj => obj.name === context.query.product;

    output.forEach((item) => {
      let ins = item.fields.sfs_security_advisory.filter((him) => {
        return him.product.find(checkProductName)
      })
      fields.push({
        "type": "sfs_security_advisory_section",
        "fields": {
          "display": item.display,
          "sfs_security_advisory_title": item.sfs_security_advisory_title,
          "position": item.position,
          "sfs_security_advisory": [
            ...ins
          ]
        }
      })
    });
  } else if (!context.query.product)  {
    fields = response.fields.sections.filter((item) => item.type == "sfs_security_advisory_section");
  } else {
    context.res.writeHead(404)
    context.res.end();
  }

  let feed = generateRSSFeed(fields, response.name, response.fields.resource_link_text)


  context.res.setHeader("Content-Type", "text/xml");
  context.res.write(feed);
  context.res.end();


  return {
    props: {}
  }
}

export default function RssFeed() {
}
