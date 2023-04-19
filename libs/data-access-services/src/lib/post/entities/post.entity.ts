import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../profile";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({default: 0})
  likes: number;

  @Column({default: 0})
  shared: number;

  @Column({default: 0})
  viewed: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(()=> User, user => user.posts)
  author: User;

  constructor(author: User, description: string) {
    this.author = author;
    this.description = description;
  }
}
