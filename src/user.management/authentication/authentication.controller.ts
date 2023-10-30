import {Body, Controller, Post} from '@nestjs/common';
import { PickType } from '@nestjs/mapped-types';
import {UserManagementService} from "../user.management.service";
import {CreateUserManagementDto} from "../dto/create-user.management.dto";
import {AuthCredentialsDto} from "../dto/auth.credentials.dto";

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly userManagementService: UserManagementService) {}

    @Post('login')
    signIn(@Body() credentials: AuthCredentialsDto ) {
        return this.userManagementService.signIn(credentials);
    }

    @Post('logout')
    signOut() {
        return this.userManagementService.signOut()
    }
}