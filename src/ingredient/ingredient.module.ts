import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { Ingredient } from './entities/ingredient.entity';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient]),
    forwardRef(() => RecipeModule),
  ],
  providers: [IngredientService],
  controllers: [IngredientController],
  exports: [IngredientService, TypeOrmModule],
})
export class IngredientModule {}
