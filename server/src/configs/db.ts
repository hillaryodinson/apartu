import { Prisma, PrismaClient } from "@prisma/client";
require('dotenv').config();

let prisma: PrismaClient;
declare global {
    var prisma: PrismaClient | undefined;
}

prisma = global.prisma || new PrismaClient();
global.prisma = prisma;

export default prisma;

export const populateDB = async () => { 
    if ((process.env.NODE_ENV?.toLowerCase() === 'development' 
          || process.env.NODE_ENV?.toLowerCase() === 'test')  
          && global.prisma) {
        
          try {
            const admin = await prisma.user.findFirst();
            if (!admin) {
                throw new Error("No user found in database");
            }
          } catch (error) {
            console.log('No database found, initializing...', error);
            await prisma.user.create({
              data: {
                name: 'Admin Account',
                email: 'admin@admin.com',
                role: 'admin',
                password: '$argon2id$v=19$m=65536,t=3,p=4$WwrESfCSMFODHyTjJfZ4mQ$FvgfpUwcg9Josfmq1+z3N4558gT9pIhJLfuePG4JtZI',
              }
            });
            console.log('Database initialized');
          }
    
    }
}