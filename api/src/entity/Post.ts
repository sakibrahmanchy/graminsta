import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Photo } from './Photo';
import { Reaction } from './Reaction';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
    id: number;

  @Column('text')
    content: string;

  @ManyToOne(type => User, user => user.posts)
    user: User;

  @OneToMany(type => Photo, photo => photo.post)
    photos: Photo[];

  @OneToMany(type => Reaction, reaction => reaction.post)
    reactions: Reaction[];

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
