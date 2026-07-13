import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const resourcesPath = join(projectRoot, "src", "data", "resources.json");
const resources = JSON.parse(readFileSync(resourcesPath, "utf8"));
const downloadableStatuses = new Set(["available", "updated", "archived"]);
const failures = [];

const validateDownload = (resourceId, download) => {
  const isDownloadable = downloadableStatuses.has(download.status);

  if (!isDownloadable) {
    if (download.fileName || download.filePath) {
      failures.push(
        `${resourceId} is ${download.status} but still exposes a download path.`,
      );
    }
    return;
  }

  if (!download.fileName || !download.filePath) {
    failures.push(`${resourceId} is ${download.status} without a file name or path.`);
    return;
  }

  if (!download.filePath.startsWith("/downloads/")) {
    failures.push(`${resourceId} must use a /downloads/ public path.`);
    return;
  }

  if (basename(download.filePath) !== download.fileName) {
    failures.push(`${resourceId} fileName does not match its filePath.`);
  }

  if (!download.fileName.includes(download.version.toLowerCase())) {
    failures.push(`${resourceId} fileName must include version ${download.version}.`);
  }

  if (download.filePath.toLowerCase().includes("placeholder")) {
    failures.push(`${resourceId} points to a placeholder file.`);
  }

  const publicFilePath = join(projectRoot, "public", download.filePath.slice(1));
  if (!existsSync(publicFilePath)) {
    failures.push(`${resourceId} file does not exist: ${download.filePath}`);
  }
};

for (const resource of resources) {
  validateDownload(resource.id, resource);

  for (const previousVersion of resource.previousVersions) {
    validateDownload(`${resource.id} ${previousVersion.version}`, previousVersion);
  }
}

if (failures.length > 0) {
  console.error("Download validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validated ${resources.length} resource records and their download files.`);
