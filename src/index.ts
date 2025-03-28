// import app from './app.ts'

// const port = process.env.PORT || 80

// app.listen(port, () => {
//     console.log(`Listening on http://localhost:${port}`)
// })

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
await db.delete(usersTable)
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    email: 'john@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      email: "example@example.com"
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  const useras = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', useras)

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}

main();