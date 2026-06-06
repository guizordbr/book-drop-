/**
 * Storage Module
 * Handles localStorage operations for users, posts, and authentication
 */

const USER_STORAGE_KEY = 'bookdrop-user';
const USERS_STORAGE_KEY = 'bookdrop-users';
const POSTS_STORAGE_KEY = 'bookdrop-posts';

/**
 * Get currently logged in user
 * @returns {string|null}
 */
export function getLoggedUser() {
    return localStorage.getItem(USER_STORAGE_KEY);
}

/**
 * Set logged in user
 * @param {string} username
 */
export function setLoggedUser(username) {
    localStorage.setItem(USER_STORAGE_KEY, username);
}

/**
 * Clear logged in user
 */
export function clearLoggedUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
}

/**
 * Get all registered users
 * @returns {Object}
 */
export function getUsers() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
}

/**
 * Save new user
 * @param {string} username
 * @param {string} password
 * @param {string} email
 */
export function saveUser(username, password, email) {
    const users = getUsers();
    users[username.toLowerCase()] = {
        password,
        email,
        createdAt: new Date().toISOString()
    };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

/**
 * Check if user exists
 * @param {string} username
 * @returns {boolean}
 */
export function userExists(username) {
    const users = getUsers();
    return username.toLowerCase() in users;
}

/**
 * Validate user credentials
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */
export function validateUser(username, password) {
    const users = getUsers();
    const user = users[username.toLowerCase()];
    return user && user.password === password;
}
