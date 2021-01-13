import { Request, Response } from 'express';
import CreateUsersService from '../services/CreateUsersService';
import UsersRepository from '../typeorm/repositories/UsersRepository';

const usersRepository = new UsersRepository();

export default class UsersController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;

    const data = {
      username,
      email,
      password,
    };

    const createUser = new CreateUsersService(usersRepository);

    const user = createUser.execute(data);

    return response.status(200).json(user);
  }
}
