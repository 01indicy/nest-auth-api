import {PickType} from "@nestjs/mapped-types";
import {CreateUserManagementDto} from "./create-user.management.dto";

export class AuthCredentialsDto extends PickType(CreateUserManagementDto,['username','password']){}