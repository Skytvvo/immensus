import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../../iam";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @Column({nullable: true})
  avatar: string;
}
