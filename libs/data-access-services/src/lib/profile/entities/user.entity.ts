import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../../iam';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
      id: number;

    @Column({ unique: true })
      email: string;

    @Column({select: false})
      password: string;

    @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
      role: RoleEnum;
}
