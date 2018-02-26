const deleteArticleBtn = document.querySelectorAll(".delete-article");
const deleteCategoryBtn = document.querySelectorAll(".delete-category");
const backBtn = document.querySelectorAll(".back");

deleteArticleBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/manage/articles/delete/${e.target.dataset.id}`, true);
        xhr.onload = () => {
            location.reload();
        };
        xhr.send(null);
    });
});

deleteCategoryBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            location.reload();
        };
        xhr.open('DELETE', `/manage/categories/delete/${e.target.dataset.id}`, true);
        xhr.send(null);
    });
});

backBtn.forEach((button) => {
    button.addEventListener('click', () => {
        window.history.back();
    });
});