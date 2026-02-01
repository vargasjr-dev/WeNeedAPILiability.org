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
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS news_items (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      title VARCHAR(500) NOT NULL,
      summary TEXT NOT NULL,
      type VARCHAR(50) NOT NULL DEFAULT 'update',
      url VARCHAR(500),
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

export async function addContactSubmission(email: string, body: string) {
  const sql = getDb();
  try {
    await sql`
      INSERT INTO contact_submissions (email, body)
      VALUES (${email}, ${body})
    `;
    return { success: true };
  } catch (error) {
    console.error("Error adding contact submission:", error);
    return { success: false, error: "Failed to submit" };
  }
}

export async function getNewsItems() {
  const sql = getDb();
  try {
    const items = await sql`
      SELECT id, date, title, summary, type, url
      FROM news_items
      ORDER BY date DESC
    `;
    return items;
  } catch (error) {
    console.error("Error fetching news items:", error);
    return [];
  }
}
