import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthConfig } from '../auth/auth.config';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { UserLoginDto } from '../auth/dto/login.dto';
import { UserRegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class AuthService {

    private userPool: CognitoUserPool;

    constructor( @Inject(forwardRef(() => AuthConfig)) private readonly authConfig: AuthConfig ) {
        this.userPool = new CognitoUserPool({
            UserPoolId: this.authConfig.userPoolId,
            ClientId: this.authConfig.clientId,
        });
    }

    registerUser( userRegisterDto: UserRegisterDto ) {
        const { name, email, password } = userRegisterDto;
        return new Promise((resolve, reject) => {
            return this.userPool.signUp(
                name,
                password,
                [new CognitoUserAttribute({ Name: 'email', Value: email })],
                null,
                (err, result) => {
                if (!result) {
                    reject(err);
                } else {
                    resolve(result.user);
                }
                },
            );
        });
    }
    
    authenticateUser(userLoginDto: UserLoginDto) {
        const { name, password } = userLoginDto;

        const authenticationDetails = new AuthenticationDetails({
            Username: name,
            Password: password,
        });

        const userData = {
            Username: name,
            Pool: this.userPool,
        };

        const newUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            return newUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    resolve(result);
                }, onFailure: err => {
                    reject(err);
                },
            });
        });
    }

}
