import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { NextFunction, Request } from "express";
import { AppService } from "src/app.service";
import { User } from "src/user/user.entity";

export interface ExpressRequest extends Request{
    user?: User
}

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private appService:AppService){}
    async use(req: ExpressRequest, res: Response, next: NextFunction){
        if(!req.headers['authorization']){
            req.user = null
            next()
            return
        }
        const token = req.headers['authorization'].split(' ')[1]

        try{
            const decode = verify(token, 'JWT_SECRET') as {username: string}
            const user = await this.appService.findByEmail(decode.username);
            req.user = user
            next()
        }catch(err){
            req.user = null
            next()
        }
    }
}