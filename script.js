// const api = "pub_467191315b21252f9281aae32a54304e4fc3e"
// const api = "pub_46720c157851a3fbaea6b2066aea12ec31fb5"
// const api = "pub_4672983141bb7e69268e400242a0c8e80795d"

const apiKeys = [
    "pub_4677528d8ab6cd621e3c071855b1b0fdcd717", "pub_467772e57fc3ab14fbf91ed6580fa05269cb2",
    "pub_46778de96741fbf557af341100e4065772b2e",
    "pub_46781fbac0a433b60b9ff6a8d8b22ece8f4c0",
    "pub_467825a65f98d89cdb23a5bc4ddf022f1c802",
    "pub_467857befdebfb9f586f558a4d2d7f198b2fb"
]

const api = apiKeys[Math.floor(Math.random() * 6)]

var container = document.querySelector(".newsSection");

function limitWords(str, limit) {
    let words = str.split(' ');

    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + ' ...';
    } else {
        return str;
    }
}

gsap.from('.logo', {
    duration: 2,
    x: -500,
    ease: "circle.inOut"
})

const fetchNews = async () => {

    const url = `https://newsdata.io/api/1/latest?apikey=${api}&language=en`

    const res = await fetch(url);
    const newsData = await res.json();
    container.innerHTML = ''
    newsData.results.slice(2).map((news, i) => {
        var newDiv = document.createElement("div");

        // Create an image element
        var img = document.createElement("img");
        img.classList.add('box-img')
        // Set the src attribute of the image
        img.src = news.image_url || 'https://www.shutterstock.com/shutterstock/photos/1928997539/display_1500/stock-vector-breaking-news-template-with-d-red-and-blue-badge-breaking-news-text-on-dark-blue-with-earth-and-1928997539.jpg'; // Replace with your image URL
        // Optionally, set other attributes like alt, width, height
        img.alt = "Placeholder Image";

        const title = document.createElement("h4");
        title.classList.add('title')
        window.screen.width > 1000 ?
            title.innerText = limitWords(news.title, 10)
            :
            title.innerText = limitWords(news.title, 6)

        const read = document.createElement(`div`)
        read.innerHTML = `<sl-icon name="arrow-up-right-circle"></sl-icon>`
        read.classList.add("readMore")
        // Append the image to the new div
        newDiv.appendChild(img);
        newDiv.appendChild(title);
        newDiv.appendChild(read)

        newDiv.classList.add(`box`)
        newDiv.classList.add(`box-${i}`)
        // Append the new div to an existing element
        container.appendChild(newDiv);
        var newsBox = document.querySelectorAll(".box")

        newsBox[i].addEventListener('click', async () => {
            animateBox(i)
            newsBox.innerHTML = ''
            newsBox.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 50%; right: -50%; transform: translate(50%, 200%);"></sl-spinner>`
            window.location.href = news.link
        })

        newsBox[i].addEventListener('mouseenter', async () => {
            gsap.fromTo(`.box-${i}`,
                {
                    scale: 1,
                    ease: 'none'
                },
                {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power.in'
                })
        })

        newsBox[i].addEventListener('mouseleave', async () => {
            gsap.to(`.box-${i}`, {
                scale: 1,
            })
        })

    })
    gsap.from(`.box`, {
        opacity: 0,
        y: 200,
        ease: 'none'
    })
    gsap.to(`.box`, {
        opacity: 1,
        y: 0,
        ease: 'power.inOut'
    })

}
window.screen.width > 1000 ?
    container.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 50%; right: -50%; transform: translate(50%, 200%);"></sl-spinner>`
    :
    container.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 0%; right: 0%; transform: translate(0%, 20%);"></sl-spinner>`

fetchNews();

