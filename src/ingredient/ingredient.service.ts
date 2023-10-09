import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async create(ingredientData: any): Promise<Ingredient> {
    const ingredient = new Ingredient();
    ingredient.name = ingredientData.name;

    // Associate with existing Recipes
    if (ingredientData.recipeIds && ingredientData.recipeIds.length > 0) {
      ingredient.recipes = await this.recipeRepository.findByIds(
        ingredientData.recipeIds,
      );
    }

    return this.ingredientRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find({ relations: ['recipes'] });
  }

  async findOne(id: number): Promise<Ingredient> {
    return this.ingredientRepository.findOne({
      where: { id: id },
      relations: ['recipes'],
    });
  }

  async update(id: number, ingredient: Ingredient): Promise<void> {
    await this.ingredientRepository.update(id, ingredient);
  }

  async remove(id: number): Promise<void> {
    await this.ingredientRepository.delete(id);
  }
}
