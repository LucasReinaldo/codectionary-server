import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../typeorm/entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByUsername(username: string): Promise<User | undefined>;
}
