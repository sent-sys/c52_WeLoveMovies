const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function list(is_showing) {
  if (is_showing)
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id");
  return knex("movies").select("*");
}

function theatersList(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId });
}

function reviewsList(movieId) {
  return knex("reviews as r")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ "m.movie_id": movieId })
    .then((data) => data.map((i) => addCritic(i)));
}

function read(movieId) {
  return knex("movies").where({ movie_id: movieId }).first();
}

module.exports = {
  list,
  read,
  theatersList,
  reviewsList,
};
