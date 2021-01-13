import { Request, Response } from 'express';
import CreateUsersService from '../services/CreateUsersService';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;

    const data = {
      username,
      email,
      password,
    };

    const createUserService = new CreateUsersService(new UsersRepository());

    const user = await createUserService.execute(data);

    return response.status(200).json(user);
  }
}
