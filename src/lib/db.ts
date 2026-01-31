import { neon } from "@neondatabase/serverless";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(databaseUrl);
}

export async function initializeDatabase() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS email_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function addEmailSubscriber(email: string) {
  const sql = getDb();
  try {
    await sql`
      INSERT INTO email_subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;
    return { success: true };
  } catch (error) {
    console.error("Error adding email subscriber:", error);
    return { success: false, error: "Failed to subscribe" };
  }
}
