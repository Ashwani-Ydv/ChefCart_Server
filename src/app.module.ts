import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChefModule } from './chef/chef.module';
import { RecipeModule } from './recipe/recipe.module';
import { Chef } from './chef/entities/chef.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import { IngredientModule } from './ingredient/ingredient.module';
import { Ingredient } from './ingredient/entities/ingredient.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cj4jt4s07spu5oeeab8g-a.singapore-postgres.render.com',
      port: 5432,
      username: 'ashwani',
      password: 'JqhtgtCvw81eZtCBfrzUMTkeEybfSGtl',
      database: 'chefcart',
      entities: [Chef, Recipe, Ingredient],
      synchronize: true,
      ssl: true,
    }),
    ChefModule,
    RecipeModule,
    IngredientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
