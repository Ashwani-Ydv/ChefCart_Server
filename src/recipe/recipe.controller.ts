import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() recipeData: any) {
    /* 
    {
  "name": "Delicious Cake",
  "method": "cake making method",
  "rating": 4.5,
  "chefId": 1,
  "ingredientIds": [1, 2, 3]
    } 
  */
    return this.recipeService.create(recipeData);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recipeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() recipe: Recipe) {
    return this.recipeService.update(id, recipe);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recipeService.remove(id);
  }
}
