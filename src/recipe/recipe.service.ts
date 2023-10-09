import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { Chef } from 'src/chef/entities/chef.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Chef)
    private chefRepository: Repository<Chef>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(recipeData: any): Promise<Recipe> {
    const recipe = new Recipe();
    recipe.name = recipeData.name;
    recipe.method = recipeData.method;
    recipe.rating = recipeData.rating;

    // Associate with an existing Chef
    if (recipeData.chefId) {
      recipe.chef = await this.chefRepository.findOne({
        where: { id: recipeData.chefId },
      });
    }

    // Associate with existing Ingredients
    if (recipeData.ingredientIds && recipeData.ingredientIds.length > 0) {
      recipe.ingredients = await this.ingredientRepository.findByIds(
        recipeData.ingredientIds,
      );
    }

    return this.recipeRepository.save(recipe);
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find({ relations: ['ingredients', 'chef'] });
  }

  async findOne(id: number): Promise<Recipe> {
    return this.recipeRepository.findOne({
      where: { id: id },
      relations: ['ingredients', 'chef'],
    });
  }

  async update(id: number, recipe: Recipe): Promise<void> {
    await this.recipeRepository.update(id, recipe);
  }

  async remove(id: number): Promise<void> {
    await this.recipeRepository.delete(id);
  }
}
