import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chef } from './entities/chef.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Injectable()
export class ChefService {
  constructor(
    @InjectRepository(Chef)
    private chefRepository: Repository<Chef>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async create(chefData: any): Promise<Chef> {
    const chef = new Chef();
    chef.name = chefData.name;
    chef.bio = chefData.bio;
    chef.experience = chefData.experience;
    chef.likes = chefData.likes;

    // Associate with existing Recipes
    if (chefData.recipeIds && chefData.recipeIds.length > 0) {
      chef.recipes = await this.recipeRepository.findByIds(chefData.recipeIds);
    }

    return this.chefRepository.save(chef);
  }

  async findAll(): Promise<Chef[]> {
    return this.chefRepository.find();
  }

  async findOne(id: number): Promise<Chef> {
    return this.chefRepository.findOne({
      where: { id: id },
      relations: ['recipes'],
    });
  }

  async update(id: number, chef: Chef): Promise<void> {
    await this.chefRepository.update(id, chef);
  }

  async remove(id: number): Promise<void> {
    await this.chefRepository.delete(id);
  }
}
