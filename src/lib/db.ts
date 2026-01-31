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

export async function getScenarios() {
  const sql = getDb();
  try {
    const scenarios = await sql`
      SELECT id, title, description, today, breakdown, solution, slug
      FROM scenarios
      ORDER BY created_at ASC
    `;
    return scenarios;
  } catch (error) {
    console.error("Error fetching scenarios:", error);
    return [];
  }
}

export async function getScenarioBySlug(slug: string) {
  const sql = getDb();
  try {
    const scenarios = await sql`
      SELECT id, title, description, today, breakdown, solution, slug
      FROM scenarios
      WHERE slug = ${slug}
    `;
    return scenarios[0] || null;
  } catch (error) {
    console.error("Error fetching scenario:", error);
    return null;
  }
}

export async function createScenario(scenario: {
  title: string;
  description: string;
  today: string;
  breakdown: string;
  solution: string;
  slug: string;
}) {
  const sql = getDb();
  try {
    await sql`
      INSERT INTO scenarios (title, description, today, breakdown, solution, slug)
      VALUES (${scenario.title}, ${scenario.description}, ${scenario.today}, ${scenario.breakdown}, ${scenario.solution}, ${scenario.slug})
    `;
    return { success: true };
  } catch (error) {
    console.error("Error creating scenario:", error);
    return { success: false, error: "Failed to create scenario" };
  }
}

export async function updateScenario(
  slug: string,
  scenario: {
    title: string;
    description: string;
    today: string;
    breakdown: string;
    solution: string;
  },
) {
  const sql = getDb();
  try {
    await sql`
      UPDATE scenarios
      SET title = ${scenario.title},
          description = ${scenario.description},
          today = ${scenario.today},
          breakdown = ${scenario.breakdown},
          solution = ${scenario.solution},
          updated_at = CURRENT_TIMESTAMP
      WHERE slug = ${slug}
    `;
    return { success: true };
  } catch (error) {
    console.error("Error updating scenario:", error);
    return { success: false, error: "Failed to update scenario" };
  }
}

export async function deleteScenario(slug: string) {
  const sql = getDb();
  try {
    await sql`
      DELETE FROM scenarios
      WHERE slug = ${slug}
    `;
    return { success: true };
  } catch (error) {
    console.error("Error deleting scenario:", error);
    return { success: false, error: "Failed to delete scenario" };
  }
}
