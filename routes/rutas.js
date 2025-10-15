const ProductsService = require('../services/productsServices');
const CategoriesService = require('../services/categoryServices');
const BrandsService = require('../services/brandServices');
const UsersService = require('../services/userServices');
const MoviesService = require('../services/movieServices');

const productsRouter = require('./productRouter');
const categoriesRouter = require('./categorieRouter');
const brandsRouter = require('./brandRouter');
const usersRouter = require('./userRouter');
const moviesRouter = require('./moviesRouter');

function routerApi(app) {
  const productsService = new ProductsService();
  const categoriesService = new CategoriesService(productsService);
  const brandsService = new BrandsService(productsService);
  const usersService = new UsersService();
  const moviesService = new MoviesService();

  app.use('/products', productsRouter(productsService));
  app.use('/categories', categoriesRouter(categoriesService));
  app.use('/brands', brandsRouter(brandsService));
  app.use('/users', usersRouter(usersService));
  app.use('/movies', moviesRouter(moviesService));
}

module.exports = routerApi;
