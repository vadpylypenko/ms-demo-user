import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userData: UserDto): Promise<any> {
    return this.userService.create(userData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userData: UserDto): Promise<any> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<any> {
    return this.userService.getOne(id);
  }

  @Get()
  getMany(): Promise<any[]> {
    return this.userService.getMany();
  }
}
