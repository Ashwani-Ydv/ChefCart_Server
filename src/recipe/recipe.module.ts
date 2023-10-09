import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { ChefModule } from 'src/chef/chef.module';
import { IngredientModule } from 'src/ingredient/ingredient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    forwardRef(() => ChefModule),
    forwardRef(() => IngredientModule),
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
  exports: [RecipeService, TypeOrmModule], // Export the service and TypeOrmModule for other modules to use
})
export class RecipeModule {}
