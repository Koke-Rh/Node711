class moviesService {
  constructor() {
    this.movies = [
      { id: 1, title: 'John Wick', year: 2014, category: 'Accion' },
      { id: 2, title: 'Deadpool', year: 2016, category: 'Accion' },
      { id: 3, title: 'Lalaland', year: 2016, category: 'Romance' },
    ];
  }

  create(data) {
    const newMovie = { id: this.movies.length + 1, ...data };
    this.movies.push(newMovie);
    return newMovie;
  }

  getAll() { return this.movies; }
  getById(id) { return this.movies.find(item => item.id == id); }

  update(id, changes) {
    const index = this.movies.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('Movie Not Found'); }
    const movie = this.movies[index];
    this.movies[index] = { ...movie, ...changes };
    return this.movies[index];
  }

  delete(id) {
    const index = this.movies.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('Movie Not Found'); }
    this.movies.splice(index, 1);
    return { id };
  }
}

module.exports = moviesService;
