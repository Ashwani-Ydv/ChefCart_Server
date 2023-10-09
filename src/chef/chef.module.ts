import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChefService } from './chef.service';
import { ChefController } from './chef.controller';
import { Chef } from './entities/chef.entity';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chef]), forwardRef(() => RecipeModule)],
  providers: [ChefService],
  controllers: [ChefController],
  exports: [ChefService, TypeOrmModule], // Export the service and TypeOrmModule for other modules to use
})
export class ChefModule {}
