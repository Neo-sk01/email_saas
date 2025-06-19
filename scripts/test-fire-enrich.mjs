import "dotenv/config";
import { companyProfileAgent } from "../fire-enrich/lib/services/specialized-agents/company-profile-agent.js";

async function testFireEnrich() {
  console.log("🔥 Testing Fire Enrich...");

  if (!process.env.FIRECRAWL_API_KEY || !process.env.ANTHROPIC_API_KEY) {
    console.error("❌ Missing FIRECRAWL_API_KEY or ANTHROPIC_API_KEY in .env.local");
    process.exit(1);
  }

  try {
    const testDomain = "www.unruly.agency"; // A sample domain to test with
    console.log(`\nAttempting to enrich domain: ${testDomain}`);
    
    const result = await companyProfileAgent.process({ domain: testDomain });

    console.log("\n✅ Fire Enrich test successful!");
    console.log("---------------------------------");
    console.log("Result:", JSON.stringify(result, null, 2));
    console.log("---------------------------------");
    
    if (result && result.company_profile && result.company_profile.name) {
      console.log(`\nSuccessfully fetched profile for: ${result.company_profile.name}`);
    } else {
      console.warn("\n⚠️ Test completed, but the result seems empty. This might be due to the test domain or API key limitations.");
    }

  } catch (error) {
    console.error("\n❌ Fire Enrich test failed!");
    console.error("--------------------------");
    console.error(error);
    console.error("--------------------------");
    console.error("\nPlease check your API keys and ensure the `fire-enrich` submodule dependencies are installed correctly (`cd fire-enrich && npm install`).");
    process.exit(1);
  }
}

testFireEnrich(); 