import { router, publicProcedure } from '../server';
import { z } from 'zod';
import { prisma } from '../prisma';
import type { User } from '../prisma';
import argon2 from 'argon2';
import { createJWT, verifyJWT } from '../utils/auth';
import { TRPCError } from '@trpc/server';


export const authRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const hashedPass = await argon2.hash(input.password)  

      const user = await prisma.user.create({
        data: {
          email: input.email,
          username: input.username,
          password: hashedPass,
          bio: "",
          contact: "",
          profilePicture: "",
          role: "USER",
        }
      })

      const token = createJWT(user.id)

      return {message: "success", token}
    }),
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async({input}) => {

      let user: User
      try{
        user = await prisma.user.findUniqueOrThrow({
          where: {
            email: input.email
          }
        })
      }catch(e){
        throw new TRPCError({code: "UNAUTHORIZED", message:"Email does not exist", cause: e})
      }


      const validPassword: boolean = await argon2.verify(input.password, user.password)  

      if(validPassword){
        const token = createJWT(user.id)
        return {message: "success", token}
      } 
      throw new TRPCError({code: "UNAUTHORIZED", message:""})

  }),
});
