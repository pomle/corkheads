import algolia from "algoliasearch";
import config from "config/algolia.config.json";

export function createClient() {
  return algolia(config.appId, config.searchAPIKey);
}