const fetchRecentNews = async () => {
    const url = 'https://newsdata.io/api/1/latest?apikey=' + api
    const res = await fetch(url);
    const newsData = await res.json();

    newsData.results.slice(2).map((news, i) => {
        var newDiv = document.createElement("div");

        // Create an image element
        var img = document.createElement("img");
        img.classList.add('box-img')
        // Set the src attribute of the image
        img.src = news.image_url || 'https://www.shutterstock.com/shutterstock/photos/1928997539/display_1500/stock-vector-breaking-news-template-with-d-red-and-blue-badge-breaking-news-text-on-dark-blue-with-earth-and-1928997539.jpg'; // Replace with your image URL
        // Optionally, set other attributes like alt, width, height
        img.alt = "Placeholder Image";

        const title = document.createElement("h4");
        title.classList.add('title')
        window.screen.width > 1000 ?
            title.innerText = limitWords(news.title, 10)
            :
            title.innerText = limitWords(news.title, 6)

        const read = document.createElement(`div`)
        read.innerHTML = `<sl-icon name="arrow-up-right-circle"></sl-icon>`

        // Append the image to the new div
        newDiv.appendChild(img);
        newDiv.appendChild(title);
        newDiv.appendChild(read)

        newDiv.classList.add('rbox')
        newDiv.classList.add(`rbox-${i}`)
        read.classList.add("readMore")

        // Append the new div to an existing element
        var container = document.querySelector(".recentNewsSection");
        container.appendChild(newDiv);
        newDiv.appendChild(read)
        var newsBox = document.querySelectorAll(".rbox")

        newsBox[i].addEventListener('click', async () => {
            animateRecentBox(i)
            newsBox.innerHTML = ''
            newsBox.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 50%; right: -50%; transform: translate(50%, 200%);"></sl-spinner>`
            window.location.href = news.link
        })

        newsBox[i].addEventListener('mouseenter', async () => {
            gsap.fromTo(`.rbox-${i}`,
                {
                    scale: 1,
                    ease: 'none'
                },
                {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power.in'
                })
        })

        newsBox[i].addEventListener('mouseleave', async () => {
            gsap.to(`.rbox-${i}`, {
                scale: 1,
                duration: 0.1,
                ease: 'power.inOut'
            })
        })

        gsap.from(`.rbox`, {
            opacity: 0,
            y: 1000,
            ease: 'none'
        })
        gsap.to(`.rbox`, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: 'none'
        })
    })

}
fetchRecentNews()

const btn = document.querySelector('.filterBtn');
btn.addEventListener('click', () => {
    const lang = document.querySelector('#dd_l').value
    const country = document.querySelector('#dd_c').value
    const category = document.querySelector('#dd_ct').value
    var container = document.querySelector(".newsSection");


    const fetchNews = async () => {

        const url = `https://newsdata.io/api/1/latest?apikey=${api}&language=${lang}&country=${country}&category=${category}`

        const res = await fetch(url);
        const newsData = await res.json();

        if (newsData.results.length === 0) {
            container.innerHTML = ''
            container.innerHTML = "<h1>No Such Post Found</h1>"
            return
        }

        container.innerHTML = ''
        newsData.results?.slice(2).map((news, i) => {
            var newDiv = document.createElement("div");

            // Create an image element
            var img = document.createElement("img");
            img.classList.add('box-img')
            // Set the src attribute of the image
            img.src = news.image_url || 'https://www.shutterstock.com/shutterstock/photos/1928997539/display_1500/stock-vector-breaking-news-template-with-d-red-and-blue-badge-breaking-news-text-on-dark-blue-with-earth-and-1928997539.jpg'; // Replace with your image URL
            // Optionally, set other attributes like alt, width, height
            img.alt = "Placeholder Image";

            const title = document.createElement("h4");
            title.classList.add('title')
            window.screen.width > 1000 ?
                title.innerText = limitWords(news.title, 10)
                :
                title.innerText = limitWords(news.title, 6)

            const read = document.createElement(`div`)
            read.innerHTML = `<sl-icon name="arrow-up-right-circle"></sl-icon>`
            read.classList.add("readMore")

            // Append the image to the new div
            newDiv.appendChild(img);
            newDiv.appendChild(title);
            newDiv.appendChild(read)
            newDiv.classList.add('box')
            newDiv.classList.add(`box-${i}`)

            // Append the new div to an existing element
            container.appendChild(newDiv);

            var newsBox = document.querySelectorAll(".box")
            newsBox[i].addEventListener('click', async () => {
                animateBox(i)
                newsBox.innerHTML = ''
                newsBox.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 50%; right: -50%; transform: translate(50%, 200%);"></sl-spinner>`
                window.location.href = news.link
            })

            newsBox[i].addEventListener('mouseenter', async () => {
                gsap.fromTo(`.box-${i}`,
                    {
                        scale: 1,
                        ease: 'none'
                    },
                    {
                        scale: 1.05,
                        duration: 0.2,
                        ease: 'power.in'
                    })
            })

            newsBox[i].addEventListener('mouseleave', async () => {
                gsap.to(`.box-${i}`, {
                    scale: 1,
                    duration: 0.1,
                    ease: 'power.inOut'
                })
            })

            gsap.from(`.box`, {
                opacity: 0,
                y: 200,
                ease: 'none'
            })
            gsap.to(`.box`, {
                opacity: 1,
                y: 0,
                ease: 'none'
            })
        })
    }

    window.screen.width > 1000 ?
        container.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 50%; right: -50%; transform: translate(50%, 200%);"></sl-spinner>`
        :
        container.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 0%; right: 0%; transform: translate(0%, 20%);"></sl-spinner>`
    fetchNews();
})

function animateBox(i) {
    gsap.fromTo(`.box-${i}`, { opacity: 1, duration: 1 }, { opacity: 0.4, duration: 1, repeat: -1, yoyo: true, ease: 'power.inOut' });
}
function animateRecentBox(i) {
    gsap.fromTo(`.rbox-${i}`, { opacity: 1, duration: 1 }, { opacity: 0.4, duration: 1, repeat: -1, yoyo: true, ease: 'power.inOut' });
}

