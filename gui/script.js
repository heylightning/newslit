
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded!");

    fetch('http://localhost:8000')
        .then(response => response.json())
        .then(data => {
            let jsonData = data;
            console.info("Response successfully stored in jsonData.");
            console.log(jsonData);

            let newsContainer = document.getElementById("newsContainer");

            jsonData.forEach(function (item) {
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

                tagDiv.appendChild(tagP);
                titleNTagsDiv.appendChild(tagDiv);
                titleNTagsDiv.appendChild(titleH1);
                titleNTagsDiv.appendChild(hr);
                newsDiv.appendChild(titleNTagsDiv);

                newsContainer.appendChild(newsDiv);
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
