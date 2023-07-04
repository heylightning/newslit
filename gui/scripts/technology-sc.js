
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContent loaded!');

    document.getElementById('pop-menu').addEventListener('click', () => {
        document.getElementById('menu-content').style.display = 'inherit';
        document.getElementById('pop-menu').style.display = 'none';
    });

    document.getElementById('closeMenu').addEventListener('click', () => {
        document.getElementById('menu-content').style.display = 'none';
        document.getElementById('pop-menu').style.display = 'inherit';
    });
});