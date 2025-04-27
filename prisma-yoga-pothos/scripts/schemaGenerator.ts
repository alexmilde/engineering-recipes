import { printSchema } from "graphql";
import { writeFile } from "node:fs";
import { schema } from "../src/schema";

// Function to write the schema to a file
async function writeSchemaToFile(schemaObject: any, filePath: string) {
  // Note the type change here
  try {
    const schemaString = printSchema(schemaObject); // Convert the schema object to a string
    await writeFile(filePath, schemaString, (err) => {});
    console.log(`GraphQL schema written to: ${filePath}`);
  } catch (error) {
    console.error("Error writing schema to file:", error);
  }
}

// Specify the output file path
const outputFilePath = "./generated/schema.graphql";

// Generate and write the schema
writeSchemaToFile(schema, outputFilePath);
