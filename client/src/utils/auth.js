export default class AuthService {
  getProfile() {
    return;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getCookie();
    console.log(token);
    return token;
  }

  getCookie() {
    const cookies = document.cookie.split(';');
    console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf('connect.sid=') === 0) {
        return cookie.substring('connect.sid='.length, cookie.length);
      }
    }
    return null;
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}