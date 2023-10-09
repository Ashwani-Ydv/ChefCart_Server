import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChefService } from './chef.service';
import { Chef } from './entities/chef.entity';

@Controller('chef')
export class ChefController {
  constructor(private readonly chefService: ChefService) {}

  @Post()
  create(@Body() chefData: any) {
    /*
    {
  "name": "Chef John",
  "bio": "Expert in Italian cuisine.",
  "experience": 10,
  "likes": 500,
  "recipeIds": [1, 2, 3]
    }
   */
    return this.chefService.create(chefData);
  }

  @Get()
  findAll() {
    return this.chefService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.chefService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() chef: Chef) {
    return this.chefService.update(id, chef);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.chefService.remove(id);
  }
}
