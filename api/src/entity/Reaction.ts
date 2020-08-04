import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

export enum Type {
  LIKE = 1,
  COMMENT = 2,
}

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
    id: number;

  // Specific to comments
  @Column('text')
    content: string;

  @Column('enum', { name: 'type', enum: Type })
    type: Type;

  @ManyToOne(type => Post, post => post.reactions)
    post: Post;

  @ManyToOne(type => User, user => user.reactions)
    user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
