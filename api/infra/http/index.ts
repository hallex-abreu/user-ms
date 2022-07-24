import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import { PrismaUserRepository } from '../database/prisma/repositories/prisma-user-repository';
import { FindUserByEmail } from '../../application/usecases/find-user-by-email';
import { CreateUser } from '../../application/usecases/create-user';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/healthycheck', (request, response) => {
  return response.json({ ok: true })
});

app.get('/user/:email', async(request, response) => {
    const { email } = request.params;

    const prismaUserRepository = new PrismaUserRepository();

    const findUserByEmail = new FindUserByEmail(
        prismaUserRepository    
    );

    try {
        const user = await findUserByEmail.execute(email);

        return response.status(200).json(user.props);
    } catch (err:any) {
        console.error(err);
        
        switch(err.message){
            case 'Does not exist user with email': 
                return response.status(400).json({
                    error: 'Does not exist user with email'
                });
                break;
            default:
                return response.status(500).json({
                    error: `Internal unmapped error: ${JSON.stringify(err)}`
                }); 
        }
    }
});

app.post('/user', async (request, response) => {
  const { name, email } = request.body;

  const prismaUserRepository = new PrismaUserRepository();

  const createUser = new CreateUser(
    prismaUserRepository    
  );

  try {
    await createUser.execute({
        id: null,
        name,
        email,
    });

    return response.status(201).json({message: 'Successfully registered'});
  } catch (err:any) {
    console.error(err);
    
    switch(err.message){
        case 'User already registred': 
            return response.status(400).json({
                error: 'User is already registered'
            });
            break;
        default:
            return response.status(500).json({
                error: `Internal unmapped error: ${JSON.stringify(err)}`
            }); 
    }
  }
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`[User] Server running ${process.env.PORT || 3333}`);
});