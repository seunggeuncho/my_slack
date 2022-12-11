import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { buildLegacyDataSourceOptions } from 'typeorm-extension';
import { brotliCompress } from 'zlib';
import bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getUser() {}
  async join(email: string, nickname: string, password: string) {
    if (!email) {
      throw new BadRequestException('이메일이 없습니다.');
      //이메일 없어서 에러
      return;
    }
    if (!nickname) {
      throw new BadRequestException('닉네임이 없습니다.');
      //닉네임 없다고 에러
      return;
    }
    if (!password) {
      throw new BadRequestException('비밀번호가 없습니다.');
      //비밀번호 없어서 에러
      return;
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
      //이미 존재하는 유저라고 에러
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      // eslint-disable-next-line prettier/prettier
        email,
      nickname,
      password: hashedPassword,
    });
  }
}
