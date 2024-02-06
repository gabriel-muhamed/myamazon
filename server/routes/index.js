const express = require('express');
const authRoute = require('./auth.route');
const router = express.Router();
const usersRoute = require ('./users.route')

const rotuesIndex = [
    {
        path:'/auth',
        route: authRoute
    },
    {
        path:'/users',
        route: usersRoute
    }
]

rotuesIndex.forEach((route) => {    
    router.use(route.path, route.route)
})

// localhost:3001/api/auth

module.exports = router;