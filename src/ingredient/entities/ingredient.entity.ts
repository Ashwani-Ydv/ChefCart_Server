import { Recipe } from 'src/recipe/entities/recipe.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Recipe, (recipe) => recipe.ingredients)
  @JoinTable()
  recipes: Recipe[];
}
