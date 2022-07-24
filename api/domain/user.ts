import { Entity } from "../core/logic/entity";

interface UserProps {
    id: number | null;
    name: string;
    email: string;
}
  
export class User extends Entity<UserProps>{

    get id(): number | null{
        return this.props.id ?? null
    }

    get name(): string{
        return this.props.name
    } 

    get email(): string{
        return this.props.email
    } 

    private constructor(props: UserProps){
        super(props)
    }

    static create(props: UserProps){
        const user = new User(props);

        return user;
    }   
}