/**
 * Array of routes that are acccessible to the public
 * These routes do not required authnetication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    
]
/**
 * Array of routes that are acccessible to the public
 * These routes will redicretct to looged in uesrs to settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    // "/auth/reset",
    // '/auth/new-password'
]

/**
 * The prefix for api authentication routes
 * Routes that start with prefix are used for API 
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth"

/**
 * The default rediect after looging in
 * @type {string}
 */


/**
 * calling data from database
 * @type {string}
 */

export const appointmentDataRoutes = "api/edit"

export const DEFAULT_LOGIN_REDIRECT = "/admin"