import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';

/**
 * Photo entity.
 *
 * Columns: id, thumbUrl, url, createdAt, updatedAt.
 * Relations: post.
 */
@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
    id: number;

  @Column()
    thumbUrl: string;

  @Column()
    url: string;

  @ManyToOne(type => Post, post => post.photos)
    post: Post[];

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
