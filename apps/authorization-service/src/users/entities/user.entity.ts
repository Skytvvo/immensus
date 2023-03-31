import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../enums/role.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
      id: number;

    @Column({ unique: true })
      email: string;

    @Column()
      password: string;

    @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
      role: RoleEnum;
}
