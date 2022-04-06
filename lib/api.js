
import Butter from "buttercms";




// Live project key: -  f3899a5a76e0e824b36515ca33aa825482fbb245

// Trail project key: -  ea231f0791208f77900fcd841fb209b99e9d6c10


export async function getSecurityAdvisories() {


    let butter = Butter('f3899a5a76e0e824b36515ca33aa825482fbb245');
    
    let params = {
        'locale': 'en',
        'preview': 1
    }
     
    const postResponse = await butter.page.retrieve('*', 'security-advisories', params)


    return postResponse?.data?.data;
}

const postsPageSize = 2;
const butter = Butter('ea231f0791208f77900fcd841fb209b99e9d6c10');

export async function getAllPostsPaginated(pageSize = postsPageSize) {
    const paginatedPosts = [];
    let currentPage = 1;
    while (!!currentPage) {
        const pagePostsData = await getPostsData(currentPage, pageSize);
        paginatedPosts[currentPage - 1] = pagePostsData.posts;
        currentPage = pagePostsData.nextPage;
    }
    return paginatedPosts;
}

export async function getPostsData(page = 1, pageSize = postsPageSize) {
    const response = await butter.post.list({
        page_size: pageSize,
        page: page,
    });

    return {
        posts: response.data.data,
        prevPage: response.data.meta.previous_page,
        nextPage: response.data.meta.next_page,
    };
}

export async function getPostData(slug) {
    const response = await butter.post.retrieve(slug);
    // console.log(response)

    return {
        posts: response.data.data,
       
    };
}


export async function getProductCollection() {


    let butter = Butter('f3899a5a76e0e824b36515ca33aa825482fbb245');
    
    let params = {
        'locale': 'en'
    }
     
    const postResponse = await butter.content.retrieve(["product_collection"], params);


    return postResponse?.data?.data.product_collection;
}
