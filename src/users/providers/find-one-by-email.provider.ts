import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class FindOneByEmailProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async FindByEmail(email: string) {
    let user: User | undefined;

    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new NotFoundException(error, {
        description: "Could not fetch the User",
      });
    }

    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    return user;
  }
}
