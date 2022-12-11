import { ApiProperty } from '@nestjs/swagger';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';

export class UserDto extends JoinRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}
//runtime에도 존재하는 클래스이기 때문에 validation까지 같이 할 수 있는 장점
