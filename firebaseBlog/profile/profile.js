const isLoggedIn = () => {
    const uid = localStorage.getItem('uid');
    if (!uid) window.location.href = '../login/login.html';
};


window.isLoggedIn = isLoggedIn;