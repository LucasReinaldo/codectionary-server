import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/user/protocols/IUsersRepository';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username },
    });

    return user;
  }

  public async create({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const createUser = this.ormRepository.create({ username, email, password });

    await this.ormRepository.save(createUser);

    return createUser;
  }
}
