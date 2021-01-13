import UsersController from '@modules/user/controllers/UsersController';

import { Router } from 'express';

const usersController = new UsersController();

const routes = Router();

routes.post('/', usersController.create);

export default routes;
