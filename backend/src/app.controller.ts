import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './schema/task.schema';
import { CompletionUpdate } from './complitionUpdate.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserResponseType } from './types/userResponse.type';
import { LoginDto } from './dto/login.dto';
import { promises } from 'dns';
import { ExpressRequest } from './middleware/auth.middleware';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<UserResponseType>{
    const user = await this.appService.signUp(signUpDto);
    return this.appService.buildUserResponse(user);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<UserResponseType>{
    const user = await this.appService.loginUser(loginDto);
    return this.appService.buildUserResponse(user);
  }

  @Post('/add')
  async createTask(@Body() taskDTO: Task){
    return this.appService.createTask(taskDTO);
  }

  @Get('user')
  async currentuser(@Request() request: ExpressRequest): Promise<UserResponseType>{
    if(!request.user){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.appService.buildUserResponse(request.user);
  }

  

  @Put(':id')
  async updateCompletionOfTask(@Param('id') id: string, @Body() updateData: CompletionUpdate): Promise<Task>{
    return this.appService.updateCompletionOfTask(id, updateData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string){
    return this.appService.deleteTask(id);
  }
}
