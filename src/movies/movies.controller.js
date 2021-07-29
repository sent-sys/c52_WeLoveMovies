const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  res.json({ data: await service.list(req.query.is_showing) });
}

async function theatersList(req, res, next) {
  res.json({ data: await service.theatersList(req.params.movieId) });
}

async function reviewsList(req, res, next) {
  res.json({ data: await service.reviewsList(req.params.movieId) });
}

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  theatersList: asyncErrorBoundary(theatersList),
  reviewsList: asyncErrorBoundary(reviewsList),
};
