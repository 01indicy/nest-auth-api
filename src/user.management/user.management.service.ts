import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CreateUserManagementDto } from './dto/create-user.management.dto';
import { UpdateUserManagementDto } from './dto/update-user.management.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserManagementService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private readonly saltRound = 10;
  async create(createUserManagementDto: CreateUserManagementDto) {
    createUserManagementDto.password = await bcrypt.hash(createUserManagementDto.password,this.saltRound);
    return this.prisma.user.create({data: createUserManagementDto});
  }

  findAll() {
    return `This action returns all userManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userManagement`;
  }

  update(id: number, updateUserManagementDto: UpdateUserManagementDto) {
    return `This action updates a #${id} userManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} userManagement`;
  }

  async signIn(data:{username: string, password: string}){
    const get_credentials = await this.prisma.user.findFirst({where: {username: data.username}})
    if(get_credentials){
      const is_match = await bcrypt.compare(data.password,get_credentials.password);
      if(is_match){
        const payload = { sub: get_credentials.id, username: get_credentials.email}
        return {
          access_token: await this.jwtService.signAsync(payload)
        };
      }else{
        throw new HttpException('User not found, Please enter correct credentials',HttpStatus.BAD_REQUEST)
      }
    }else{
      throw new HttpException('User not found, Please enter correct credentials',HttpStatus.BAD_REQUEST)
    }
  }

  signOut(){
    return `user sign out service`;
  }
}
