export const isLoggedIn = (type) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const basePath = type === 'login' ? './' : '../../';
        const rolePath = user.role === 'admin' ? 'admin' : 'user';
        window.location.href = `${basePath}${rolePath}/dashboard/dashboard.html`;
    }
};