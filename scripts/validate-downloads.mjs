import { existsSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const resourcesPath = join(projectRoot, "src", "data", "resources.json");
const bookResourcesPath = join(projectRoot, "src", "data", "bookResources.json");
const resources = JSON.parse(readFileSync(resourcesPath, "utf8"));
const bookResources = JSON.parse(readFileSync(bookResourcesPath, "utf8"));
const downloadableStatuses = new Set(["available", "updated", "archived"]);
const failures = [];
const bookResourceTypes = new Set(["prompt", "worksheet", "part-project", "full-project"]);

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

const requireSet = (label, expected, actual) => {
  const missing = expected.filter((item) => !actual.has(item));
  if (missing.length > 0) {
    failures.push(`${label} missing: ${missing.join(", ")}`);
  }
};

const bookResourceIds = new Set();
const bookDownloadPaths = new Set();
const chapterPromptMap = new Map();
const chapterWorksheetMap = new Map();
const partProjectMap = new Map();
let fullProjectCount = 0;

for (const resource of bookResources) {
  if (!resource.id || typeof resource.id !== "string") {
    failures.push("Book resource is missing an id.");
    continue;
  }

  if (bookResourceIds.has(resource.id)) {
    failures.push(`Duplicate book resource id: ${resource.id}`);
  }
  bookResourceIds.add(resource.id);

  if (!bookResourceTypes.has(resource.type)) {
    failures.push(`${resource.id} has an invalid type: ${resource.type}`);
  }

  if (!resource.downloadPath?.startsWith("/downloads/book/")) {
    failures.push(`${resource.id} must use a /downloads/book/ public path.`);
  }

  if (bookDownloadPaths.has(resource.downloadPath)) {
    failures.push(`Duplicate book download path: ${resource.downloadPath}`);
  }
  bookDownloadPaths.add(resource.downloadPath);

  if (!resource.fileName || typeof resource.fileName !== "string") {
    failures.push(`${resource.id} is missing the original file name.`);
  }

  const publicFilePath = join(projectRoot, "public", resource.downloadPath.slice(1));
  if (!existsSync(publicFilePath)) {
    failures.push(`${resource.id} file does not exist: ${resource.downloadPath}`);
  } else if (statSync(publicFilePath).size <= 0) {
    failures.push(`${resource.id} file is empty: ${resource.downloadPath}`);
  }

  if (resource.type === "prompt") {
    chapterPromptMap.set(resource.chapter, resource.id);
  }

  if (resource.type === "worksheet") {
    chapterWorksheetMap.set(resource.chapter, resource.id);
  }

  if (resource.type === "part-project") {
    partProjectMap.set(resource.part, resource.id);
  }

  if (resource.type === "full-project") {
    fullProjectCount += 1;
  }
}

const expectedChapters = Array.from({ length: 22 }, (_, index) => index + 1);
const expectedParts = Array.from({ length: 8 }, (_, index) => index + 1);

requireSet("Book prompt chapters", expectedChapters, chapterPromptMap);
requireSet("Book worksheet chapters", expectedChapters, chapterWorksheetMap);
requireSet("Book PART projects", expectedParts, partProjectMap);

if (fullProjectCount !== 1) {
  failures.push(`Expected exactly one full project file, found ${fullProjectCount}.`);
}

if (failures.length > 0) {
  console.error("Download validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Validated ${resources.length} resource records and ${bookResources.length} book resource files.`,
);
