const knex = require("../db/connection");

function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

function read(review_id) {
  return knex("reviews").where({ review_id: review_id }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).first().del();
}

function update(review) {
  return knex("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  read,
  delete: destroy,
  update,
};
