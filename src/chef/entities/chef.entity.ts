import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chef {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  bio: string;

  @Column()
  experience: number;

  @Column()
  likes: number;

  @OneToMany(() => Recipe, (r) => r.chef)
  recipes: Recipe[];
}
