const router = require('express').Router();
const blog = require('./blog_routes');
const comments = require('./comments_routes');
const user = require('./user_routes');

router.use('/user', user);
router.use('/blog', blog);
router.use('/comments', comments);

module.exports = router;