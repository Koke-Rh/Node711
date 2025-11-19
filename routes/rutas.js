const ProductsService = require('../services/productsServices');
const CategoriesService = require('../services/categoryServices');
const BrandsService = require('../services/brandServices');
const UsersService = require('../services/userServices');

const productsRouter = require('./productRouter');
const categoriesRouter = require('./categorieRouter');
const brandsRouter = require('./brandRouter');
const usersRouter = require('./userRouter');

const places = require('./places');

function routerApi(app) {
  // 1. Creamos TODAS las instancias
  const productsService = new ProductsService();
  const categoriesService = new CategoriesService();
  const brandsService = new BrandsService();
  const usersService = new UsersService();

  // 2. Inyectamos las dependencias cruzadas usando los nuevos métodos
  productsService.setDependencies(categoriesService, brandsService);
  categoriesService.setDependencies(productsService);
  brandsService.setDependencies(productsService);

  // 3. Pasamos las instancias ya conectadas a los routers
  app.use('/products', productsRouter(productsService));
  app.use('/categories', categoriesRouter(categoriesService));
  app.use('/brands', brandsRouter(brandsService));

  app.use('/places', places);
}

module.exports = routerApi;
