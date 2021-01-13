import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export default class CreateUsersService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUsernameExists = await this.usersRepository.findByUsername(
      username,
    );

    if (checkUsernameExists) {
      throw new AppError('User not found.');
    }

    const user = await this.usersRepository.create({
      username,
      email,
      password,
    });

    return user;
  }
}
