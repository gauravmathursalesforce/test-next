import { Feed } from "feed";

export const generateRSSFeed = (sections, pageTitle, desc) => {

    const baseUrl = 'http://localhost:3000';
    const author = {
      name: 'Gaurav Mathur',
      email: 'gaurav.mathur@salesforce.com',
      link: 'https://trailblazer.me/id/gmathur05',
    };
  
    // Construct a new Feed object
    const feed = new Feed({
      title: pageTitle,
      description: desc,
      id: baseUrl,
      link: baseUrl,
      language: 'en',
      feedLinks: {
        rss2: `${baseUrl}/rss.xml`,
      },
      author,
    });
  
    // Add each article to the feed
    sections.forEach((post) => {
        post.fields.sfs_security_advisory.forEach((item) => {
            const {
                sfs_security_advisory_date_of_attack,
                sfs_security_advisory_nature_of_attack,
                sfs_security_advisory_subject,
                sfs_security_advisory_type,
                sfs_security_advisory_title
              } = item;
              const url = `${baseUrl}/rss.xml`;
          
              feed.addItem({
                title: sfs_security_advisory_subject ,
                id: url,
                link: url,
                description: sfs_security_advisory_date_of_attack,
                content : sfs_security_advisory_nature_of_attack ,
                guid: sfs_security_advisory_subject,
                date: new Date(),
              });
        })

    });


  
    // Write the RSS output to a public file, making it
    // accessible at ashleemboyer.com/rss.xml
    // fs.writeFileSync('rss.xml', feed.rss2());


    return feed.rss2();
  };