import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsAscii, IsHexColor, IsOptional, IsString } from 'class-validator';

@Entity('users', {
  orderBy: {
    username: 'ASC',
    name: 'ASC',
  },
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  color: string;

  @Column()
  username: string;

  @Column()
  name: string;
}

export class UserData {
  @IsOptional() @IsString() @IsHexColor() color: string;
  @IsString() @IsAscii() username: string;
  @IsString() name: string;
}