const fetchBns = async () => {
    const url = `https://newsdata.io/api/1/latest?apikey=${api}&category=business&language=en`;
    const res = await fetch(url);
    const newsData = await res.json();

    newsData.results.slice(2).map((news, i) => {
        var newDiv = document.createElement("div");

        // Create an image element
        var img = document.createElement("img");
        img.classList.add('box-img')
        // Set the src attribute of the image
        img.src = news.image_url || 'https://www.shutterstock.com/shutterstock/photos/1928997539/display_1500/stock-vector-breaking-news-template-with-d-red-and-blue-badge-breaking-news-text-on-dark-blue-with-earth-and-1928997539.jpg'; // Replace with your image URL
        // Optionally, set other attributes like alt, width, height
        img.alt = "Placeholder Image";

        const title = document.createElement("h4");
        title.classList.add('title')
        title.innerText = limitWords(news.title, 6)

        const read = document.createElement(`div`)
        read.innerHTML = `<sl-icon name="arrow-up-right-circle"></sl-icon>`

        // Append the image to the new div
        newDiv.appendChild(img);
        newDiv.appendChild(title);
        newDiv.appendChild(read)

        newDiv.classList.add('b-box')
        newDiv.classList.add(`box-${i}`)
        newDiv.classList.add(`b-box-${i}`)
        read.classList.add("readMore")

        // Append the new div to an existing element
        var container = document.querySelector(".business");
        container.appendChild(newDiv);
        newDiv.appendChild(read)
        var newsBox = document.querySelectorAll(".b-box")

        newsBox[i].addEventListener('click', async () => {
            gsap.fromTo(`.b-box-${i}`, { opacity: 1, duration: 1 }, { opacity: 0.4, duration: 1, repeat: -1, yoyo: true, ease: 'power.inOut' });
            newsBox.innerHTML = ''
            newsBox.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 50%; right: -50%; transform: translate(50%, 200%);"></sl-spinner>`
            window.location.href = news.link
        })

        newsBox[i].addEventListener('mouseenter', async () => {
            gsap.fromTo(`.b-box-${i}`,
                {
                    scale: 1,
                    ease: 'none'
                },
                {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power.in'
                })
        })

        newsBox[i].addEventListener('mouseleave', async () => {
            gsap.to(`.b-box-${i}`, {
                scale: 1,
                duration: 0.1,
                ease: 'power.inOut'
            })
        })
    })
}
fetchBns();

const fetchEnt = async () => {
    const url = `https://newsdata.io/api/1/latest?apikey=${api}&category=entertainment&language=en`;
    const res = await fetch(url);
    const newsData = await res.json();

    newsData.results.slice(2).map((news, i) => {
        var newDiv = document.createElement("div");

        // Create an image element
        var img = document.createElement("img");
        img.classList.add('box-img')
        // Set the src attribute of the image
        img.src = news.image_url || 'https://www.shutterstock.com/shutterstock/photos/1928997539/display_1500/stock-vector-breaking-news-template-with-d-red-and-blue-badge-breaking-news-text-on-dark-blue-with-earth-and-1928997539.jpg'; // Replace with your image URL
        // Optionally, set other attributes like alt, width, height
        img.alt = "Placeholder Image";

        const title = document.createElement("h4");
        title.classList.add('title')
        title.innerText = limitWords(news.title, 6)

        const read = document.createElement(`div`)
        read.innerHTML = `<sl-icon name="arrow-up-right-circle"></sl-icon>`

        // Append the image to the new div
        newDiv.appendChild(img);
        newDiv.appendChild(title);
        newDiv.appendChild(read)

        newDiv.classList.add('e-box')
        newDiv.classList.add(`box-${i}`)
        newDiv.classList.add(`e-box-${i}`)
        read.classList.add("readMore")

        // Append the new div to an existing element
        var container = document.querySelector(".entertainment");
        container.appendChild(newDiv);
        newDiv.appendChild(read)
        var newsBox = document.querySelectorAll(".e-box")

        newsBox[i].addEventListener('click', async () => {
            gsap.fromTo(`.e-box-${i}`, { opacity: 1, duration: 1 }, { opacity: 0.4, duration: 1, repeat: -1, yoyo: true, ease: 'power.inOut' });
            newsBox.innerHTML = ''
            newsBox.innerHTML = `<sl-spinner style="font-size: 3rem; position: relative;
                top: 50%; right: -50%; transform: translate(50%, 200%);"></sl-spinner>`
            window.location.href = news.link
        })

        newsBox[i].addEventListener('mouseenter', async () => {
            gsap.fromTo(`.e-box-${i}`,
                {
                    scale: 1,
                    ease: 'none'
                },
                {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power.in'
                })
        })

        newsBox[i].addEventListener('mouseleave', async () => {
            gsap.to(`.e-box-${i}`, {
                scale: 1,
                duration: 0.1,
                ease: 'power.inOut'
            })
        })
    })
}
fetchEnt();