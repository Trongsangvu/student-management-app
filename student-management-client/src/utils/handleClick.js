
// Menu Item
const studentList = document.querySelector('.student--list');

if (studentList) {
    studentList.style.display = 'none';

    function showHideStudent() {
        if (studentList.style.display === 'none') {
            studentList.style.display = 'block'
        } else{
            studentList.style.display = 'none'
        }
    }
}


const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownMenu) {
    dropdownMenu.style.display = 'none';
    
    function showHideDropMenu() {
        if (dropdownMenu.style.display === 'none') {
            dropdownMenu.style.display = 'flex';
        } else {
            dropdownMenu.style.display = 'none';
        }
    }
}

const logOut = document.getElementById('logout');
logOut.addEventListener('click', () => {
    window.location.href = "../../client/pages/login.html"
});

// Next page
function nextPage() {
    window.location.href = "../../client/public/home.html";
}

// Add Score page
const addSCore = document.getElementById('addscore');
addSCore.addEventListener('click', () => {
    window.location.href = "../../client/pages/addScore.html"
})

function addStudent() {
    window.location.href = "../../client/pages/studentadd.html"
}

function addClass() {
    window.location.href = '../../client/pages/addClass.html'
}

function addSubject() {
    window.location.href = '../../client/pages/addSubject.html'
}


// Back page
const backPage = document.getElementById('backpage');
backPage.addEventListener('click', () => {
    window.location.href = "../../client/pages/studentScore.html"
})


