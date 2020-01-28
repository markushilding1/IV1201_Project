//Import Controllers
const repositoryController = require('./users.repository');

exports.createUserProfile = async (body) => (
  await repositoryController.createUserProfile(body)
);

exports.getUserProfile = async (uid) => (
  await repositoryController.getUserProfile(uid)
)
