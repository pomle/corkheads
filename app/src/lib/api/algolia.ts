import algolia from "algoliasearch";
import config from "algolia.config.json";

export function createClient() {
  return algolia(config.appId, config.searchAPIKey);
}
