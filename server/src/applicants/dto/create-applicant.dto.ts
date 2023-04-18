import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateApplicantDto {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  @ApiProperty({ example: 'Римуру', description: 'Имя абитуриента' })
  readonly name!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'rimuru@gmail.com', description: 'E-mail абитуриента' })
  readonly email!: string;
}
