import { Role } from 'src/enum/role.enum';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
