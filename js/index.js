const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.news_category);
    return data.data.news_category;
}
const categoryBar = async () => {
    const allNews = await loadNews();
    // console.log(data);
    const categoryContainer = document.getElementById('category-container');

    for (const news of allNews) {
        const { category_name, category_id } = news;
        // console.log(category_id);
        const categoryUl = document.createElement('ul');
        categoryUl.innerHTML = `
        <li onclick="loadNewsDetails(${category_id})"><a>${category_name}</a></li>
        `;
        categoryContainer.appendChild(categoryUl);

    }

}

const loadNewsDetails = async (code) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${code}`);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = detail => {
    console.log(detail);
    const newsFeed = document.getElementById('news-feed');
    newsFeed.innerHTML = '';

    detail.sort((a, b) => b.total_view - a.total_view);
    const { author, category_id, details, image_url, others_info, rating, thumbnail_url, title, total_view, _id } = news;
    const { img, name, published_date } = author;
    detail.forEach(news => {
        const newsDiv = document.createElement('div');
        console.log(news);
        newsDiv.innerHTML = `
    
    <div id="news-feed" class="card card-side bg-base-100 shadow-xl">
                <figure class="p-5"><img src="https://placeimg.com/200/280/arch" alt="Movie"></figure>
                <div class="card-body">
                    <h2 class="card-title">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    <div class="card-actions flex-justify-btween">
                        <div class="flex">
                            <div class="pr-2">
                                <img class="w-10 rounded-full" src="" alt="">
                            </div>
                            <div>
                                <h6 class="font-medium">Jone Coper</h6>
                                <p>Jan, 10, 2022</p>
                            </div>
                        </div>
                        <div>

                            <p><i class="fa-regular fa-eye"></i><span class="font-semibold"> 1.5M</span>
                            </p>
                        </div>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <div><button class="btn btn-outline btn-info">Lern More</button></div>
                    </div>
                </div>
            </div>
    
    `;
        newsFeed.appendChild(newsDiv);
    })
    // const { author.img, } = detail;

    // console.log(detail);

}


categoryBar();

// displayNews();
