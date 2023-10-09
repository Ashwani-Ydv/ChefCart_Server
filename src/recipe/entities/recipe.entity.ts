import { Chef } from 'src/chef/entities/chef.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  method: string;

  @Column('decimal', { precision: 5, scale: 2 }) // precision and scale can be adjusted as needed
  rating: number;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes)
  ingredients: Ingredient[];

  @ManyToOne(() => Chef, (c) => c.recipes)
  @JoinColumn({ name: 'chef_id', referencedColumnName: 'id' })
  chef: Chef;
}
