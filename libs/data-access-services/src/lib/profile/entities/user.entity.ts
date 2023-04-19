import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../../iam";
import { Post } from "../../post";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(()=> Post, post => post.author)
  posts: Post[];
}
