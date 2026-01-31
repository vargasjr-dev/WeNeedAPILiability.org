import { neon } from "@neondatabase/serverless";

async function migrate() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(databaseUrl);

  console.log("Running database migrations...");

  await sql`
    CREATE TABLE IF NOT EXISTS email_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  console.log("Created email_subscribers table");

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  console.log("Created contact_submissions table");

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
  console.log("Created news_items table");

  await sql`
    CREATE TABLE IF NOT EXISTS scenarios (
      id SERIAL PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      description TEXT NOT NULL,
      today TEXT NOT NULL,
      breakdown TEXT NOT NULL,
      solution TEXT NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  console.log("Created scenarios table");

  console.log("Migrations completed successfully");
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
