/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', () =>{
  return 'Bem vindo!'
})

Route.group(() => {

  // rota de login
  Route.post("login", "AuthController.login");

  // rota para criar um novo usuário
  Route.post('/users', 'UsersController.store');

  // rotas crud Todos
  Route.resource('/tasks', 'TasksController')

  // rotas crud Todo
  Route.group(() => {

    // rotas crud Users
    Route.get('/users', 'UsersController.index');
    Route.get('/users/:id', 'UsersController.show');
    Route.put('/users/:id', 'UsersController.update');
    Route.delete('/users/:id', 'UsersController.destroy');

    // toda de deslogar
    Route.post('/logout', 'AuthController.logout')

  }).middleware("auth:api");

}).prefix('/api');
