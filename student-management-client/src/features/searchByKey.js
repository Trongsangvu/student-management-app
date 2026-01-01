// The function searches and redirects to the corresponding page
function searchAndRedirectByKey(key) {
    // Mapping between keys and page URLs
    const pageMapping = {
        'student': '../../client/pages/studentList.html',
        'class': '../../client/pages/class.html',
        'score': '../../client/pages/studentScore.html',
        'subject': '../../client/pages/subject.html',
        'notify': '../../client/pages/notification.html'
    };

    // Check if the key exists 
    if (key in pageMapping) {
        window.location.href = pageMapping[key];
    } else {
        console.error('Invalid key:', key);
    }
}

// Handle events when users enter the search box
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', function() {
    const searchKey = document.getElementById('searchInput').value.trim();
    searchAndRedirectByKey(searchKey);
});