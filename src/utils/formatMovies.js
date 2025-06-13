function formatMovies(movies) {
  let formated = [];
  for (let key in movies) {
    formated.push(movies[key]);
  }
  return formated;
}

export default formatMovies;
