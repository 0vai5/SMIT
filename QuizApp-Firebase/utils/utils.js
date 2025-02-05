export const isLoggedIn = (type) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const basePath = type === 'login' ? './' : '../../';
        const rolePath = user.role === 'admin' ? 'admin' : 'user';
        window.location.href = `${basePath}${rolePath}/dashboard/dashboard.html`;
    }
};

export const isAuthenticatedUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user.role !== 'user') {
        window.location.href = '../admin/dashboard/dashboard.html';
        return
    }
}

export const isAuthenticatedAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role !== 'admin') {
        window.location.href = '../user/dashboard/dashboard.html';
        return
    }
}

