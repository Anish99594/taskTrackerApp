import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { Model } from 'mongoose';
//import { CompletionUpdate } from './complitionUpdate.dto';
import { User } from './user/user.entity';
//import { User, UserDocument } from './user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { UserResponseType } from './types/userResponse.type';
import { LoginDto } from './dto/login.dto';
import { use } from 'passport';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AppService {
  
  constructor(
    @InjectModel('task') private readonly taskModel: Model<TaskDocument>,
    @InjectModel('user') 
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const user = await this.userModel.findOne({username: signUpDto.username})
    if(user){
      throw new HttpException('Email is already taken', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const createdUser = new this.userModel(signUpDto);
    return createdUser.save();
  }

  async loginUser(loginDto: LoginDto): Promise<User>{
    const user = await this.userModel.findOne({username: loginDto.username}).select('+password')
    if(!user){
      throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if(!isPasswordCorrect){
      throw new HttpException('Incorrect password', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return user;
  }

  buildUserResponse(user: User): UserResponseType{
    return{
      username: user.username,
      name: user.name,
      token: this.generateJwt(user)
    }
  }

  generateJwt(user: User): string{
    return sign({username: user.username}, 'JWT_SECRET')
  }

  async findByEmail(username: string): Promise<User>{
    return this.userModel.findOne({username})
  }
  
  async createTask(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async updateCompletionOfTask(id, updateData): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateData, {new: true});
  }

  async deleteTask(id){
    return this.taskModel.findByIdAndDelete(id);
  }

  


}
