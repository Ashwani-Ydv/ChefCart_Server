import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './entities/ingredient.entity';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() ingredientData: any) {
    /*
    {
  "name": "Chocolate",
  "recipeIds": [1, 2]
    }
   */
    return this.ingredientService.create(ingredientData);
  }

  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ingredientService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() ingredient: Ingredient) {
    return this.ingredientService.update(id, ingredient);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ingredientService.remove(id);
  }
}
