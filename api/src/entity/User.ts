import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';
import {Reaction} from './Reaction';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
    id: number;

  @Column()
    name: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    imageUrl: string;

  @OneToMany(type => Post, post => post.user)
    posts: Post[];

  @OneToMany(type => Reaction, reaction => reaction.user)
    reactions: Reaction[];

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
