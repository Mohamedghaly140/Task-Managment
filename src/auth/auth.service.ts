import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

type LoginResponse = { accessToken: string; user: UserEntity };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, password } = authCredentialsDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        username,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<LoginResponse> {
    const { username, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username, id: user.id };

      const accessToken = await this.jwtService.sign(payload);

      delete user.password;

      return { user, accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
