
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContent loaded!');

    document.getElementById('loadingData').style.display = 'inherit';
    fetch('http://localhost:8000')
        .then(response => response.json())
        .then(data => {
            document.getElementById('loadingData').style.display = 'none';
            let jsonData = data;
            console.info("Response successfully stored in jsonData.");

            let newsContainer = document.getElementById("newsContainer");

            jsonData.forEach(function (item) {
                if (item.tag == "growing-a-business") {
                    let newsDiv = document.createElement("div");
                    newsDiv.classList.add("news");

                    let titleNTagsDiv = document.createElement("div");
                    titleNTagsDiv.classList.add("title-n-tags");

                    let tagDiv = document.createElement("div");
                    tagDiv.classList.add("tag");

                    let tagMark = document.createElement("mark");
                    tagMark.classList.add("tag-mark");
                    tagMark.textContent = item.tag;

                    let tagP = document.createElement("p");
                    tagP.appendChild(tagMark);

                    let titleH1 = document.createElement("h1");
                    let titleLink = document.createElement("a");
                    titleLink.href = item.href;
                    titleLink.target = "_blank"
                    titleLink.textContent = item.title;
                    titleH1.appendChild(titleLink);

                    let hr = document.createElement("hr");
                    hr.style.height = "5px";
                    hr.style.backgroundColor = "#c85c5c";
                    hr.style.border = "none";

                    tagDiv.appendChild(tagP);
                    titleNTagsDiv.appendChild(tagDiv);
                    titleNTagsDiv.appendChild(titleH1);
                    titleNTagsDiv.appendChild(hr);
                    newsDiv.appendChild(titleNTagsDiv);

                    newsContainer.appendChild(newsDiv);
                }
            });
        })
        .catch(error => {
            console.error('Error: ', error);
        });

    document.getElementById('pop-menu').addEventListener('click', () => {
        document.getElementById('menu-content').style.display = 'inherit';
        document.getElementById('pop-menu').style.display = 'none';
    });

    document.getElementById('closeMenu').addEventListener('click', () => {
        document.getElementById('menu-content').style.display = 'none';
        document.getElementById('pop-menu').style.display = 'inherit';
    });
});