import fs from "fs";
import path from "path";

// Utility functions for reading and writing JSON files
export const readJSON = <T>(filePath: string): T => {
  try {
    const fullPath = path.resolve(filePath);
    const data = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read JSON file:", filePath);
    return [] as T;
  }
};
// Write data to a JSON file, creating it if it doesn't exist
export const writeJSON = <T>(filePath: string, data: T): void => {
  try {
    const fullPath = path.resolve(filePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to write JSON file:", filePath);
  }
};