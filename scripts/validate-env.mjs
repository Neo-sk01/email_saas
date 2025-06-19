import "dotenv/config";

const requiredEnvVars = [
  "FIRECRAWL_API_KEY",
  "ANTHROPIC_API_KEY",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY"
];

function validateEnv() {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingVars.forEach(varName => console.error(`  - ${varName}`));
    console.error("\nPlease add them to your .env.local file and restart the application.");
    process.exit(1);
  }

  console.log("✅ All required environment variables are set.");
}

validateEnv(); 