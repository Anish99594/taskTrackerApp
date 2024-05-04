import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


@Schema({
    timestamps: true
})
export class User{
    @Prop()
    name: string;
    @Prop({unique: [true, 'Duplicate email entred']})
    username: string;
    @Prop()
    password: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function(next: Function){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})