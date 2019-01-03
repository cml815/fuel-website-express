var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send('You\'re so cool');
});

/**
* @api {post} /api/user Create user
* @apiName Create new user
* @apiPermission admin
* @apiGroup User
*
* @apiParam  {String} [userName] username
* @apiParam  {String} [email] Email
* @apiParam  {String} [phone] Phone number
* @apiParam  {String} [status] Status
*
* @apiSuccess (200) {Object} mixed `User` object
*

router.post(
  '/', 
  userController.validate('createUser'), 
  userController.createUser,
)

*/

// router.post('/', userController.createUser);

module.exports = router;