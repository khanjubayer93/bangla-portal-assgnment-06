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
        categoryUl.classList.add('menu')
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
    const newsFeed = document.getElementById('news-feed');
    newsFeed.innerHTML = '';


    detail.sort((a, b) => b.total_view - a.total_view);
    detail.forEach(news => {
        const { title, thumbnail_url, details, total_view } = news;
        const { img, name, published_date } = news.author;

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news')
        newsDiv.innerHTML = `
    
    <div id="news-feed" class="card card-side bg-base-100 shadow-xl flex justify-between w-full mb-4">
                <figure class="p-5 w-1/2"><img src="${thumbnail_url}" alt=""></figure>
                <div class="card-body">
                    <h2 class="card-title">${title}</h2>
                    <p>${details.slice(0, 500) + '...'}</p>
                    <div class="card-actions">
                        <div class="">
                            <div class="pr-2">
                                <img class="w-10 rounded-full" src="${img}" alt="">
                            </div>
                            <div>
                                <h6 class="font-medium">${name}</h6>
                                <p>${published_date}</p>
                            </div>
                        </div>
                        <div class="">
                            <p><i class="fa-regular fa-eye"></i><span class="font-semibold"> ${total_view}M</span>
                            </p>
                        </div>
                        <div class="">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <div class="btn btn-outline btn-info "><button>Lern More</button></div>
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
