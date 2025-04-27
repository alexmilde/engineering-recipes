
/**
 * Client
 */

import * as runtime from '@prisma/client/runtime/library'
import * as process from 'node:process'
import * as path from 'node:path'
    import { fileURLToPath } from 'node:url'

    const __dirname = path.dirname(fileURLToPath(import.meta.url))


export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model album
 * 
 */
export type album = runtime.Types.Result.DefaultSelection<Prisma.$albumPayload>
/**
 * Model artist
 * 
 */
export type artist = runtime.Types.Result.DefaultSelection<Prisma.$artistPayload>
/**
 * Model customer
 * 
 */
export type customer = runtime.Types.Result.DefaultSelection<Prisma.$customerPayload>
/**
 * Model employee
 * 
 */
export type employee = runtime.Types.Result.DefaultSelection<Prisma.$employeePayload>
/**
 * Model genre
 * 
 */
export type genre = runtime.Types.Result.DefaultSelection<Prisma.$genrePayload>
/**
 * Model invoice
 * 
 */
export type invoice = runtime.Types.Result.DefaultSelection<Prisma.$invoicePayload>
/**
 * Model invoice_line
 * 
 */
export type invoice_line = runtime.Types.Result.DefaultSelection<Prisma.$invoice_linePayload>
/**
 * Model media_type
 * 
 */
export type media_type = runtime.Types.Result.DefaultSelection<Prisma.$media_typePayload>
/**
 * Model playlist
 * 
 */
export type playlist = runtime.Types.Result.DefaultSelection<Prisma.$playlistPayload>
/**
 * Model playlist_track
 * 
 */
export type playlist_track = runtime.Types.Result.DefaultSelection<Prisma.$playlist_trackPayload>
/**
 * Model track
 * 
 */
export type track = runtime.Types.Result.DefaultSelection<Prisma.$trackPayload>



/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client"
    },
    "output": {
      "value": "/Users/alex/Code/prisma-yoga-pothos/prisma/prisma-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/alex/Code/prisma-yoga-pothos/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativePath": "..",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"./prisma-client\"\n}\n\ngenerator pothos {\n  provider     = \"prisma-pothos-types\"\n  clientOutput = \"./prisma-client\"\n  output       = \"./pothos-types.ts\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel album {\n  album_id  Int     @id\n  title     String  @db.VarChar(160)\n  artist_id Int\n  artist    artist  @relation(fields: [artist_id], references: [artist_id], onDelete: NoAction, onUpdate: NoAction)\n  track     track[]\n\n  @@index([artist_id])\n}\n\nmodel artist {\n  artist_id Int     @id\n  name      String? @db.VarChar(120)\n  album     album[]\n}\n\nmodel customer {\n  customer_id    Int       @id\n  first_name     String    @db.VarChar(40)\n  last_name      String    @db.VarChar(20)\n  company        String?   @db.VarChar(80)\n  address        String?   @db.VarChar(70)\n  city           String?   @db.VarChar(40)\n  state          String?   @db.VarChar(40)\n  country        String?   @db.VarChar(40)\n  postal_code    String?   @db.VarChar(10)\n  phone          String?   @db.VarChar(24)\n  fax            String?   @db.VarChar(24)\n  email          String    @db.VarChar(60)\n  support_rep_id Int?\n  employee       employee? @relation(fields: [support_rep_id], references: [employee_id], onDelete: NoAction, onUpdate: NoAction)\n  invoice        invoice[]\n\n  @@index([support_rep_id])\n}\n\nmodel employee {\n  employee_id    Int        @id\n  last_name      String     @db.VarChar(20)\n  first_name     String     @db.VarChar(20)\n  title          String?    @db.VarChar(30)\n  reports_to     Int?\n  birth_date     DateTime?  @db.Timestamp(6)\n  hire_date      DateTime?  @db.Timestamp(6)\n  address        String?    @db.VarChar(70)\n  city           String?    @db.VarChar(40)\n  state          String?    @db.VarChar(40)\n  country        String?    @db.VarChar(40)\n  postal_code    String?    @db.VarChar(10)\n  phone          String?    @db.VarChar(24)\n  fax            String?    @db.VarChar(24)\n  email          String?    @db.VarChar(60)\n  customer       customer[]\n  employee       employee?  @relation(\"employeeToemployee\", fields: [reports_to], references: [employee_id], onDelete: NoAction, onUpdate: NoAction)\n  other_employee employee[] @relation(\"employeeToemployee\")\n\n  @@index([reports_to])\n}\n\nmodel genre {\n  genre_id Int     @id\n  name     String? @db.VarChar(120)\n  track    track[]\n}\n\nmodel invoice {\n  invoice_id          Int            @id\n  customer_id         Int\n  invoice_date        DateTime       @db.Timestamp(6)\n  billing_address     String?        @db.VarChar(70)\n  billing_city        String?        @db.VarChar(40)\n  billing_state       String?        @db.VarChar(40)\n  billing_country     String?        @db.VarChar(40)\n  billing_postal_code String?        @db.VarChar(10)\n  total               Decimal        @db.Decimal(10, 2)\n  customer            customer       @relation(fields: [customer_id], references: [customer_id], onDelete: NoAction, onUpdate: NoAction)\n  invoice_line        invoice_line[]\n\n  @@index([customer_id])\n}\n\nmodel invoice_line {\n  invoice_line_id Int     @id\n  invoice_id      Int\n  track_id        Int\n  unit_price      Decimal @db.Decimal(10, 2)\n  quantity        Int\n  invoice         invoice @relation(fields: [invoice_id], references: [invoice_id], onDelete: NoAction, onUpdate: NoAction)\n  track           track   @relation(fields: [track_id], references: [track_id], onDelete: NoAction, onUpdate: NoAction)\n\n  @@index([invoice_id])\n  @@index([track_id])\n}\n\nmodel media_type {\n  media_type_id Int     @id\n  name          String? @db.VarChar(120)\n  track         track[]\n}\n\nmodel playlist {\n  playlist_id    Int              @id\n  name           String?          @db.VarChar(120)\n  playlist_track playlist_track[]\n}\n\nmodel playlist_track {\n  playlist_id Int\n  track_id    Int\n  playlist    playlist @relation(fields: [playlist_id], references: [playlist_id], onDelete: NoAction, onUpdate: NoAction)\n  track       track    @relation(fields: [track_id], references: [track_id], onDelete: NoAction, onUpdate: NoAction)\n\n  @@id([playlist_id, track_id])\n  @@index([playlist_id])\n  @@index([track_id])\n}\n\nmodel track {\n  track_id       Int              @id\n  name           String           @db.VarChar(200)\n  album_id       Int?\n  media_type_id  Int\n  genre_id       Int?\n  composer       String?          @db.VarChar(220)\n  milliseconds   Int\n  bytes          Int?\n  unit_price     Decimal          @db.Decimal(10, 2)\n  invoice_line   invoice_line[]\n  playlist_track playlist_track[]\n  album          album?           @relation(fields: [album_id], references: [album_id], onDelete: NoAction, onUpdate: NoAction)\n  genre          genre?           @relation(fields: [genre_id], references: [genre_id], onDelete: NoAction, onUpdate: NoAction)\n  media_type     media_type       @relation(fields: [media_type_id], references: [media_type_id], onDelete: NoAction, onUpdate: NoAction)\n\n  @@index([album_id])\n  @@index([genre_id])\n  @@index([media_type_id])\n}\n",
  "inlineSchemaHash": "ba904f5008ec79614cec763051fc953fd9bfacce5de517514d21c7680fafd251",
  "copyEngine": true,
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "dirname": ""
}
config.dirname = __dirname

config.runtimeDataModel = JSON.parse("{\"models\":{\"album\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"album_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"160\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"artist_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"artist\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"artist\",\"nativeType\":null,\"relationName\":\"albumToartist\",\"relationFromFields\":[\"artist_id\"],\"relationToFields\":[\"artist_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"track\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"track\",\"nativeType\":null,\"relationName\":\"albumTotrack\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"artist\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"artist_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"120\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"album\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"album\",\"nativeType\":null,\"relationName\":\"albumToartist\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"customer\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"customer_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"company\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"80\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"70\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postal_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"24\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fax\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"24\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"60\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"support_rep_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employee\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"employee\",\"nativeType\":null,\"relationName\":\"customerToemployee\",\"relationFromFields\":[\"support_rep_id\"],\"relationToFields\":[\"employee_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoice\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"invoice\",\"nativeType\":null,\"relationName\":\"customerToinvoice\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"employee\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"employee_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"30\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reports_to\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"birth_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hire_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"70\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postal_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"24\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fax\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"24\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"60\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customer\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"customer\",\"nativeType\":null,\"relationName\":\"customerToemployee\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employee\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"employee\",\"nativeType\":null,\"relationName\":\"employeeToemployee\",\"relationFromFields\":[\"reports_to\"],\"relationToFields\":[\"employee_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"other_employee\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"employee\",\"nativeType\":null,\"relationName\":\"employeeToemployee\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"genre\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"genre_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"120\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"track\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"track\",\"nativeType\":null,\"relationName\":\"genreTotrack\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"invoice\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"invoice_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customer_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoice_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billing_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"70\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billing_city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billing_state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billing_country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billing_postal_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"customer\",\"nativeType\":null,\"relationName\":\"customerToinvoice\",\"relationFromFields\":[\"customer_id\"],\"relationToFields\":[\"customer_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoice_line\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"invoice_line\",\"nativeType\":null,\"relationName\":\"invoiceToinvoice_line\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"invoice_line\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"invoice_line_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoice_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"track_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unit_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoice\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"invoice\",\"nativeType\":null,\"relationName\":\"invoiceToinvoice_line\",\"relationFromFields\":[\"invoice_id\"],\"relationToFields\":[\"invoice_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"track\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"track\",\"nativeType\":null,\"relationName\":\"invoice_lineTotrack\",\"relationFromFields\":[\"track_id\"],\"relationToFields\":[\"track_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"media_type\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"media_type_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"120\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"track\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"track\",\"nativeType\":null,\"relationName\":\"media_typeTotrack\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"playlist\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"playlist_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"120\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playlist_track\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"playlist_track\",\"nativeType\":null,\"relationName\":\"playlistToplaylist_track\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"playlist_track\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"playlist_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"track_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playlist\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"playlist\",\"nativeType\":null,\"relationName\":\"playlistToplaylist_track\",\"relationFromFields\":[\"playlist_id\"],\"relationToFields\":[\"playlist_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"track\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"track\",\"nativeType\":null,\"relationName\":\"playlist_trackTotrack\",\"relationFromFields\":[\"track_id\"],\"relationToFields\":[\"track_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"playlist_id\",\"track_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"track\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"track_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"200\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"album_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"media_type_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genre_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"composer\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"220\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"milliseconds\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bytes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unit_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoice_line\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"invoice_line\",\"nativeType\":null,\"relationName\":\"invoice_lineTotrack\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playlist_track\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"playlist_track\",\"nativeType\":null,\"relationName\":\"playlist_trackTotrack\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"album\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"album\",\"nativeType\":null,\"relationName\":\"albumTotrack\",\"relationFromFields\":[\"album_id\"],\"relationToFields\":[\"album_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genre\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"genre\",\"nativeType\":null,\"relationName\":\"genreTotrack\",\"relationFromFields\":[\"genre_id\"],\"relationToFields\":[\"genre_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"media_type\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"media_type\",\"nativeType\":null,\"relationName\":\"media_typeTotrack\",\"relationFromFields\":[\"media_type_id\"],\"relationToFields\":[\"media_type_id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
config.engineWasm = undefined
config.compilerWasm = undefined



// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin.dylib.node")
path.join(process.cwd(), "prisma/prisma-client/libquery_engine-darwin.dylib.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma")
path.join(process.cwd(), "prisma/prisma-client/schema.prisma")


interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Albums
   * const albums = await prisma.album.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  new <
    ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
  >(options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>): PrismaClient<ClientOptions, U, ExtArgs>
}

/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Albums
 * const albums = await prisma.album.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<R>


  $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.album`: Exposes CRUD operations for the **album** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Albums
    * const albums = await prisma.album.findMany()
    * ```
    */
  get album(): Prisma.albumDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artist`: Exposes CRUD operations for the **artist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Artists
    * const artists = await prisma.artist.findMany()
    * ```
    */
  get artist(): Prisma.artistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.customerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.employeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.genre`: Exposes CRUD operations for the **genre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Genres
    * const genres = await prisma.genre.findMany()
    * ```
    */
  get genre(): Prisma.genreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.invoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoice_line`: Exposes CRUD operations for the **invoice_line** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoice_lines
    * const invoice_lines = await prisma.invoice_line.findMany()
    * ```
    */
  get invoice_line(): Prisma.invoice_lineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.media_type`: Exposes CRUD operations for the **media_type** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Media_types
    * const media_types = await prisma.media_type.findMany()
    * ```
    */
  get media_type(): Prisma.media_typeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playlist`: Exposes CRUD operations for the **playlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlists
    * const playlists = await prisma.playlist.findMany()
    * ```
    */
  get playlist(): Prisma.playlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playlist_track`: Exposes CRUD operations for the **playlist_track** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlist_tracks
    * const playlist_tracks = await prisma.playlist_track.findMany()
    * ```
    */
  get playlist_track(): Prisma.playlist_trackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.track`: Exposes CRUD operations for the **track** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tracks
    * const tracks = await prisma.track.findMany()
    * ```
    */
  get track(): Prisma.trackDelegate<ExtArgs, ClientOptions>;
}

export const PrismaClient = runtime.getPrismaClient(config) as unknown as PrismaClientConstructor

export namespace Prisma {
  export type DMMF = typeof runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Validator
   */
  export const validator = runtime.Public.validator

  /**
   * Prisma Errors
   */

  export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError

  export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError

  export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError

  export const PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export type PrismaClientInitializationError = runtime.PrismaClientInitializationError

  export const PrismaClientValidationError = runtime.PrismaClientValidationError
  export type PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export const sql = runtime.sqltag
  export const empty = runtime.empty
  export const join = runtime.join
  export const raw = runtime.raw
  export const Sql = runtime.Sql
  export type Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export const Decimal = runtime.Decimal
  export type Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = runtime.Types.Extensions.UserArgs
  export const getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>
  export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>
  export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>
  export type Exact<A, W> = runtime.Types.Public.Exact<A, W>

  export type PrismaVersion = {
    client: string
    engine: string
  }

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export const prismaVersion: PrismaVersion = {
    client: "6.6.0",
    engine: "f676762280b54cd07c770017ed3711ddde35f37a"
  }

  /**
   * Utility Types
   */


  export type JsonObject = runtime.JsonObject
  export type JsonArray = runtime.JsonArray
  export type JsonValue = runtime.JsonValue
  export type InputJsonObject = runtime.InputJsonObject
  export type InputJsonArray = runtime.InputJsonArray
  export type InputJsonValue = runtime.InputJsonValue

  export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull),
    JsonNull: runtime.objectEnumValues.classes.JsonNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull),
    AnyNull: runtime.objectEnumValues.classes.AnyNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull),
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull = runtime.objectEnumValues.instances.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull = runtime.objectEnumValues.instances.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull = runtime.objectEnumValues.instances.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  export type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Boolean = True | False

  export type True = 1

  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName = {
    album: 'album',
    artist: 'artist',
    customer: 'customer',
    employee: 'employee',
    genre: 'genre',
    invoice: 'invoice',
    invoice_line: 'invoice_line',
    media_type: 'media_type',
    playlist: 'playlist',
    playlist_track: 'playlist_track',
    track: 'track'
  } as const

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export interface TypeMapCb<ClientOptions = {}> extends runtime.Types.Utils.Fn<{extArgs: runtime.Types.Extensions.InternalArgs }, runtime.Types.Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "album" | "artist" | "customer" | "employee" | "genre" | "invoice" | "invoice_line" | "media_type" | "playlist" | "playlist_track" | "track"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      album: {
        payload: Prisma.$albumPayload<ExtArgs>
        fields: Prisma.albumFieldRefs
        operations: {
          findUnique: {
            args: Prisma.albumFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.albumFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>
          }
          findFirst: {
            args: Prisma.albumFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.albumFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>
          }
          findMany: {
            args: Prisma.albumFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>[]
          }
          create: {
            args: Prisma.albumCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>
          }
          createMany: {
            args: Prisma.albumCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.albumCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>[]
          }
          delete: {
            args: Prisma.albumDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>
          }
          update: {
            args: Prisma.albumUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>
          }
          deleteMany: {
            args: Prisma.albumDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.albumUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.albumUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>[]
          }
          upsert: {
            args: Prisma.albumUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$albumPayload>
          }
          aggregate: {
            args: Prisma.AlbumAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateAlbum>
          }
          groupBy: {
            args: Prisma.albumGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AlbumGroupByOutputType>[]
          }
          count: {
            args: Prisma.albumCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AlbumCountAggregateOutputType> | number
          }
        }
      }
      artist: {
        payload: Prisma.$artistPayload<ExtArgs>
        fields: Prisma.artistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.artistFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.artistFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>
          }
          findFirst: {
            args: Prisma.artistFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.artistFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>
          }
          findMany: {
            args: Prisma.artistFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>[]
          }
          create: {
            args: Prisma.artistCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>
          }
          createMany: {
            args: Prisma.artistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.artistCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>[]
          }
          delete: {
            args: Prisma.artistDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>
          }
          update: {
            args: Prisma.artistUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>
          }
          deleteMany: {
            args: Prisma.artistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.artistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.artistUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>[]
          }
          upsert: {
            args: Prisma.artistUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$artistPayload>
          }
          aggregate: {
            args: Prisma.ArtistAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateArtist>
          }
          groupBy: {
            args: Prisma.artistGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<ArtistGroupByOutputType>[]
          }
          count: {
            args: Prisma.artistCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<ArtistCountAggregateOutputType> | number
          }
        }
      }
      customer: {
        payload: Prisma.$customerPayload<ExtArgs>
        fields: Prisma.customerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.customerFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.customerFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>
          }
          findFirst: {
            args: Prisma.customerFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.customerFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>
          }
          findMany: {
            args: Prisma.customerFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>[]
          }
          create: {
            args: Prisma.customerCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>
          }
          createMany: {
            args: Prisma.customerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.customerCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>[]
          }
          delete: {
            args: Prisma.customerDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>
          }
          update: {
            args: Prisma.customerUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>
          }
          deleteMany: {
            args: Prisma.customerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.customerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.customerUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>[]
          }
          upsert: {
            args: Prisma.customerUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$customerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.customerGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.customerCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      employee: {
        payload: Prisma.$employeePayload<ExtArgs>
        fields: Prisma.employeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.employeeFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.employeeFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>
          }
          findFirst: {
            args: Prisma.employeeFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.employeeFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>
          }
          findMany: {
            args: Prisma.employeeFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>[]
          }
          create: {
            args: Prisma.employeeCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>
          }
          createMany: {
            args: Prisma.employeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.employeeCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>[]
          }
          delete: {
            args: Prisma.employeeDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>
          }
          update: {
            args: Prisma.employeeUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>
          }
          deleteMany: {
            args: Prisma.employeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.employeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.employeeUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>[]
          }
          upsert: {
            args: Prisma.employeeUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$employeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.employeeGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.employeeCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      genre: {
        payload: Prisma.$genrePayload<ExtArgs>
        fields: Prisma.genreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.genreFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.genreFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>
          }
          findFirst: {
            args: Prisma.genreFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.genreFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>
          }
          findMany: {
            args: Prisma.genreFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>[]
          }
          create: {
            args: Prisma.genreCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>
          }
          createMany: {
            args: Prisma.genreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.genreCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>[]
          }
          delete: {
            args: Prisma.genreDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>
          }
          update: {
            args: Prisma.genreUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>
          }
          deleteMany: {
            args: Prisma.genreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.genreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.genreUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>[]
          }
          upsert: {
            args: Prisma.genreUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$genrePayload>
          }
          aggregate: {
            args: Prisma.GenreAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateGenre>
          }
          groupBy: {
            args: Prisma.genreGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<GenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.genreCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<GenreCountAggregateOutputType> | number
          }
        }
      }
      invoice: {
        payload: Prisma.$invoicePayload<ExtArgs>
        fields: Prisma.invoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.invoiceFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.invoiceFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>
          }
          findFirst: {
            args: Prisma.invoiceFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.invoiceFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>
          }
          findMany: {
            args: Prisma.invoiceFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>[]
          }
          create: {
            args: Prisma.invoiceCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>
          }
          createMany: {
            args: Prisma.invoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.invoiceCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>[]
          }
          delete: {
            args: Prisma.invoiceDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>
          }
          update: {
            args: Prisma.invoiceUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>
          }
          deleteMany: {
            args: Prisma.invoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.invoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.invoiceUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>[]
          }
          upsert: {
            args: Prisma.invoiceUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.invoiceGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.invoiceCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      invoice_line: {
        payload: Prisma.$invoice_linePayload<ExtArgs>
        fields: Prisma.invoice_lineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.invoice_lineFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.invoice_lineFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>
          }
          findFirst: {
            args: Prisma.invoice_lineFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.invoice_lineFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>
          }
          findMany: {
            args: Prisma.invoice_lineFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>[]
          }
          create: {
            args: Prisma.invoice_lineCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>
          }
          createMany: {
            args: Prisma.invoice_lineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.invoice_lineCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>[]
          }
          delete: {
            args: Prisma.invoice_lineDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>
          }
          update: {
            args: Prisma.invoice_lineUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>
          }
          deleteMany: {
            args: Prisma.invoice_lineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.invoice_lineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.invoice_lineUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>[]
          }
          upsert: {
            args: Prisma.invoice_lineUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$invoice_linePayload>
          }
          aggregate: {
            args: Prisma.Invoice_lineAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateInvoice_line>
          }
          groupBy: {
            args: Prisma.invoice_lineGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<Invoice_lineGroupByOutputType>[]
          }
          count: {
            args: Prisma.invoice_lineCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<Invoice_lineCountAggregateOutputType> | number
          }
        }
      }
      media_type: {
        payload: Prisma.$media_typePayload<ExtArgs>
        fields: Prisma.media_typeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.media_typeFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.media_typeFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>
          }
          findFirst: {
            args: Prisma.media_typeFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.media_typeFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>
          }
          findMany: {
            args: Prisma.media_typeFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>[]
          }
          create: {
            args: Prisma.media_typeCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>
          }
          createMany: {
            args: Prisma.media_typeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.media_typeCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>[]
          }
          delete: {
            args: Prisma.media_typeDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>
          }
          update: {
            args: Prisma.media_typeUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>
          }
          deleteMany: {
            args: Prisma.media_typeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.media_typeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.media_typeUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>[]
          }
          upsert: {
            args: Prisma.media_typeUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$media_typePayload>
          }
          aggregate: {
            args: Prisma.Media_typeAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateMedia_type>
          }
          groupBy: {
            args: Prisma.media_typeGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<Media_typeGroupByOutputType>[]
          }
          count: {
            args: Prisma.media_typeCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<Media_typeCountAggregateOutputType> | number
          }
        }
      }
      playlist: {
        payload: Prisma.$playlistPayload<ExtArgs>
        fields: Prisma.playlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.playlistFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.playlistFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          findFirst: {
            args: Prisma.playlistFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.playlistFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          findMany: {
            args: Prisma.playlistFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>[]
          }
          create: {
            args: Prisma.playlistCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          createMany: {
            args: Prisma.playlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.playlistCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>[]
          }
          delete: {
            args: Prisma.playlistDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          update: {
            args: Prisma.playlistUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          deleteMany: {
            args: Prisma.playlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.playlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.playlistUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>[]
          }
          upsert: {
            args: Prisma.playlistUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          aggregate: {
            args: Prisma.PlaylistAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregatePlaylist>
          }
          groupBy: {
            args: Prisma.playlistGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<PlaylistGroupByOutputType>[]
          }
          count: {
            args: Prisma.playlistCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<PlaylistCountAggregateOutputType> | number
          }
        }
      }
      playlist_track: {
        payload: Prisma.$playlist_trackPayload<ExtArgs>
        fields: Prisma.playlist_trackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.playlist_trackFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.playlist_trackFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>
          }
          findFirst: {
            args: Prisma.playlist_trackFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.playlist_trackFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>
          }
          findMany: {
            args: Prisma.playlist_trackFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>[]
          }
          create: {
            args: Prisma.playlist_trackCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>
          }
          createMany: {
            args: Prisma.playlist_trackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.playlist_trackCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>[]
          }
          delete: {
            args: Prisma.playlist_trackDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>
          }
          update: {
            args: Prisma.playlist_trackUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>
          }
          deleteMany: {
            args: Prisma.playlist_trackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.playlist_trackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.playlist_trackUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>[]
          }
          upsert: {
            args: Prisma.playlist_trackUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$playlist_trackPayload>
          }
          aggregate: {
            args: Prisma.Playlist_trackAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregatePlaylist_track>
          }
          groupBy: {
            args: Prisma.playlist_trackGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<Playlist_trackGroupByOutputType>[]
          }
          count: {
            args: Prisma.playlist_trackCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<Playlist_trackCountAggregateOutputType> | number
          }
        }
      }
      track: {
        payload: Prisma.$trackPayload<ExtArgs>
        fields: Prisma.trackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.trackFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.trackFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>
          }
          findFirst: {
            args: Prisma.trackFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.trackFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>
          }
          findMany: {
            args: Prisma.trackFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>[]
          }
          create: {
            args: Prisma.trackCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>
          }
          createMany: {
            args: Prisma.trackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.trackCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>[]
          }
          delete: {
            args: Prisma.trackDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>
          }
          update: {
            args: Prisma.trackUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>
          }
          deleteMany: {
            args: Prisma.trackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.trackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.trackUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>[]
          }
          upsert: {
            args: Prisma.trackUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$trackPayload>
          }
          aggregate: {
            args: Prisma.TrackAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateTrack>
          }
          groupBy: {
            args: Prisma.trackGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<TrackGroupByOutputType>[]
          }
          count: {
            args: Prisma.trackCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<TrackCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension = runtime.Extensions.defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<"define", Prisma.TypeMapCb, runtime.Types.Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    album?: albumOmit
    artist?: artistOmit
    customer?: customerOmit
    employee?: employeeOmit
    genre?: genreOmit
    invoice?: invoiceOmit
    invoice_line?: invoice_lineOmit
    media_type?: media_typeOmit
    playlist?: playlistOmit
    playlist_track?: playlist_trackOmit
    track?: trackOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>,
  ) => runtime.Types.Utils.JsPromise<T>

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AlbumCountOutputType
   */

  export type AlbumCountOutputType = {
    track: number
  }

  export type AlbumCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    track?: boolean | AlbumCountOutputTypeCountTrackArgs
  }

  // Custom InputTypes
  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumCountOutputType
     */
    select?: AlbumCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeCountTrackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: trackWhereInput
  }


  /**
   * Count Type ArtistCountOutputType
   */

  export type ArtistCountOutputType = {
    album: number
  }

  export type ArtistCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    album?: boolean | ArtistCountOutputTypeCountAlbumArgs
  }

  // Custom InputTypes
  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistCountOutputType
     */
    select?: ArtistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeCountAlbumArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: albumWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    invoice: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | CustomerCountOutputTypeCountInvoiceArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountInvoiceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: invoiceWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    customer: number
    other_employee: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | EmployeeCountOutputTypeCountCustomerArgs
    other_employee?: boolean | EmployeeCountOutputTypeCountOther_employeeArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountCustomerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: customerWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountOther_employeeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: employeeWhereInput
  }


  /**
   * Count Type GenreCountOutputType
   */

  export type GenreCountOutputType = {
    track: number
  }

  export type GenreCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    track?: boolean | GenreCountOutputTypeCountTrackArgs
  }

  // Custom InputTypes
  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GenreCountOutputType
     */
    select?: GenreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountTrackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: trackWhereInput
  }


  /**
   * Count Type InvoiceCountOutputType
   */

  export type InvoiceCountOutputType = {
    invoice_line: number
  }

  export type InvoiceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice_line?: boolean | InvoiceCountOutputTypeCountInvoice_lineArgs
  }

  // Custom InputTypes
  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceCountOutputType
     */
    select?: InvoiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountInvoice_lineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: invoice_lineWhereInput
  }


  /**
   * Count Type Media_typeCountOutputType
   */

  export type Media_typeCountOutputType = {
    track: number
  }

  export type Media_typeCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    track?: boolean | Media_typeCountOutputTypeCountTrackArgs
  }

  // Custom InputTypes
  /**
   * Media_typeCountOutputType without action
   */
  export type Media_typeCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media_typeCountOutputType
     */
    select?: Media_typeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Media_typeCountOutputType without action
   */
  export type Media_typeCountOutputTypeCountTrackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: trackWhereInput
  }


  /**
   * Count Type PlaylistCountOutputType
   */

  export type PlaylistCountOutputType = {
    playlist_track: number
  }

  export type PlaylistCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    playlist_track?: boolean | PlaylistCountOutputTypeCountPlaylist_trackArgs
  }

  // Custom InputTypes
  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCountOutputType
     */
    select?: PlaylistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeCountPlaylist_trackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: playlist_trackWhereInput
  }


  /**
   * Count Type TrackCountOutputType
   */

  export type TrackCountOutputType = {
    invoice_line: number
    playlist_track: number
  }

  export type TrackCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice_line?: boolean | TrackCountOutputTypeCountInvoice_lineArgs
    playlist_track?: boolean | TrackCountOutputTypeCountPlaylist_trackArgs
  }

  // Custom InputTypes
  /**
   * TrackCountOutputType without action
   */
  export type TrackCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackCountOutputType
     */
    select?: TrackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrackCountOutputType without action
   */
  export type TrackCountOutputTypeCountInvoice_lineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: invoice_lineWhereInput
  }

  /**
   * TrackCountOutputType without action
   */
  export type TrackCountOutputTypeCountPlaylist_trackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: playlist_trackWhereInput
  }


  /**
   * Models
   */

  /**
   * Model album
   */

  export type AggregateAlbum = {
    _count: AlbumCountAggregateOutputType | null
    _avg: AlbumAvgAggregateOutputType | null
    _sum: AlbumSumAggregateOutputType | null
    _min: AlbumMinAggregateOutputType | null
    _max: AlbumMaxAggregateOutputType | null
  }

  export type AlbumAvgAggregateOutputType = {
    album_id: number | null
    artist_id: number | null
  }

  export type AlbumSumAggregateOutputType = {
    album_id: number | null
    artist_id: number | null
  }

  export type AlbumMinAggregateOutputType = {
    album_id: number | null
    title: string | null
    artist_id: number | null
  }

  export type AlbumMaxAggregateOutputType = {
    album_id: number | null
    title: string | null
    artist_id: number | null
  }

  export type AlbumCountAggregateOutputType = {
    album_id: number
    title: number
    artist_id: number
    _all: number
  }


  export type AlbumAvgAggregateInputType = {
    album_id?: true
    artist_id?: true
  }

  export type AlbumSumAggregateInputType = {
    album_id?: true
    artist_id?: true
  }

  export type AlbumMinAggregateInputType = {
    album_id?: true
    title?: true
    artist_id?: true
  }

  export type AlbumMaxAggregateInputType = {
    album_id?: true
    title?: true
    artist_id?: true
  }

  export type AlbumCountAggregateInputType = {
    album_id?: true
    title?: true
    artist_id?: true
    _all?: true
  }

  export type AlbumAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which album to aggregate.
     */
    where?: albumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of albums to fetch.
     */
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: albumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned albums
    **/
    _count?: true | AlbumCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlbumAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlbumSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlbumMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlbumMaxAggregateInputType
  }

  export type GetAlbumAggregateType<T extends AlbumAggregateArgs> = {
        [P in keyof T & keyof AggregateAlbum]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlbum[P]>
      : GetScalarType<T[P], AggregateAlbum[P]>
  }




  export type albumGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: albumWhereInput
    orderBy?: albumOrderByWithAggregationInput | albumOrderByWithAggregationInput[]
    by: AlbumScalarFieldEnum[] | AlbumScalarFieldEnum
    having?: albumScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlbumCountAggregateInputType | true
    _avg?: AlbumAvgAggregateInputType
    _sum?: AlbumSumAggregateInputType
    _min?: AlbumMinAggregateInputType
    _max?: AlbumMaxAggregateInputType
  }

  export type AlbumGroupByOutputType = {
    album_id: number
    title: string
    artist_id: number
    _count: AlbumCountAggregateOutputType | null
    _avg: AlbumAvgAggregateOutputType | null
    _sum: AlbumSumAggregateOutputType | null
    _min: AlbumMinAggregateOutputType | null
    _max: AlbumMaxAggregateOutputType | null
  }

  type GetAlbumGroupByPayload<T extends albumGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlbumGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlbumGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlbumGroupByOutputType[P]>
            : GetScalarType<T[P], AlbumGroupByOutputType[P]>
        }
      >
    >


  export type albumSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    album_id?: boolean
    title?: boolean
    artist_id?: boolean
    artist?: boolean | artistDefaultArgs<ExtArgs>
    track?: boolean | album$trackArgs<ExtArgs>
    _count?: boolean | AlbumCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["album"]>

  export type albumSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    album_id?: boolean
    title?: boolean
    artist_id?: boolean
    artist?: boolean | artistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["album"]>

  export type albumSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    album_id?: boolean
    title?: boolean
    artist_id?: boolean
    artist?: boolean | artistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["album"]>

  export type albumSelectScalar = {
    album_id?: boolean
    title?: boolean
    artist_id?: boolean
  }

  export type albumOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"album_id" | "title" | "artist_id", ExtArgs["result"]["album"]>
  export type albumInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    artist?: boolean | artistDefaultArgs<ExtArgs>
    track?: boolean | album$trackArgs<ExtArgs>
    _count?: boolean | AlbumCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type albumIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    artist?: boolean | artistDefaultArgs<ExtArgs>
  }
  export type albumIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    artist?: boolean | artistDefaultArgs<ExtArgs>
  }

  export type $albumPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "album"
    objects: {
      artist: Prisma.$artistPayload<ExtArgs>
      track: Prisma.$trackPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      album_id: number
      title: string
      artist_id: number
    }, ExtArgs["result"]["album"]>
    composites: {}
  }

  export type albumGetPayload<S extends boolean | null | undefined | albumDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$albumPayload, S>

  export type albumCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<albumFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlbumCountAggregateInputType | true
    }

  export interface albumDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['album'], meta: { name: 'album' } }
    /**
     * Find zero or one Album that matches the filter.
     * @param {albumFindUniqueArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends albumFindUniqueArgs>(args: SelectSubset<T, albumFindUniqueArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Album that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {albumFindUniqueOrThrowArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends albumFindUniqueOrThrowArgs>(args: SelectSubset<T, albumFindUniqueOrThrowArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Album that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumFindFirstArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends albumFindFirstArgs>(args?: SelectSubset<T, albumFindFirstArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Album that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumFindFirstOrThrowArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends albumFindFirstOrThrowArgs>(args?: SelectSubset<T, albumFindFirstOrThrowArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Albums that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Albums
     * const albums = await prisma.album.findMany()
     * 
     * // Get first 10 Albums
     * const albums = await prisma.album.findMany({ take: 10 })
     * 
     * // Only select the `album_id`
     * const albumWithAlbum_idOnly = await prisma.album.findMany({ select: { album_id: true } })
     * 
     */
    findMany<T extends albumFindManyArgs>(args?: SelectSubset<T, albumFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Album.
     * @param {albumCreateArgs} args - Arguments to create a Album.
     * @example
     * // Create one Album
     * const Album = await prisma.album.create({
     *   data: {
     *     // ... data to create a Album
     *   }
     * })
     * 
     */
    create<T extends albumCreateArgs>(args: SelectSubset<T, albumCreateArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Albums.
     * @param {albumCreateManyArgs} args - Arguments to create many Albums.
     * @example
     * // Create many Albums
     * const album = await prisma.album.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends albumCreateManyArgs>(args?: SelectSubset<T, albumCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Albums and returns the data saved in the database.
     * @param {albumCreateManyAndReturnArgs} args - Arguments to create many Albums.
     * @example
     * // Create many Albums
     * const album = await prisma.album.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Albums and only return the `album_id`
     * const albumWithAlbum_idOnly = await prisma.album.createManyAndReturn({
     *   select: { album_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends albumCreateManyAndReturnArgs>(args?: SelectSubset<T, albumCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Album.
     * @param {albumDeleteArgs} args - Arguments to delete one Album.
     * @example
     * // Delete one Album
     * const Album = await prisma.album.delete({
     *   where: {
     *     // ... filter to delete one Album
     *   }
     * })
     * 
     */
    delete<T extends albumDeleteArgs>(args: SelectSubset<T, albumDeleteArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Album.
     * @param {albumUpdateArgs} args - Arguments to update one Album.
     * @example
     * // Update one Album
     * const album = await prisma.album.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends albumUpdateArgs>(args: SelectSubset<T, albumUpdateArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Albums.
     * @param {albumDeleteManyArgs} args - Arguments to filter Albums to delete.
     * @example
     * // Delete a few Albums
     * const { count } = await prisma.album.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends albumDeleteManyArgs>(args?: SelectSubset<T, albumDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Albums.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Albums
     * const album = await prisma.album.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends albumUpdateManyArgs>(args: SelectSubset<T, albumUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Albums and returns the data updated in the database.
     * @param {albumUpdateManyAndReturnArgs} args - Arguments to update many Albums.
     * @example
     * // Update many Albums
     * const album = await prisma.album.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Albums and only return the `album_id`
     * const albumWithAlbum_idOnly = await prisma.album.updateManyAndReturn({
     *   select: { album_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends albumUpdateManyAndReturnArgs>(args: SelectSubset<T, albumUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Album.
     * @param {albumUpsertArgs} args - Arguments to update or create a Album.
     * @example
     * // Update or create a Album
     * const album = await prisma.album.upsert({
     *   create: {
     *     // ... data to create a Album
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Album we want to update
     *   }
     * })
     */
    upsert<T extends albumUpsertArgs>(args: SelectSubset<T, albumUpsertArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Albums.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumCountArgs} args - Arguments to filter Albums to count.
     * @example
     * // Count the number of Albums
     * const count = await prisma.album.count({
     *   where: {
     *     // ... the filter for the Albums we want to count
     *   }
     * })
    **/
    count<T extends albumCountArgs>(
      args?: Subset<T, albumCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlbumCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Album.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlbumAggregateArgs>(args: Subset<T, AlbumAggregateArgs>): Prisma.PrismaPromise<GetAlbumAggregateType<T>>

    /**
     * Group by Album.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends albumGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: albumGroupByArgs['orderBy'] }
        : { orderBy?: albumGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, albumGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlbumGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the album model
   */
  readonly fields: albumFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for album.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__albumClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    artist<T extends artistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, artistDefaultArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    track<T extends album$trackArgs<ExtArgs> = {}>(args?: Subset<T, album$trackArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the album model
   */
  export interface albumFieldRefs {
    readonly album_id: FieldRef<"album", 'Int'>
    readonly title: FieldRef<"album", 'String'>
    readonly artist_id: FieldRef<"album", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * album findUnique
   */
  export type albumFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which album to fetch.
     */
    where: albumWhereUniqueInput
  }

  /**
   * album findUniqueOrThrow
   */
  export type albumFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which album to fetch.
     */
    where: albumWhereUniqueInput
  }

  /**
   * album findFirst
   */
  export type albumFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which album to fetch.
     */
    where?: albumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of albums to fetch.
     */
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for albums.
     */
    cursor?: albumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of albums.
     */
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * album findFirstOrThrow
   */
  export type albumFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which album to fetch.
     */
    where?: albumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of albums to fetch.
     */
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for albums.
     */
    cursor?: albumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of albums.
     */
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * album findMany
   */
  export type albumFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which albums to fetch.
     */
    where?: albumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of albums to fetch.
     */
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing albums.
     */
    cursor?: albumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` albums.
     */
    skip?: number
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * album create
   */
  export type albumCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * The data needed to create a album.
     */
    data: XOR<albumCreateInput, albumUncheckedCreateInput>
  }

  /**
   * album createMany
   */
  export type albumCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many albums.
     */
    data: albumCreateManyInput | albumCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * album createManyAndReturn
   */
  export type albumCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * The data used to create many albums.
     */
    data: albumCreateManyInput | albumCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * album update
   */
  export type albumUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * The data needed to update a album.
     */
    data: XOR<albumUpdateInput, albumUncheckedUpdateInput>
    /**
     * Choose, which album to update.
     */
    where: albumWhereUniqueInput
  }

  /**
   * album updateMany
   */
  export type albumUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update albums.
     */
    data: XOR<albumUpdateManyMutationInput, albumUncheckedUpdateManyInput>
    /**
     * Filter which albums to update
     */
    where?: albumWhereInput
    /**
     * Limit how many albums to update.
     */
    limit?: number
  }

  /**
   * album updateManyAndReturn
   */
  export type albumUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * The data used to update albums.
     */
    data: XOR<albumUpdateManyMutationInput, albumUncheckedUpdateManyInput>
    /**
     * Filter which albums to update
     */
    where?: albumWhereInput
    /**
     * Limit how many albums to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * album upsert
   */
  export type albumUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * The filter to search for the album to update in case it exists.
     */
    where: albumWhereUniqueInput
    /**
     * In case the album found by the `where` argument doesn't exist, create a new album with this data.
     */
    create: XOR<albumCreateInput, albumUncheckedCreateInput>
    /**
     * In case the album was found with the provided `where` argument, update it with this data.
     */
    update: XOR<albumUpdateInput, albumUncheckedUpdateInput>
  }

  /**
   * album delete
   */
  export type albumDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter which album to delete.
     */
    where: albumWhereUniqueInput
  }

  /**
   * album deleteMany
   */
  export type albumDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which albums to delete
     */
    where?: albumWhereInput
    /**
     * Limit how many albums to delete.
     */
    limit?: number
  }

  /**
   * album.track
   */
  export type album$trackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    where?: trackWhereInput
    orderBy?: trackOrderByWithRelationInput | trackOrderByWithRelationInput[]
    cursor?: trackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * album without action
   */
  export type albumDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
  }


  /**
   * Model artist
   */

  export type AggregateArtist = {
    _count: ArtistCountAggregateOutputType | null
    _avg: ArtistAvgAggregateOutputType | null
    _sum: ArtistSumAggregateOutputType | null
    _min: ArtistMinAggregateOutputType | null
    _max: ArtistMaxAggregateOutputType | null
  }

  export type ArtistAvgAggregateOutputType = {
    artist_id: number | null
  }

  export type ArtistSumAggregateOutputType = {
    artist_id: number | null
  }

  export type ArtistMinAggregateOutputType = {
    artist_id: number | null
    name: string | null
  }

  export type ArtistMaxAggregateOutputType = {
    artist_id: number | null
    name: string | null
  }

  export type ArtistCountAggregateOutputType = {
    artist_id: number
    name: number
    _all: number
  }


  export type ArtistAvgAggregateInputType = {
    artist_id?: true
  }

  export type ArtistSumAggregateInputType = {
    artist_id?: true
  }

  export type ArtistMinAggregateInputType = {
    artist_id?: true
    name?: true
  }

  export type ArtistMaxAggregateInputType = {
    artist_id?: true
    name?: true
  }

  export type ArtistCountAggregateInputType = {
    artist_id?: true
    name?: true
    _all?: true
  }

  export type ArtistAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which artist to aggregate.
     */
    where?: artistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of artists to fetch.
     */
    orderBy?: artistOrderByWithRelationInput | artistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: artistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned artists
    **/
    _count?: true | ArtistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtistMaxAggregateInputType
  }

  export type GetArtistAggregateType<T extends ArtistAggregateArgs> = {
        [P in keyof T & keyof AggregateArtist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtist[P]>
      : GetScalarType<T[P], AggregateArtist[P]>
  }




  export type artistGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: artistWhereInput
    orderBy?: artistOrderByWithAggregationInput | artistOrderByWithAggregationInput[]
    by: ArtistScalarFieldEnum[] | ArtistScalarFieldEnum
    having?: artistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtistCountAggregateInputType | true
    _avg?: ArtistAvgAggregateInputType
    _sum?: ArtistSumAggregateInputType
    _min?: ArtistMinAggregateInputType
    _max?: ArtistMaxAggregateInputType
  }

  export type ArtistGroupByOutputType = {
    artist_id: number
    name: string | null
    _count: ArtistCountAggregateOutputType | null
    _avg: ArtistAvgAggregateOutputType | null
    _sum: ArtistSumAggregateOutputType | null
    _min: ArtistMinAggregateOutputType | null
    _max: ArtistMaxAggregateOutputType | null
  }

  type GetArtistGroupByPayload<T extends artistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtistGroupByOutputType[P]>
            : GetScalarType<T[P], ArtistGroupByOutputType[P]>
        }
      >
    >


  export type artistSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    artist_id?: boolean
    name?: boolean
    album?: boolean | artist$albumArgs<ExtArgs>
    _count?: boolean | ArtistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artist"]>

  export type artistSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    artist_id?: boolean
    name?: boolean
  }, ExtArgs["result"]["artist"]>

  export type artistSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    artist_id?: boolean
    name?: boolean
  }, ExtArgs["result"]["artist"]>

  export type artistSelectScalar = {
    artist_id?: boolean
    name?: boolean
  }

  export type artistOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"artist_id" | "name", ExtArgs["result"]["artist"]>
  export type artistInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    album?: boolean | artist$albumArgs<ExtArgs>
    _count?: boolean | ArtistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type artistIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type artistIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $artistPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "artist"
    objects: {
      album: Prisma.$albumPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      artist_id: number
      name: string | null
    }, ExtArgs["result"]["artist"]>
    composites: {}
  }

  export type artistGetPayload<S extends boolean | null | undefined | artistDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$artistPayload, S>

  export type artistCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<artistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtistCountAggregateInputType | true
    }

  export interface artistDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['artist'], meta: { name: 'artist' } }
    /**
     * Find zero or one Artist that matches the filter.
     * @param {artistFindUniqueArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends artistFindUniqueArgs>(args: SelectSubset<T, artistFindUniqueArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Artist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {artistFindUniqueOrThrowArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends artistFindUniqueOrThrowArgs>(args: SelectSubset<T, artistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {artistFindFirstArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends artistFindFirstArgs>(args?: SelectSubset<T, artistFindFirstArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {artistFindFirstOrThrowArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends artistFindFirstOrThrowArgs>(args?: SelectSubset<T, artistFindFirstOrThrowArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Artists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {artistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Artists
     * const artists = await prisma.artist.findMany()
     * 
     * // Get first 10 Artists
     * const artists = await prisma.artist.findMany({ take: 10 })
     * 
     * // Only select the `artist_id`
     * const artistWithArtist_idOnly = await prisma.artist.findMany({ select: { artist_id: true } })
     * 
     */
    findMany<T extends artistFindManyArgs>(args?: SelectSubset<T, artistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Artist.
     * @param {artistCreateArgs} args - Arguments to create a Artist.
     * @example
     * // Create one Artist
     * const Artist = await prisma.artist.create({
     *   data: {
     *     // ... data to create a Artist
     *   }
     * })
     * 
     */
    create<T extends artistCreateArgs>(args: SelectSubset<T, artistCreateArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Artists.
     * @param {artistCreateManyArgs} args - Arguments to create many Artists.
     * @example
     * // Create many Artists
     * const artist = await prisma.artist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends artistCreateManyArgs>(args?: SelectSubset<T, artistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Artists and returns the data saved in the database.
     * @param {artistCreateManyAndReturnArgs} args - Arguments to create many Artists.
     * @example
     * // Create many Artists
     * const artist = await prisma.artist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Artists and only return the `artist_id`
     * const artistWithArtist_idOnly = await prisma.artist.createManyAndReturn({
     *   select: { artist_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends artistCreateManyAndReturnArgs>(args?: SelectSubset<T, artistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Artist.
     * @param {artistDeleteArgs} args - Arguments to delete one Artist.
     * @example
     * // Delete one Artist
     * const Artist = await prisma.artist.delete({
     *   where: {
     *     // ... filter to delete one Artist
     *   }
     * })
     * 
     */
    delete<T extends artistDeleteArgs>(args: SelectSubset<T, artistDeleteArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Artist.
     * @param {artistUpdateArgs} args - Arguments to update one Artist.
     * @example
     * // Update one Artist
     * const artist = await prisma.artist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends artistUpdateArgs>(args: SelectSubset<T, artistUpdateArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Artists.
     * @param {artistDeleteManyArgs} args - Arguments to filter Artists to delete.
     * @example
     * // Delete a few Artists
     * const { count } = await prisma.artist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends artistDeleteManyArgs>(args?: SelectSubset<T, artistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {artistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Artists
     * const artist = await prisma.artist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends artistUpdateManyArgs>(args: SelectSubset<T, artistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artists and returns the data updated in the database.
     * @param {artistUpdateManyAndReturnArgs} args - Arguments to update many Artists.
     * @example
     * // Update many Artists
     * const artist = await prisma.artist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Artists and only return the `artist_id`
     * const artistWithArtist_idOnly = await prisma.artist.updateManyAndReturn({
     *   select: { artist_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends artistUpdateManyAndReturnArgs>(args: SelectSubset<T, artistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Artist.
     * @param {artistUpsertArgs} args - Arguments to update or create a Artist.
     * @example
     * // Update or create a Artist
     * const artist = await prisma.artist.upsert({
     *   create: {
     *     // ... data to create a Artist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Artist we want to update
     *   }
     * })
     */
    upsert<T extends artistUpsertArgs>(args: SelectSubset<T, artistUpsertArgs<ExtArgs>>): Prisma__artistClient<runtime.Types.Result.GetResult<Prisma.$artistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Artists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {artistCountArgs} args - Arguments to filter Artists to count.
     * @example
     * // Count the number of Artists
     * const count = await prisma.artist.count({
     *   where: {
     *     // ... the filter for the Artists we want to count
     *   }
     * })
    **/
    count<T extends artistCountArgs>(
      args?: Subset<T, artistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Artist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtistAggregateArgs>(args: Subset<T, ArtistAggregateArgs>): Prisma.PrismaPromise<GetArtistAggregateType<T>>

    /**
     * Group by Artist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {artistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends artistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: artistGroupByArgs['orderBy'] }
        : { orderBy?: artistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, artistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the artist model
   */
  readonly fields: artistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for artist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__artistClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    album<T extends artist$albumArgs<ExtArgs> = {}>(args?: Subset<T, artist$albumArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the artist model
   */
  export interface artistFieldRefs {
    readonly artist_id: FieldRef<"artist", 'Int'>
    readonly name: FieldRef<"artist", 'String'>
  }
    

  // Custom InputTypes
  /**
   * artist findUnique
   */
  export type artistFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * Filter, which artist to fetch.
     */
    where: artistWhereUniqueInput
  }

  /**
   * artist findUniqueOrThrow
   */
  export type artistFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * Filter, which artist to fetch.
     */
    where: artistWhereUniqueInput
  }

  /**
   * artist findFirst
   */
  export type artistFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * Filter, which artist to fetch.
     */
    where?: artistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of artists to fetch.
     */
    orderBy?: artistOrderByWithRelationInput | artistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for artists.
     */
    cursor?: artistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of artists.
     */
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * artist findFirstOrThrow
   */
  export type artistFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * Filter, which artist to fetch.
     */
    where?: artistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of artists to fetch.
     */
    orderBy?: artistOrderByWithRelationInput | artistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for artists.
     */
    cursor?: artistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of artists.
     */
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * artist findMany
   */
  export type artistFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * Filter, which artists to fetch.
     */
    where?: artistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of artists to fetch.
     */
    orderBy?: artistOrderByWithRelationInput | artistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing artists.
     */
    cursor?: artistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` artists.
     */
    skip?: number
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * artist create
   */
  export type artistCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * The data needed to create a artist.
     */
    data: XOR<artistCreateInput, artistUncheckedCreateInput>
  }

  /**
   * artist createMany
   */
  export type artistCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many artists.
     */
    data: artistCreateManyInput | artistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * artist createManyAndReturn
   */
  export type artistCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * The data used to create many artists.
     */
    data: artistCreateManyInput | artistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * artist update
   */
  export type artistUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * The data needed to update a artist.
     */
    data: XOR<artistUpdateInput, artistUncheckedUpdateInput>
    /**
     * Choose, which artist to update.
     */
    where: artistWhereUniqueInput
  }

  /**
   * artist updateMany
   */
  export type artistUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update artists.
     */
    data: XOR<artistUpdateManyMutationInput, artistUncheckedUpdateManyInput>
    /**
     * Filter which artists to update
     */
    where?: artistWhereInput
    /**
     * Limit how many artists to update.
     */
    limit?: number
  }

  /**
   * artist updateManyAndReturn
   */
  export type artistUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * The data used to update artists.
     */
    data: XOR<artistUpdateManyMutationInput, artistUncheckedUpdateManyInput>
    /**
     * Filter which artists to update
     */
    where?: artistWhereInput
    /**
     * Limit how many artists to update.
     */
    limit?: number
  }

  /**
   * artist upsert
   */
  export type artistUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * The filter to search for the artist to update in case it exists.
     */
    where: artistWhereUniqueInput
    /**
     * In case the artist found by the `where` argument doesn't exist, create a new artist with this data.
     */
    create: XOR<artistCreateInput, artistUncheckedCreateInput>
    /**
     * In case the artist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<artistUpdateInput, artistUncheckedUpdateInput>
  }

  /**
   * artist delete
   */
  export type artistDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
    /**
     * Filter which artist to delete.
     */
    where: artistWhereUniqueInput
  }

  /**
   * artist deleteMany
   */
  export type artistDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which artists to delete
     */
    where?: artistWhereInput
    /**
     * Limit how many artists to delete.
     */
    limit?: number
  }

  /**
   * artist.album
   */
  export type artist$albumArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    where?: albumWhereInput
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    cursor?: albumWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * artist without action
   */
  export type artistDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the artist
     */
    select?: artistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the artist
     */
    omit?: artistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: artistInclude<ExtArgs> | null
  }


  /**
   * Model customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    customer_id: number | null
    support_rep_id: number | null
  }

  export type CustomerSumAggregateOutputType = {
    customer_id: number | null
    support_rep_id: number | null
  }

  export type CustomerMinAggregateOutputType = {
    customer_id: number | null
    first_name: string | null
    last_name: string | null
    company: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postal_code: string | null
    phone: string | null
    fax: string | null
    email: string | null
    support_rep_id: number | null
  }

  export type CustomerMaxAggregateOutputType = {
    customer_id: number | null
    first_name: string | null
    last_name: string | null
    company: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postal_code: string | null
    phone: string | null
    fax: string | null
    email: string | null
    support_rep_id: number | null
  }

  export type CustomerCountAggregateOutputType = {
    customer_id: number
    first_name: number
    last_name: number
    company: number
    address: number
    city: number
    state: number
    country: number
    postal_code: number
    phone: number
    fax: number
    email: number
    support_rep_id: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    customer_id?: true
    support_rep_id?: true
  }

  export type CustomerSumAggregateInputType = {
    customer_id?: true
    support_rep_id?: true
  }

  export type CustomerMinAggregateInputType = {
    customer_id?: true
    first_name?: true
    last_name?: true
    company?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postal_code?: true
    phone?: true
    fax?: true
    email?: true
    support_rep_id?: true
  }

  export type CustomerMaxAggregateInputType = {
    customer_id?: true
    first_name?: true
    last_name?: true
    company?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postal_code?: true
    phone?: true
    fax?: true
    email?: true
    support_rep_id?: true
  }

  export type CustomerCountAggregateInputType = {
    customer_id?: true
    first_name?: true
    last_name?: true
    company?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postal_code?: true
    phone?: true
    fax?: true
    email?: true
    support_rep_id?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which customer to aggregate.
     */
    where?: customerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of customers to fetch.
     */
    orderBy?: customerOrderByWithRelationInput | customerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: customerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type customerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: customerWhereInput
    orderBy?: customerOrderByWithAggregationInput | customerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: customerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    customer_id: number
    first_name: string
    last_name: string
    company: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postal_code: string | null
    phone: string | null
    fax: string | null
    email: string
    support_rep_id: number | null
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends customerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type customerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    customer_id?: boolean
    first_name?: boolean
    last_name?: boolean
    company?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postal_code?: boolean
    phone?: boolean
    fax?: boolean
    email?: boolean
    support_rep_id?: boolean
    employee?: boolean | customer$employeeArgs<ExtArgs>
    invoice?: boolean | customer$invoiceArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type customerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    customer_id?: boolean
    first_name?: boolean
    last_name?: boolean
    company?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postal_code?: boolean
    phone?: boolean
    fax?: boolean
    email?: boolean
    support_rep_id?: boolean
    employee?: boolean | customer$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type customerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    customer_id?: boolean
    first_name?: boolean
    last_name?: boolean
    company?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postal_code?: boolean
    phone?: boolean
    fax?: boolean
    email?: boolean
    support_rep_id?: boolean
    employee?: boolean | customer$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type customerSelectScalar = {
    customer_id?: boolean
    first_name?: boolean
    last_name?: boolean
    company?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postal_code?: boolean
    phone?: boolean
    fax?: boolean
    email?: boolean
    support_rep_id?: boolean
  }

  export type customerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"customer_id" | "first_name" | "last_name" | "company" | "address" | "city" | "state" | "country" | "postal_code" | "phone" | "fax" | "email" | "support_rep_id", ExtArgs["result"]["customer"]>
  export type customerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    employee?: boolean | customer$employeeArgs<ExtArgs>
    invoice?: boolean | customer$invoiceArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type customerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    employee?: boolean | customer$employeeArgs<ExtArgs>
  }
  export type customerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    employee?: boolean | customer$employeeArgs<ExtArgs>
  }

  export type $customerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "customer"
    objects: {
      employee: Prisma.$employeePayload<ExtArgs> | null
      invoice: Prisma.$invoicePayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      customer_id: number
      first_name: string
      last_name: string
      company: string | null
      address: string | null
      city: string | null
      state: string | null
      country: string | null
      postal_code: string | null
      phone: string | null
      fax: string | null
      email: string
      support_rep_id: number | null
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  export type customerGetPayload<S extends boolean | null | undefined | customerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$customerPayload, S>

  export type customerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<customerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface customerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['customer'], meta: { name: 'customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {customerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends customerFindUniqueArgs>(args: SelectSubset<T, customerFindUniqueArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {customerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends customerFindUniqueOrThrowArgs>(args: SelectSubset<T, customerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends customerFindFirstArgs>(args?: SelectSubset<T, customerFindFirstArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends customerFindFirstOrThrowArgs>(args?: SelectSubset<T, customerFindFirstOrThrowArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `customer_id`
     * const customerWithCustomer_idOnly = await prisma.customer.findMany({ select: { customer_id: true } })
     * 
     */
    findMany<T extends customerFindManyArgs>(args?: SelectSubset<T, customerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {customerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends customerCreateArgs>(args: SelectSubset<T, customerCreateArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {customerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends customerCreateManyArgs>(args?: SelectSubset<T, customerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {customerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `customer_id`
     * const customerWithCustomer_idOnly = await prisma.customer.createManyAndReturn({
     *   select: { customer_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends customerCreateManyAndReturnArgs>(args?: SelectSubset<T, customerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {customerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends customerDeleteArgs>(args: SelectSubset<T, customerDeleteArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {customerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends customerUpdateArgs>(args: SelectSubset<T, customerUpdateArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {customerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends customerDeleteManyArgs>(args?: SelectSubset<T, customerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends customerUpdateManyArgs>(args: SelectSubset<T, customerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {customerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `customer_id`
     * const customerWithCustomer_idOnly = await prisma.customer.updateManyAndReturn({
     *   select: { customer_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends customerUpdateManyAndReturnArgs>(args: SelectSubset<T, customerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {customerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends customerUpsertArgs>(args: SelectSubset<T, customerUpsertArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends customerCountArgs>(
      args?: Subset<T, customerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends customerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: customerGroupByArgs['orderBy'] }
        : { orderBy?: customerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, customerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the customer model
   */
  readonly fields: customerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__customerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends customer$employeeArgs<ExtArgs> = {}>(args?: Subset<T, customer$employeeArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    invoice<T extends customer$invoiceArgs<ExtArgs> = {}>(args?: Subset<T, customer$invoiceArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the customer model
   */
  export interface customerFieldRefs {
    readonly customer_id: FieldRef<"customer", 'Int'>
    readonly first_name: FieldRef<"customer", 'String'>
    readonly last_name: FieldRef<"customer", 'String'>
    readonly company: FieldRef<"customer", 'String'>
    readonly address: FieldRef<"customer", 'String'>
    readonly city: FieldRef<"customer", 'String'>
    readonly state: FieldRef<"customer", 'String'>
    readonly country: FieldRef<"customer", 'String'>
    readonly postal_code: FieldRef<"customer", 'String'>
    readonly phone: FieldRef<"customer", 'String'>
    readonly fax: FieldRef<"customer", 'String'>
    readonly email: FieldRef<"customer", 'String'>
    readonly support_rep_id: FieldRef<"customer", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * customer findUnique
   */
  export type customerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * Filter, which customer to fetch.
     */
    where: customerWhereUniqueInput
  }

  /**
   * customer findUniqueOrThrow
   */
  export type customerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * Filter, which customer to fetch.
     */
    where: customerWhereUniqueInput
  }

  /**
   * customer findFirst
   */
  export type customerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * Filter, which customer to fetch.
     */
    where?: customerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of customers to fetch.
     */
    orderBy?: customerOrderByWithRelationInput | customerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for customers.
     */
    cursor?: customerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * customer findFirstOrThrow
   */
  export type customerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * Filter, which customer to fetch.
     */
    where?: customerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of customers to fetch.
     */
    orderBy?: customerOrderByWithRelationInput | customerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for customers.
     */
    cursor?: customerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * customer findMany
   */
  export type customerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * Filter, which customers to fetch.
     */
    where?: customerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of customers to fetch.
     */
    orderBy?: customerOrderByWithRelationInput | customerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing customers.
     */
    cursor?: customerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * customer create
   */
  export type customerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * The data needed to create a customer.
     */
    data: XOR<customerCreateInput, customerUncheckedCreateInput>
  }

  /**
   * customer createMany
   */
  export type customerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many customers.
     */
    data: customerCreateManyInput | customerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * customer createManyAndReturn
   */
  export type customerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * The data used to create many customers.
     */
    data: customerCreateManyInput | customerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * customer update
   */
  export type customerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * The data needed to update a customer.
     */
    data: XOR<customerUpdateInput, customerUncheckedUpdateInput>
    /**
     * Choose, which customer to update.
     */
    where: customerWhereUniqueInput
  }

  /**
   * customer updateMany
   */
  export type customerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update customers.
     */
    data: XOR<customerUpdateManyMutationInput, customerUncheckedUpdateManyInput>
    /**
     * Filter which customers to update
     */
    where?: customerWhereInput
    /**
     * Limit how many customers to update.
     */
    limit?: number
  }

  /**
   * customer updateManyAndReturn
   */
  export type customerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * The data used to update customers.
     */
    data: XOR<customerUpdateManyMutationInput, customerUncheckedUpdateManyInput>
    /**
     * Filter which customers to update
     */
    where?: customerWhereInput
    /**
     * Limit how many customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * customer upsert
   */
  export type customerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * The filter to search for the customer to update in case it exists.
     */
    where: customerWhereUniqueInput
    /**
     * In case the customer found by the `where` argument doesn't exist, create a new customer with this data.
     */
    create: XOR<customerCreateInput, customerUncheckedCreateInput>
    /**
     * In case the customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<customerUpdateInput, customerUncheckedUpdateInput>
  }

  /**
   * customer delete
   */
  export type customerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    /**
     * Filter which customer to delete.
     */
    where: customerWhereUniqueInput
  }

  /**
   * customer deleteMany
   */
  export type customerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which customers to delete
     */
    where?: customerWhereInput
    /**
     * Limit how many customers to delete.
     */
    limit?: number
  }

  /**
   * customer.employee
   */
  export type customer$employeeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    where?: employeeWhereInput
  }

  /**
   * customer.invoice
   */
  export type customer$invoiceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    where?: invoiceWhereInput
    orderBy?: invoiceOrderByWithRelationInput | invoiceOrderByWithRelationInput[]
    cursor?: invoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * customer without action
   */
  export type customerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
  }


  /**
   * Model employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeAvgAggregateOutputType = {
    employee_id: number | null
    reports_to: number | null
  }

  export type EmployeeSumAggregateOutputType = {
    employee_id: number | null
    reports_to: number | null
  }

  export type EmployeeMinAggregateOutputType = {
    employee_id: number | null
    last_name: string | null
    first_name: string | null
    title: string | null
    reports_to: number | null
    birth_date: Date | null
    hire_date: Date | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postal_code: string | null
    phone: string | null
    fax: string | null
    email: string | null
  }

  export type EmployeeMaxAggregateOutputType = {
    employee_id: number | null
    last_name: string | null
    first_name: string | null
    title: string | null
    reports_to: number | null
    birth_date: Date | null
    hire_date: Date | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postal_code: string | null
    phone: string | null
    fax: string | null
    email: string | null
  }

  export type EmployeeCountAggregateOutputType = {
    employee_id: number
    last_name: number
    first_name: number
    title: number
    reports_to: number
    birth_date: number
    hire_date: number
    address: number
    city: number
    state: number
    country: number
    postal_code: number
    phone: number
    fax: number
    email: number
    _all: number
  }


  export type EmployeeAvgAggregateInputType = {
    employee_id?: true
    reports_to?: true
  }

  export type EmployeeSumAggregateInputType = {
    employee_id?: true
    reports_to?: true
  }

  export type EmployeeMinAggregateInputType = {
    employee_id?: true
    last_name?: true
    first_name?: true
    title?: true
    reports_to?: true
    birth_date?: true
    hire_date?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postal_code?: true
    phone?: true
    fax?: true
    email?: true
  }

  export type EmployeeMaxAggregateInputType = {
    employee_id?: true
    last_name?: true
    first_name?: true
    title?: true
    reports_to?: true
    birth_date?: true
    hire_date?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postal_code?: true
    phone?: true
    fax?: true
    email?: true
  }

  export type EmployeeCountAggregateInputType = {
    employee_id?: true
    last_name?: true
    first_name?: true
    title?: true
    reports_to?: true
    birth_date?: true
    hire_date?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postal_code?: true
    phone?: true
    fax?: true
    email?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which employee to aggregate.
     */
    where?: employeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: employeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type employeeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: employeeWhereInput
    orderBy?: employeeOrderByWithAggregationInput | employeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: employeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _avg?: EmployeeAvgAggregateInputType
    _sum?: EmployeeSumAggregateInputType
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    employee_id: number
    last_name: string
    first_name: string
    title: string | null
    reports_to: number | null
    birth_date: Date | null
    hire_date: Date | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postal_code: string | null
    phone: string | null
    fax: string | null
    email: string | null
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends employeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type employeeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    employee_id?: boolean
    last_name?: boolean
    first_name?: boolean
    title?: boolean
    reports_to?: boolean
    birth_date?: boolean
    hire_date?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postal_code?: boolean
    phone?: boolean
    fax?: boolean
    email?: boolean
    customer?: boolean | employee$customerArgs<ExtArgs>
    employee?: boolean | employee$employeeArgs<ExtArgs>
    other_employee?: boolean | employee$other_employeeArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type employeeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    employee_id?: boolean
    last_name?: boolean
    first_name?: boolean
    title?: boolean
    reports_to?: boolean
    birth_date?: boolean
    hire_date?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postal_code?: boolean
    phone?: boolean
    fax?: boolean
    email?: boolean
    employee?: boolean | employee$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type employeeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    employee_id?: boolean
    last_name?: boolean
    first_name?: boolean
    title?: boolean
    reports_to?: boolean
    birth_date?: boolean
    hire_date?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postal_code?: boolean
    phone?: boolean
    fax?: boolean
    email?: boolean
    employee?: boolean | employee$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type employeeSelectScalar = {
    employee_id?: boolean
    last_name?: boolean
    first_name?: boolean
    title?: boolean
    reports_to?: boolean
    birth_date?: boolean
    hire_date?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postal_code?: boolean
    phone?: boolean
    fax?: boolean
    email?: boolean
  }

  export type employeeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"employee_id" | "last_name" | "first_name" | "title" | "reports_to" | "birth_date" | "hire_date" | "address" | "city" | "state" | "country" | "postal_code" | "phone" | "fax" | "email", ExtArgs["result"]["employee"]>
  export type employeeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | employee$customerArgs<ExtArgs>
    employee?: boolean | employee$employeeArgs<ExtArgs>
    other_employee?: boolean | employee$other_employeeArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type employeeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    employee?: boolean | employee$employeeArgs<ExtArgs>
  }
  export type employeeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    employee?: boolean | employee$employeeArgs<ExtArgs>
  }

  export type $employeePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "employee"
    objects: {
      customer: Prisma.$customerPayload<ExtArgs>[]
      employee: Prisma.$employeePayload<ExtArgs> | null
      other_employee: Prisma.$employeePayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      employee_id: number
      last_name: string
      first_name: string
      title: string | null
      reports_to: number | null
      birth_date: Date | null
      hire_date: Date | null
      address: string | null
      city: string | null
      state: string | null
      country: string | null
      postal_code: string | null
      phone: string | null
      fax: string | null
      email: string | null
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  export type employeeGetPayload<S extends boolean | null | undefined | employeeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$employeePayload, S>

  export type employeeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<employeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface employeeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['employee'], meta: { name: 'employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {employeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends employeeFindUniqueArgs>(args: SelectSubset<T, employeeFindUniqueArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {employeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends employeeFindUniqueOrThrowArgs>(args: SelectSubset<T, employeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends employeeFindFirstArgs>(args?: SelectSubset<T, employeeFindFirstArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends employeeFindFirstOrThrowArgs>(args?: SelectSubset<T, employeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `employee_id`
     * const employeeWithEmployee_idOnly = await prisma.employee.findMany({ select: { employee_id: true } })
     * 
     */
    findMany<T extends employeeFindManyArgs>(args?: SelectSubset<T, employeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {employeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends employeeCreateArgs>(args: SelectSubset<T, employeeCreateArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {employeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends employeeCreateManyArgs>(args?: SelectSubset<T, employeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {employeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `employee_id`
     * const employeeWithEmployee_idOnly = await prisma.employee.createManyAndReturn({
     *   select: { employee_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends employeeCreateManyAndReturnArgs>(args?: SelectSubset<T, employeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {employeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends employeeDeleteArgs>(args: SelectSubset<T, employeeDeleteArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {employeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends employeeUpdateArgs>(args: SelectSubset<T, employeeUpdateArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {employeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends employeeDeleteManyArgs>(args?: SelectSubset<T, employeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends employeeUpdateManyArgs>(args: SelectSubset<T, employeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {employeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `employee_id`
     * const employeeWithEmployee_idOnly = await prisma.employee.updateManyAndReturn({
     *   select: { employee_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends employeeUpdateManyAndReturnArgs>(args: SelectSubset<T, employeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {employeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends employeeUpsertArgs>(args: SelectSubset<T, employeeUpsertArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends employeeCountArgs>(
      args?: Subset<T, employeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends employeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: employeeGroupByArgs['orderBy'] }
        : { orderBy?: employeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, employeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the employee model
   */
  readonly fields: employeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__employeeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends employee$customerArgs<ExtArgs> = {}>(args?: Subset<T, employee$customerArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    employee<T extends employee$employeeArgs<ExtArgs> = {}>(args?: Subset<T, employee$employeeArgs<ExtArgs>>): Prisma__employeeClient<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    other_employee<T extends employee$other_employeeArgs<ExtArgs> = {}>(args?: Subset<T, employee$other_employeeArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the employee model
   */
  export interface employeeFieldRefs {
    readonly employee_id: FieldRef<"employee", 'Int'>
    readonly last_name: FieldRef<"employee", 'String'>
    readonly first_name: FieldRef<"employee", 'String'>
    readonly title: FieldRef<"employee", 'String'>
    readonly reports_to: FieldRef<"employee", 'Int'>
    readonly birth_date: FieldRef<"employee", 'DateTime'>
    readonly hire_date: FieldRef<"employee", 'DateTime'>
    readonly address: FieldRef<"employee", 'String'>
    readonly city: FieldRef<"employee", 'String'>
    readonly state: FieldRef<"employee", 'String'>
    readonly country: FieldRef<"employee", 'String'>
    readonly postal_code: FieldRef<"employee", 'String'>
    readonly phone: FieldRef<"employee", 'String'>
    readonly fax: FieldRef<"employee", 'String'>
    readonly email: FieldRef<"employee", 'String'>
  }
    

  // Custom InputTypes
  /**
   * employee findUnique
   */
  export type employeeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employee to fetch.
     */
    where: employeeWhereUniqueInput
  }

  /**
   * employee findUniqueOrThrow
   */
  export type employeeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employee to fetch.
     */
    where: employeeWhereUniqueInput
  }

  /**
   * employee findFirst
   */
  export type employeeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employee to fetch.
     */
    where?: employeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * employee findFirstOrThrow
   */
  export type employeeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employee to fetch.
     */
    where?: employeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * employee findMany
   */
  export type employeeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing employees.
     */
    cursor?: employeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * employee create
   */
  export type employeeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * The data needed to create a employee.
     */
    data: XOR<employeeCreateInput, employeeUncheckedCreateInput>
  }

  /**
   * employee createMany
   */
  export type employeeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many employees.
     */
    data: employeeCreateManyInput | employeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * employee createManyAndReturn
   */
  export type employeeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * The data used to create many employees.
     */
    data: employeeCreateManyInput | employeeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * employee update
   */
  export type employeeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * The data needed to update a employee.
     */
    data: XOR<employeeUpdateInput, employeeUncheckedUpdateInput>
    /**
     * Choose, which employee to update.
     */
    where: employeeWhereUniqueInput
  }

  /**
   * employee updateMany
   */
  export type employeeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update employees.
     */
    data: XOR<employeeUpdateManyMutationInput, employeeUncheckedUpdateManyInput>
    /**
     * Filter which employees to update
     */
    where?: employeeWhereInput
    /**
     * Limit how many employees to update.
     */
    limit?: number
  }

  /**
   * employee updateManyAndReturn
   */
  export type employeeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * The data used to update employees.
     */
    data: XOR<employeeUpdateManyMutationInput, employeeUncheckedUpdateManyInput>
    /**
     * Filter which employees to update
     */
    where?: employeeWhereInput
    /**
     * Limit how many employees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * employee upsert
   */
  export type employeeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * The filter to search for the employee to update in case it exists.
     */
    where: employeeWhereUniqueInput
    /**
     * In case the employee found by the `where` argument doesn't exist, create a new employee with this data.
     */
    create: XOR<employeeCreateInput, employeeUncheckedCreateInput>
    /**
     * In case the employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<employeeUpdateInput, employeeUncheckedUpdateInput>
  }

  /**
   * employee delete
   */
  export type employeeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter which employee to delete.
     */
    where: employeeWhereUniqueInput
  }

  /**
   * employee deleteMany
   */
  export type employeeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which employees to delete
     */
    where?: employeeWhereInput
    /**
     * Limit how many employees to delete.
     */
    limit?: number
  }

  /**
   * employee.customer
   */
  export type employee$customerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer
     */
    select?: customerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer
     */
    omit?: customerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: customerInclude<ExtArgs> | null
    where?: customerWhereInput
    orderBy?: customerOrderByWithRelationInput | customerOrderByWithRelationInput[]
    cursor?: customerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * employee.employee
   */
  export type employee$employeeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    where?: employeeWhereInput
  }

  /**
   * employee.other_employee
   */
  export type employee$other_employeeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    where?: employeeWhereInput
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    cursor?: employeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * employee without action
   */
  export type employeeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
  }


  /**
   * Model genre
   */

  export type AggregateGenre = {
    _count: GenreCountAggregateOutputType | null
    _avg: GenreAvgAggregateOutputType | null
    _sum: GenreSumAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  export type GenreAvgAggregateOutputType = {
    genre_id: number | null
  }

  export type GenreSumAggregateOutputType = {
    genre_id: number | null
  }

  export type GenreMinAggregateOutputType = {
    genre_id: number | null
    name: string | null
  }

  export type GenreMaxAggregateOutputType = {
    genre_id: number | null
    name: string | null
  }

  export type GenreCountAggregateOutputType = {
    genre_id: number
    name: number
    _all: number
  }


  export type GenreAvgAggregateInputType = {
    genre_id?: true
  }

  export type GenreSumAggregateInputType = {
    genre_id?: true
  }

  export type GenreMinAggregateInputType = {
    genre_id?: true
    name?: true
  }

  export type GenreMaxAggregateInputType = {
    genre_id?: true
    name?: true
  }

  export type GenreCountAggregateInputType = {
    genre_id?: true
    name?: true
    _all?: true
  }

  export type GenreAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which genre to aggregate.
     */
    where?: genreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of genres to fetch.
     */
    orderBy?: genreOrderByWithRelationInput | genreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: genreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned genres
    **/
    _count?: true | GenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GenreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GenreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GenreMaxAggregateInputType
  }

  export type GetGenreAggregateType<T extends GenreAggregateArgs> = {
        [P in keyof T & keyof AggregateGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGenre[P]>
      : GetScalarType<T[P], AggregateGenre[P]>
  }




  export type genreGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: genreWhereInput
    orderBy?: genreOrderByWithAggregationInput | genreOrderByWithAggregationInput[]
    by: GenreScalarFieldEnum[] | GenreScalarFieldEnum
    having?: genreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GenreCountAggregateInputType | true
    _avg?: GenreAvgAggregateInputType
    _sum?: GenreSumAggregateInputType
    _min?: GenreMinAggregateInputType
    _max?: GenreMaxAggregateInputType
  }

  export type GenreGroupByOutputType = {
    genre_id: number
    name: string | null
    _count: GenreCountAggregateOutputType | null
    _avg: GenreAvgAggregateOutputType | null
    _sum: GenreSumAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  type GetGenreGroupByPayload<T extends genreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GenreGroupByOutputType[P]>
            : GetScalarType<T[P], GenreGroupByOutputType[P]>
        }
      >
    >


  export type genreSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    genre_id?: boolean
    name?: boolean
    track?: boolean | genre$trackArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["genre"]>

  export type genreSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    genre_id?: boolean
    name?: boolean
  }, ExtArgs["result"]["genre"]>

  export type genreSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    genre_id?: boolean
    name?: boolean
  }, ExtArgs["result"]["genre"]>

  export type genreSelectScalar = {
    genre_id?: boolean
    name?: boolean
  }

  export type genreOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"genre_id" | "name", ExtArgs["result"]["genre"]>
  export type genreInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    track?: boolean | genre$trackArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type genreIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type genreIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $genrePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "genre"
    objects: {
      track: Prisma.$trackPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      genre_id: number
      name: string | null
    }, ExtArgs["result"]["genre"]>
    composites: {}
  }

  export type genreGetPayload<S extends boolean | null | undefined | genreDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$genrePayload, S>

  export type genreCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<genreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GenreCountAggregateInputType | true
    }

  export interface genreDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['genre'], meta: { name: 'genre' } }
    /**
     * Find zero or one Genre that matches the filter.
     * @param {genreFindUniqueArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends genreFindUniqueArgs>(args: SelectSubset<T, genreFindUniqueArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Genre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {genreFindUniqueOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends genreFindUniqueOrThrowArgs>(args: SelectSubset<T, genreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {genreFindFirstArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends genreFindFirstArgs>(args?: SelectSubset<T, genreFindFirstArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {genreFindFirstOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends genreFindFirstOrThrowArgs>(args?: SelectSubset<T, genreFindFirstOrThrowArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Genres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {genreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Genres
     * const genres = await prisma.genre.findMany()
     * 
     * // Get first 10 Genres
     * const genres = await prisma.genre.findMany({ take: 10 })
     * 
     * // Only select the `genre_id`
     * const genreWithGenre_idOnly = await prisma.genre.findMany({ select: { genre_id: true } })
     * 
     */
    findMany<T extends genreFindManyArgs>(args?: SelectSubset<T, genreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Genre.
     * @param {genreCreateArgs} args - Arguments to create a Genre.
     * @example
     * // Create one Genre
     * const Genre = await prisma.genre.create({
     *   data: {
     *     // ... data to create a Genre
     *   }
     * })
     * 
     */
    create<T extends genreCreateArgs>(args: SelectSubset<T, genreCreateArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Genres.
     * @param {genreCreateManyArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends genreCreateManyArgs>(args?: SelectSubset<T, genreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Genres and returns the data saved in the database.
     * @param {genreCreateManyAndReturnArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Genres and only return the `genre_id`
     * const genreWithGenre_idOnly = await prisma.genre.createManyAndReturn({
     *   select: { genre_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends genreCreateManyAndReturnArgs>(args?: SelectSubset<T, genreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Genre.
     * @param {genreDeleteArgs} args - Arguments to delete one Genre.
     * @example
     * // Delete one Genre
     * const Genre = await prisma.genre.delete({
     *   where: {
     *     // ... filter to delete one Genre
     *   }
     * })
     * 
     */
    delete<T extends genreDeleteArgs>(args: SelectSubset<T, genreDeleteArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Genre.
     * @param {genreUpdateArgs} args - Arguments to update one Genre.
     * @example
     * // Update one Genre
     * const genre = await prisma.genre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends genreUpdateArgs>(args: SelectSubset<T, genreUpdateArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Genres.
     * @param {genreDeleteManyArgs} args - Arguments to filter Genres to delete.
     * @example
     * // Delete a few Genres
     * const { count } = await prisma.genre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends genreDeleteManyArgs>(args?: SelectSubset<T, genreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {genreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends genreUpdateManyArgs>(args: SelectSubset<T, genreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres and returns the data updated in the database.
     * @param {genreUpdateManyAndReturnArgs} args - Arguments to update many Genres.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Genres and only return the `genre_id`
     * const genreWithGenre_idOnly = await prisma.genre.updateManyAndReturn({
     *   select: { genre_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends genreUpdateManyAndReturnArgs>(args: SelectSubset<T, genreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Genre.
     * @param {genreUpsertArgs} args - Arguments to update or create a Genre.
     * @example
     * // Update or create a Genre
     * const genre = await prisma.genre.upsert({
     *   create: {
     *     // ... data to create a Genre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Genre we want to update
     *   }
     * })
     */
    upsert<T extends genreUpsertArgs>(args: SelectSubset<T, genreUpsertArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {genreCountArgs} args - Arguments to filter Genres to count.
     * @example
     * // Count the number of Genres
     * const count = await prisma.genre.count({
     *   where: {
     *     // ... the filter for the Genres we want to count
     *   }
     * })
    **/
    count<T extends genreCountArgs>(
      args?: Subset<T, genreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GenreAggregateArgs>(args: Subset<T, GenreAggregateArgs>): Prisma.PrismaPromise<GetGenreAggregateType<T>>

    /**
     * Group by Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {genreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends genreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: genreGroupByArgs['orderBy'] }
        : { orderBy?: genreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, genreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the genre model
   */
  readonly fields: genreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for genre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__genreClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    track<T extends genre$trackArgs<ExtArgs> = {}>(args?: Subset<T, genre$trackArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the genre model
   */
  export interface genreFieldRefs {
    readonly genre_id: FieldRef<"genre", 'Int'>
    readonly name: FieldRef<"genre", 'String'>
  }
    

  // Custom InputTypes
  /**
   * genre findUnique
   */
  export type genreFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * Filter, which genre to fetch.
     */
    where: genreWhereUniqueInput
  }

  /**
   * genre findUniqueOrThrow
   */
  export type genreFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * Filter, which genre to fetch.
     */
    where: genreWhereUniqueInput
  }

  /**
   * genre findFirst
   */
  export type genreFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * Filter, which genre to fetch.
     */
    where?: genreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of genres to fetch.
     */
    orderBy?: genreOrderByWithRelationInput | genreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for genres.
     */
    cursor?: genreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * genre findFirstOrThrow
   */
  export type genreFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * Filter, which genre to fetch.
     */
    where?: genreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of genres to fetch.
     */
    orderBy?: genreOrderByWithRelationInput | genreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for genres.
     */
    cursor?: genreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * genre findMany
   */
  export type genreFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * Filter, which genres to fetch.
     */
    where?: genreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of genres to fetch.
     */
    orderBy?: genreOrderByWithRelationInput | genreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing genres.
     */
    cursor?: genreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` genres.
     */
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * genre create
   */
  export type genreCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * The data needed to create a genre.
     */
    data: XOR<genreCreateInput, genreUncheckedCreateInput>
  }

  /**
   * genre createMany
   */
  export type genreCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many genres.
     */
    data: genreCreateManyInput | genreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * genre createManyAndReturn
   */
  export type genreCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * The data used to create many genres.
     */
    data: genreCreateManyInput | genreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * genre update
   */
  export type genreUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * The data needed to update a genre.
     */
    data: XOR<genreUpdateInput, genreUncheckedUpdateInput>
    /**
     * Choose, which genre to update.
     */
    where: genreWhereUniqueInput
  }

  /**
   * genre updateMany
   */
  export type genreUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update genres.
     */
    data: XOR<genreUpdateManyMutationInput, genreUncheckedUpdateManyInput>
    /**
     * Filter which genres to update
     */
    where?: genreWhereInput
    /**
     * Limit how many genres to update.
     */
    limit?: number
  }

  /**
   * genre updateManyAndReturn
   */
  export type genreUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * The data used to update genres.
     */
    data: XOR<genreUpdateManyMutationInput, genreUncheckedUpdateManyInput>
    /**
     * Filter which genres to update
     */
    where?: genreWhereInput
    /**
     * Limit how many genres to update.
     */
    limit?: number
  }

  /**
   * genre upsert
   */
  export type genreUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * The filter to search for the genre to update in case it exists.
     */
    where: genreWhereUniqueInput
    /**
     * In case the genre found by the `where` argument doesn't exist, create a new genre with this data.
     */
    create: XOR<genreCreateInput, genreUncheckedCreateInput>
    /**
     * In case the genre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<genreUpdateInput, genreUncheckedUpdateInput>
  }

  /**
   * genre delete
   */
  export type genreDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    /**
     * Filter which genre to delete.
     */
    where: genreWhereUniqueInput
  }

  /**
   * genre deleteMany
   */
  export type genreDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which genres to delete
     */
    where?: genreWhereInput
    /**
     * Limit how many genres to delete.
     */
    limit?: number
  }

  /**
   * genre.track
   */
  export type genre$trackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    where?: trackWhereInput
    orderBy?: trackOrderByWithRelationInput | trackOrderByWithRelationInput[]
    cursor?: trackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * genre without action
   */
  export type genreDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
  }


  /**
   * Model invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    invoice_id: number | null
    customer_id: number | null
    total: Decimal | null
  }

  export type InvoiceSumAggregateOutputType = {
    invoice_id: number | null
    customer_id: number | null
    total: Decimal | null
  }

  export type InvoiceMinAggregateOutputType = {
    invoice_id: number | null
    customer_id: number | null
    invoice_date: Date | null
    billing_address: string | null
    billing_city: string | null
    billing_state: string | null
    billing_country: string | null
    billing_postal_code: string | null
    total: Decimal | null
  }

  export type InvoiceMaxAggregateOutputType = {
    invoice_id: number | null
    customer_id: number | null
    invoice_date: Date | null
    billing_address: string | null
    billing_city: string | null
    billing_state: string | null
    billing_country: string | null
    billing_postal_code: string | null
    total: Decimal | null
  }

  export type InvoiceCountAggregateOutputType = {
    invoice_id: number
    customer_id: number
    invoice_date: number
    billing_address: number
    billing_city: number
    billing_state: number
    billing_country: number
    billing_postal_code: number
    total: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    invoice_id?: true
    customer_id?: true
    total?: true
  }

  export type InvoiceSumAggregateInputType = {
    invoice_id?: true
    customer_id?: true
    total?: true
  }

  export type InvoiceMinAggregateInputType = {
    invoice_id?: true
    customer_id?: true
    invoice_date?: true
    billing_address?: true
    billing_city?: true
    billing_state?: true
    billing_country?: true
    billing_postal_code?: true
    total?: true
  }

  export type InvoiceMaxAggregateInputType = {
    invoice_id?: true
    customer_id?: true
    invoice_date?: true
    billing_address?: true
    billing_city?: true
    billing_state?: true
    billing_country?: true
    billing_postal_code?: true
    total?: true
  }

  export type InvoiceCountAggregateInputType = {
    invoice_id?: true
    customer_id?: true
    invoice_date?: true
    billing_address?: true
    billing_city?: true
    billing_state?: true
    billing_country?: true
    billing_postal_code?: true
    total?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which invoice to aggregate.
     */
    where?: invoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invoices to fetch.
     */
    orderBy?: invoiceOrderByWithRelationInput | invoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: invoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type invoiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: invoiceWhereInput
    orderBy?: invoiceOrderByWithAggregationInput | invoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: invoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    invoice_id: number
    customer_id: number
    invoice_date: Date
    billing_address: string | null
    billing_city: string | null
    billing_state: string | null
    billing_country: string | null
    billing_postal_code: string | null
    total: Decimal
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends invoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type invoiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    invoice_id?: boolean
    customer_id?: boolean
    invoice_date?: boolean
    billing_address?: boolean
    billing_city?: boolean
    billing_state?: boolean
    billing_country?: boolean
    billing_postal_code?: boolean
    total?: boolean
    customer?: boolean | customerDefaultArgs<ExtArgs>
    invoice_line?: boolean | invoice$invoice_lineArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type invoiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    invoice_id?: boolean
    customer_id?: boolean
    invoice_date?: boolean
    billing_address?: boolean
    billing_city?: boolean
    billing_state?: boolean
    billing_country?: boolean
    billing_postal_code?: boolean
    total?: boolean
    customer?: boolean | customerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type invoiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    invoice_id?: boolean
    customer_id?: boolean
    invoice_date?: boolean
    billing_address?: boolean
    billing_city?: boolean
    billing_state?: boolean
    billing_country?: boolean
    billing_postal_code?: boolean
    total?: boolean
    customer?: boolean | customerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type invoiceSelectScalar = {
    invoice_id?: boolean
    customer_id?: boolean
    invoice_date?: boolean
    billing_address?: boolean
    billing_city?: boolean
    billing_state?: boolean
    billing_country?: boolean
    billing_postal_code?: boolean
    total?: boolean
  }

  export type invoiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"invoice_id" | "customer_id" | "invoice_date" | "billing_address" | "billing_city" | "billing_state" | "billing_country" | "billing_postal_code" | "total", ExtArgs["result"]["invoice"]>
  export type invoiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | customerDefaultArgs<ExtArgs>
    invoice_line?: boolean | invoice$invoice_lineArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type invoiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | customerDefaultArgs<ExtArgs>
  }
  export type invoiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | customerDefaultArgs<ExtArgs>
  }

  export type $invoicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "invoice"
    objects: {
      customer: Prisma.$customerPayload<ExtArgs>
      invoice_line: Prisma.$invoice_linePayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      invoice_id: number
      customer_id: number
      invoice_date: Date
      billing_address: string | null
      billing_city: string | null
      billing_state: string | null
      billing_country: string | null
      billing_postal_code: string | null
      total: Prisma.Decimal
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  export type invoiceGetPayload<S extends boolean | null | undefined | invoiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$invoicePayload, S>

  export type invoiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<invoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface invoiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['invoice'], meta: { name: 'invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {invoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends invoiceFindUniqueArgs>(args: SelectSubset<T, invoiceFindUniqueArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {invoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends invoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, invoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends invoiceFindFirstArgs>(args?: SelectSubset<T, invoiceFindFirstArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends invoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, invoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `invoice_id`
     * const invoiceWithInvoice_idOnly = await prisma.invoice.findMany({ select: { invoice_id: true } })
     * 
     */
    findMany<T extends invoiceFindManyArgs>(args?: SelectSubset<T, invoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice.
     * @param {invoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends invoiceCreateArgs>(args: SelectSubset<T, invoiceCreateArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoices.
     * @param {invoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends invoiceCreateManyArgs>(args?: SelectSubset<T, invoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {invoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `invoice_id`
     * const invoiceWithInvoice_idOnly = await prisma.invoice.createManyAndReturn({
     *   select: { invoice_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends invoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, invoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice.
     * @param {invoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends invoiceDeleteArgs>(args: SelectSubset<T, invoiceDeleteArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice.
     * @param {invoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends invoiceUpdateArgs>(args: SelectSubset<T, invoiceUpdateArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoices.
     * @param {invoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends invoiceDeleteManyArgs>(args?: SelectSubset<T, invoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends invoiceUpdateManyArgs>(args: SelectSubset<T, invoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices and returns the data updated in the database.
     * @param {invoiceUpdateManyAndReturnArgs} args - Arguments to update many Invoices.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoices and only return the `invoice_id`
     * const invoiceWithInvoice_idOnly = await prisma.invoice.updateManyAndReturn({
     *   select: { invoice_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends invoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, invoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice.
     * @param {invoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends invoiceUpsertArgs>(args: SelectSubset<T, invoiceUpsertArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends invoiceCountArgs>(
      args?: Subset<T, invoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends invoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: invoiceGroupByArgs['orderBy'] }
        : { orderBy?: invoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, invoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the invoice model
   */
  readonly fields: invoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__invoiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends customerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, customerDefaultArgs<ExtArgs>>): Prisma__customerClient<runtime.Types.Result.GetResult<Prisma.$customerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invoice_line<T extends invoice$invoice_lineArgs<ExtArgs> = {}>(args?: Subset<T, invoice$invoice_lineArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the invoice model
   */
  export interface invoiceFieldRefs {
    readonly invoice_id: FieldRef<"invoice", 'Int'>
    readonly customer_id: FieldRef<"invoice", 'Int'>
    readonly invoice_date: FieldRef<"invoice", 'DateTime'>
    readonly billing_address: FieldRef<"invoice", 'String'>
    readonly billing_city: FieldRef<"invoice", 'String'>
    readonly billing_state: FieldRef<"invoice", 'String'>
    readonly billing_country: FieldRef<"invoice", 'String'>
    readonly billing_postal_code: FieldRef<"invoice", 'String'>
    readonly total: FieldRef<"invoice", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * invoice findUnique
   */
  export type invoiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * Filter, which invoice to fetch.
     */
    where: invoiceWhereUniqueInput
  }

  /**
   * invoice findUniqueOrThrow
   */
  export type invoiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * Filter, which invoice to fetch.
     */
    where: invoiceWhereUniqueInput
  }

  /**
   * invoice findFirst
   */
  export type invoiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * Filter, which invoice to fetch.
     */
    where?: invoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invoices to fetch.
     */
    orderBy?: invoiceOrderByWithRelationInput | invoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for invoices.
     */
    cursor?: invoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * invoice findFirstOrThrow
   */
  export type invoiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * Filter, which invoice to fetch.
     */
    where?: invoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invoices to fetch.
     */
    orderBy?: invoiceOrderByWithRelationInput | invoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for invoices.
     */
    cursor?: invoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * invoice findMany
   */
  export type invoiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * Filter, which invoices to fetch.
     */
    where?: invoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invoices to fetch.
     */
    orderBy?: invoiceOrderByWithRelationInput | invoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing invoices.
     */
    cursor?: invoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * invoice create
   */
  export type invoiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a invoice.
     */
    data: XOR<invoiceCreateInput, invoiceUncheckedCreateInput>
  }

  /**
   * invoice createMany
   */
  export type invoiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many invoices.
     */
    data: invoiceCreateManyInput | invoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * invoice createManyAndReturn
   */
  export type invoiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * The data used to create many invoices.
     */
    data: invoiceCreateManyInput | invoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * invoice update
   */
  export type invoiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a invoice.
     */
    data: XOR<invoiceUpdateInput, invoiceUncheckedUpdateInput>
    /**
     * Choose, which invoice to update.
     */
    where: invoiceWhereUniqueInput
  }

  /**
   * invoice updateMany
   */
  export type invoiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update invoices.
     */
    data: XOR<invoiceUpdateManyMutationInput, invoiceUncheckedUpdateManyInput>
    /**
     * Filter which invoices to update
     */
    where?: invoiceWhereInput
    /**
     * Limit how many invoices to update.
     */
    limit?: number
  }

  /**
   * invoice updateManyAndReturn
   */
  export type invoiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * The data used to update invoices.
     */
    data: XOR<invoiceUpdateManyMutationInput, invoiceUncheckedUpdateManyInput>
    /**
     * Filter which invoices to update
     */
    where?: invoiceWhereInput
    /**
     * Limit how many invoices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * invoice upsert
   */
  export type invoiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the invoice to update in case it exists.
     */
    where: invoiceWhereUniqueInput
    /**
     * In case the invoice found by the `where` argument doesn't exist, create a new invoice with this data.
     */
    create: XOR<invoiceCreateInput, invoiceUncheckedCreateInput>
    /**
     * In case the invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<invoiceUpdateInput, invoiceUncheckedUpdateInput>
  }

  /**
   * invoice delete
   */
  export type invoiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
    /**
     * Filter which invoice to delete.
     */
    where: invoiceWhereUniqueInput
  }

  /**
   * invoice deleteMany
   */
  export type invoiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which invoices to delete
     */
    where?: invoiceWhereInput
    /**
     * Limit how many invoices to delete.
     */
    limit?: number
  }

  /**
   * invoice.invoice_line
   */
  export type invoice$invoice_lineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    where?: invoice_lineWhereInput
    orderBy?: invoice_lineOrderByWithRelationInput | invoice_lineOrderByWithRelationInput[]
    cursor?: invoice_lineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Invoice_lineScalarFieldEnum | Invoice_lineScalarFieldEnum[]
  }

  /**
   * invoice without action
   */
  export type invoiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice
     */
    select?: invoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice
     */
    omit?: invoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoiceInclude<ExtArgs> | null
  }


  /**
   * Model invoice_line
   */

  export type AggregateInvoice_line = {
    _count: Invoice_lineCountAggregateOutputType | null
    _avg: Invoice_lineAvgAggregateOutputType | null
    _sum: Invoice_lineSumAggregateOutputType | null
    _min: Invoice_lineMinAggregateOutputType | null
    _max: Invoice_lineMaxAggregateOutputType | null
  }

  export type Invoice_lineAvgAggregateOutputType = {
    invoice_line_id: number | null
    invoice_id: number | null
    track_id: number | null
    unit_price: Decimal | null
    quantity: number | null
  }

  export type Invoice_lineSumAggregateOutputType = {
    invoice_line_id: number | null
    invoice_id: number | null
    track_id: number | null
    unit_price: Decimal | null
    quantity: number | null
  }

  export type Invoice_lineMinAggregateOutputType = {
    invoice_line_id: number | null
    invoice_id: number | null
    track_id: number | null
    unit_price: Decimal | null
    quantity: number | null
  }

  export type Invoice_lineMaxAggregateOutputType = {
    invoice_line_id: number | null
    invoice_id: number | null
    track_id: number | null
    unit_price: Decimal | null
    quantity: number | null
  }

  export type Invoice_lineCountAggregateOutputType = {
    invoice_line_id: number
    invoice_id: number
    track_id: number
    unit_price: number
    quantity: number
    _all: number
  }


  export type Invoice_lineAvgAggregateInputType = {
    invoice_line_id?: true
    invoice_id?: true
    track_id?: true
    unit_price?: true
    quantity?: true
  }

  export type Invoice_lineSumAggregateInputType = {
    invoice_line_id?: true
    invoice_id?: true
    track_id?: true
    unit_price?: true
    quantity?: true
  }

  export type Invoice_lineMinAggregateInputType = {
    invoice_line_id?: true
    invoice_id?: true
    track_id?: true
    unit_price?: true
    quantity?: true
  }

  export type Invoice_lineMaxAggregateInputType = {
    invoice_line_id?: true
    invoice_id?: true
    track_id?: true
    unit_price?: true
    quantity?: true
  }

  export type Invoice_lineCountAggregateInputType = {
    invoice_line_id?: true
    invoice_id?: true
    track_id?: true
    unit_price?: true
    quantity?: true
    _all?: true
  }

  export type Invoice_lineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which invoice_line to aggregate.
     */
    where?: invoice_lineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invoice_lines to fetch.
     */
    orderBy?: invoice_lineOrderByWithRelationInput | invoice_lineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: invoice_lineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invoice_lines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invoice_lines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned invoice_lines
    **/
    _count?: true | Invoice_lineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Invoice_lineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Invoice_lineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Invoice_lineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Invoice_lineMaxAggregateInputType
  }

  export type GetInvoice_lineAggregateType<T extends Invoice_lineAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice_line]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice_line[P]>
      : GetScalarType<T[P], AggregateInvoice_line[P]>
  }




  export type invoice_lineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: invoice_lineWhereInput
    orderBy?: invoice_lineOrderByWithAggregationInput | invoice_lineOrderByWithAggregationInput[]
    by: Invoice_lineScalarFieldEnum[] | Invoice_lineScalarFieldEnum
    having?: invoice_lineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Invoice_lineCountAggregateInputType | true
    _avg?: Invoice_lineAvgAggregateInputType
    _sum?: Invoice_lineSumAggregateInputType
    _min?: Invoice_lineMinAggregateInputType
    _max?: Invoice_lineMaxAggregateInputType
  }

  export type Invoice_lineGroupByOutputType = {
    invoice_line_id: number
    invoice_id: number
    track_id: number
    unit_price: Decimal
    quantity: number
    _count: Invoice_lineCountAggregateOutputType | null
    _avg: Invoice_lineAvgAggregateOutputType | null
    _sum: Invoice_lineSumAggregateOutputType | null
    _min: Invoice_lineMinAggregateOutputType | null
    _max: Invoice_lineMaxAggregateOutputType | null
  }

  type GetInvoice_lineGroupByPayload<T extends invoice_lineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Invoice_lineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Invoice_lineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Invoice_lineGroupByOutputType[P]>
            : GetScalarType<T[P], Invoice_lineGroupByOutputType[P]>
        }
      >
    >


  export type invoice_lineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    invoice_line_id?: boolean
    invoice_id?: boolean
    track_id?: boolean
    unit_price?: boolean
    quantity?: boolean
    invoice?: boolean | invoiceDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice_line"]>

  export type invoice_lineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    invoice_line_id?: boolean
    invoice_id?: boolean
    track_id?: boolean
    unit_price?: boolean
    quantity?: boolean
    invoice?: boolean | invoiceDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice_line"]>

  export type invoice_lineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    invoice_line_id?: boolean
    invoice_id?: boolean
    track_id?: boolean
    unit_price?: boolean
    quantity?: boolean
    invoice?: boolean | invoiceDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice_line"]>

  export type invoice_lineSelectScalar = {
    invoice_line_id?: boolean
    invoice_id?: boolean
    track_id?: boolean
    unit_price?: boolean
    quantity?: boolean
  }

  export type invoice_lineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"invoice_line_id" | "invoice_id" | "track_id" | "unit_price" | "quantity", ExtArgs["result"]["invoice_line"]>
  export type invoice_lineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | invoiceDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }
  export type invoice_lineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | invoiceDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }
  export type invoice_lineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | invoiceDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }

  export type $invoice_linePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "invoice_line"
    objects: {
      invoice: Prisma.$invoicePayload<ExtArgs>
      track: Prisma.$trackPayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      invoice_line_id: number
      invoice_id: number
      track_id: number
      unit_price: Prisma.Decimal
      quantity: number
    }, ExtArgs["result"]["invoice_line"]>
    composites: {}
  }

  export type invoice_lineGetPayload<S extends boolean | null | undefined | invoice_lineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$invoice_linePayload, S>

  export type invoice_lineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<invoice_lineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Invoice_lineCountAggregateInputType | true
    }

  export interface invoice_lineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['invoice_line'], meta: { name: 'invoice_line' } }
    /**
     * Find zero or one Invoice_line that matches the filter.
     * @param {invoice_lineFindUniqueArgs} args - Arguments to find a Invoice_line
     * @example
     * // Get one Invoice_line
     * const invoice_line = await prisma.invoice_line.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends invoice_lineFindUniqueArgs>(args: SelectSubset<T, invoice_lineFindUniqueArgs<ExtArgs>>): Prisma__invoice_lineClient<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice_line that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {invoice_lineFindUniqueOrThrowArgs} args - Arguments to find a Invoice_line
     * @example
     * // Get one Invoice_line
     * const invoice_line = await prisma.invoice_line.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends invoice_lineFindUniqueOrThrowArgs>(args: SelectSubset<T, invoice_lineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__invoice_lineClient<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice_line that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoice_lineFindFirstArgs} args - Arguments to find a Invoice_line
     * @example
     * // Get one Invoice_line
     * const invoice_line = await prisma.invoice_line.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends invoice_lineFindFirstArgs>(args?: SelectSubset<T, invoice_lineFindFirstArgs<ExtArgs>>): Prisma__invoice_lineClient<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice_line that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoice_lineFindFirstOrThrowArgs} args - Arguments to find a Invoice_line
     * @example
     * // Get one Invoice_line
     * const invoice_line = await prisma.invoice_line.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends invoice_lineFindFirstOrThrowArgs>(args?: SelectSubset<T, invoice_lineFindFirstOrThrowArgs<ExtArgs>>): Prisma__invoice_lineClient<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoice_lines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoice_lineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoice_lines
     * const invoice_lines = await prisma.invoice_line.findMany()
     * 
     * // Get first 10 Invoice_lines
     * const invoice_lines = await prisma.invoice_line.findMany({ take: 10 })
     * 
     * // Only select the `invoice_line_id`
     * const invoice_lineWithInvoice_line_idOnly = await prisma.invoice_line.findMany({ select: { invoice_line_id: true } })
     * 
     */
    findMany<T extends invoice_lineFindManyArgs>(args?: SelectSubset<T, invoice_lineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice_line.
     * @param {invoice_lineCreateArgs} args - Arguments to create a Invoice_line.
     * @example
     * // Create one Invoice_line
     * const Invoice_line = await prisma.invoice_line.create({
     *   data: {
     *     // ... data to create a Invoice_line
     *   }
     * })
     * 
     */
    create<T extends invoice_lineCreateArgs>(args: SelectSubset<T, invoice_lineCreateArgs<ExtArgs>>): Prisma__invoice_lineClient<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoice_lines.
     * @param {invoice_lineCreateManyArgs} args - Arguments to create many Invoice_lines.
     * @example
     * // Create many Invoice_lines
     * const invoice_line = await prisma.invoice_line.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends invoice_lineCreateManyArgs>(args?: SelectSubset<T, invoice_lineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoice_lines and returns the data saved in the database.
     * @param {invoice_lineCreateManyAndReturnArgs} args - Arguments to create many Invoice_lines.
     * @example
     * // Create many Invoice_lines
     * const invoice_line = await prisma.invoice_line.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoice_lines and only return the `invoice_line_id`
     * const invoice_lineWithInvoice_line_idOnly = await prisma.invoice_line.createManyAndReturn({
     *   select: { invoice_line_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends invoice_lineCreateManyAndReturnArgs>(args?: SelectSubset<T, invoice_lineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice_line.
     * @param {invoice_lineDeleteArgs} args - Arguments to delete one Invoice_line.
     * @example
     * // Delete one Invoice_line
     * const Invoice_line = await prisma.invoice_line.delete({
     *   where: {
     *     // ... filter to delete one Invoice_line
     *   }
     * })
     * 
     */
    delete<T extends invoice_lineDeleteArgs>(args: SelectSubset<T, invoice_lineDeleteArgs<ExtArgs>>): Prisma__invoice_lineClient<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice_line.
     * @param {invoice_lineUpdateArgs} args - Arguments to update one Invoice_line.
     * @example
     * // Update one Invoice_line
     * const invoice_line = await prisma.invoice_line.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends invoice_lineUpdateArgs>(args: SelectSubset<T, invoice_lineUpdateArgs<ExtArgs>>): Prisma__invoice_lineClient<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoice_lines.
     * @param {invoice_lineDeleteManyArgs} args - Arguments to filter Invoice_lines to delete.
     * @example
     * // Delete a few Invoice_lines
     * const { count } = await prisma.invoice_line.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends invoice_lineDeleteManyArgs>(args?: SelectSubset<T, invoice_lineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoice_lines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoice_lineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoice_lines
     * const invoice_line = await prisma.invoice_line.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends invoice_lineUpdateManyArgs>(args: SelectSubset<T, invoice_lineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoice_lines and returns the data updated in the database.
     * @param {invoice_lineUpdateManyAndReturnArgs} args - Arguments to update many Invoice_lines.
     * @example
     * // Update many Invoice_lines
     * const invoice_line = await prisma.invoice_line.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoice_lines and only return the `invoice_line_id`
     * const invoice_lineWithInvoice_line_idOnly = await prisma.invoice_line.updateManyAndReturn({
     *   select: { invoice_line_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends invoice_lineUpdateManyAndReturnArgs>(args: SelectSubset<T, invoice_lineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice_line.
     * @param {invoice_lineUpsertArgs} args - Arguments to update or create a Invoice_line.
     * @example
     * // Update or create a Invoice_line
     * const invoice_line = await prisma.invoice_line.upsert({
     *   create: {
     *     // ... data to create a Invoice_line
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice_line we want to update
     *   }
     * })
     */
    upsert<T extends invoice_lineUpsertArgs>(args: SelectSubset<T, invoice_lineUpsertArgs<ExtArgs>>): Prisma__invoice_lineClient<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoice_lines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoice_lineCountArgs} args - Arguments to filter Invoice_lines to count.
     * @example
     * // Count the number of Invoice_lines
     * const count = await prisma.invoice_line.count({
     *   where: {
     *     // ... the filter for the Invoice_lines we want to count
     *   }
     * })
    **/
    count<T extends invoice_lineCountArgs>(
      args?: Subset<T, invoice_lineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Invoice_lineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice_line.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Invoice_lineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Invoice_lineAggregateArgs>(args: Subset<T, Invoice_lineAggregateArgs>): Prisma.PrismaPromise<GetInvoice_lineAggregateType<T>>

    /**
     * Group by Invoice_line.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invoice_lineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends invoice_lineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: invoice_lineGroupByArgs['orderBy'] }
        : { orderBy?: invoice_lineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, invoice_lineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoice_lineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the invoice_line model
   */
  readonly fields: invoice_lineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for invoice_line.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__invoice_lineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoice<T extends invoiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, invoiceDefaultArgs<ExtArgs>>): Prisma__invoiceClient<runtime.Types.Result.GetResult<Prisma.$invoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    track<T extends trackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, trackDefaultArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the invoice_line model
   */
  export interface invoice_lineFieldRefs {
    readonly invoice_line_id: FieldRef<"invoice_line", 'Int'>
    readonly invoice_id: FieldRef<"invoice_line", 'Int'>
    readonly track_id: FieldRef<"invoice_line", 'Int'>
    readonly unit_price: FieldRef<"invoice_line", 'Decimal'>
    readonly quantity: FieldRef<"invoice_line", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * invoice_line findUnique
   */
  export type invoice_lineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * Filter, which invoice_line to fetch.
     */
    where: invoice_lineWhereUniqueInput
  }

  /**
   * invoice_line findUniqueOrThrow
   */
  export type invoice_lineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * Filter, which invoice_line to fetch.
     */
    where: invoice_lineWhereUniqueInput
  }

  /**
   * invoice_line findFirst
   */
  export type invoice_lineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * Filter, which invoice_line to fetch.
     */
    where?: invoice_lineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invoice_lines to fetch.
     */
    orderBy?: invoice_lineOrderByWithRelationInput | invoice_lineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for invoice_lines.
     */
    cursor?: invoice_lineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invoice_lines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invoice_lines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of invoice_lines.
     */
    distinct?: Invoice_lineScalarFieldEnum | Invoice_lineScalarFieldEnum[]
  }

  /**
   * invoice_line findFirstOrThrow
   */
  export type invoice_lineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * Filter, which invoice_line to fetch.
     */
    where?: invoice_lineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invoice_lines to fetch.
     */
    orderBy?: invoice_lineOrderByWithRelationInput | invoice_lineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for invoice_lines.
     */
    cursor?: invoice_lineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invoice_lines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invoice_lines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of invoice_lines.
     */
    distinct?: Invoice_lineScalarFieldEnum | Invoice_lineScalarFieldEnum[]
  }

  /**
   * invoice_line findMany
   */
  export type invoice_lineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * Filter, which invoice_lines to fetch.
     */
    where?: invoice_lineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invoice_lines to fetch.
     */
    orderBy?: invoice_lineOrderByWithRelationInput | invoice_lineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing invoice_lines.
     */
    cursor?: invoice_lineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invoice_lines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invoice_lines.
     */
    skip?: number
    distinct?: Invoice_lineScalarFieldEnum | Invoice_lineScalarFieldEnum[]
  }

  /**
   * invoice_line create
   */
  export type invoice_lineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * The data needed to create a invoice_line.
     */
    data: XOR<invoice_lineCreateInput, invoice_lineUncheckedCreateInput>
  }

  /**
   * invoice_line createMany
   */
  export type invoice_lineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many invoice_lines.
     */
    data: invoice_lineCreateManyInput | invoice_lineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * invoice_line createManyAndReturn
   */
  export type invoice_lineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * The data used to create many invoice_lines.
     */
    data: invoice_lineCreateManyInput | invoice_lineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * invoice_line update
   */
  export type invoice_lineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * The data needed to update a invoice_line.
     */
    data: XOR<invoice_lineUpdateInput, invoice_lineUncheckedUpdateInput>
    /**
     * Choose, which invoice_line to update.
     */
    where: invoice_lineWhereUniqueInput
  }

  /**
   * invoice_line updateMany
   */
  export type invoice_lineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update invoice_lines.
     */
    data: XOR<invoice_lineUpdateManyMutationInput, invoice_lineUncheckedUpdateManyInput>
    /**
     * Filter which invoice_lines to update
     */
    where?: invoice_lineWhereInput
    /**
     * Limit how many invoice_lines to update.
     */
    limit?: number
  }

  /**
   * invoice_line updateManyAndReturn
   */
  export type invoice_lineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * The data used to update invoice_lines.
     */
    data: XOR<invoice_lineUpdateManyMutationInput, invoice_lineUncheckedUpdateManyInput>
    /**
     * Filter which invoice_lines to update
     */
    where?: invoice_lineWhereInput
    /**
     * Limit how many invoice_lines to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * invoice_line upsert
   */
  export type invoice_lineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * The filter to search for the invoice_line to update in case it exists.
     */
    where: invoice_lineWhereUniqueInput
    /**
     * In case the invoice_line found by the `where` argument doesn't exist, create a new invoice_line with this data.
     */
    create: XOR<invoice_lineCreateInput, invoice_lineUncheckedCreateInput>
    /**
     * In case the invoice_line was found with the provided `where` argument, update it with this data.
     */
    update: XOR<invoice_lineUpdateInput, invoice_lineUncheckedUpdateInput>
  }

  /**
   * invoice_line delete
   */
  export type invoice_lineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    /**
     * Filter which invoice_line to delete.
     */
    where: invoice_lineWhereUniqueInput
  }

  /**
   * invoice_line deleteMany
   */
  export type invoice_lineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which invoice_lines to delete
     */
    where?: invoice_lineWhereInput
    /**
     * Limit how many invoice_lines to delete.
     */
    limit?: number
  }

  /**
   * invoice_line without action
   */
  export type invoice_lineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
  }


  /**
   * Model media_type
   */

  export type AggregateMedia_type = {
    _count: Media_typeCountAggregateOutputType | null
    _avg: Media_typeAvgAggregateOutputType | null
    _sum: Media_typeSumAggregateOutputType | null
    _min: Media_typeMinAggregateOutputType | null
    _max: Media_typeMaxAggregateOutputType | null
  }

  export type Media_typeAvgAggregateOutputType = {
    media_type_id: number | null
  }

  export type Media_typeSumAggregateOutputType = {
    media_type_id: number | null
  }

  export type Media_typeMinAggregateOutputType = {
    media_type_id: number | null
    name: string | null
  }

  export type Media_typeMaxAggregateOutputType = {
    media_type_id: number | null
    name: string | null
  }

  export type Media_typeCountAggregateOutputType = {
    media_type_id: number
    name: number
    _all: number
  }


  export type Media_typeAvgAggregateInputType = {
    media_type_id?: true
  }

  export type Media_typeSumAggregateInputType = {
    media_type_id?: true
  }

  export type Media_typeMinAggregateInputType = {
    media_type_id?: true
    name?: true
  }

  export type Media_typeMaxAggregateInputType = {
    media_type_id?: true
    name?: true
  }

  export type Media_typeCountAggregateInputType = {
    media_type_id?: true
    name?: true
    _all?: true
  }

  export type Media_typeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which media_type to aggregate.
     */
    where?: media_typeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of media_types to fetch.
     */
    orderBy?: media_typeOrderByWithRelationInput | media_typeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: media_typeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` media_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` media_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned media_types
    **/
    _count?: true | Media_typeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Media_typeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Media_typeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Media_typeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Media_typeMaxAggregateInputType
  }

  export type GetMedia_typeAggregateType<T extends Media_typeAggregateArgs> = {
        [P in keyof T & keyof AggregateMedia_type]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedia_type[P]>
      : GetScalarType<T[P], AggregateMedia_type[P]>
  }




  export type media_typeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: media_typeWhereInput
    orderBy?: media_typeOrderByWithAggregationInput | media_typeOrderByWithAggregationInput[]
    by: Media_typeScalarFieldEnum[] | Media_typeScalarFieldEnum
    having?: media_typeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Media_typeCountAggregateInputType | true
    _avg?: Media_typeAvgAggregateInputType
    _sum?: Media_typeSumAggregateInputType
    _min?: Media_typeMinAggregateInputType
    _max?: Media_typeMaxAggregateInputType
  }

  export type Media_typeGroupByOutputType = {
    media_type_id: number
    name: string | null
    _count: Media_typeCountAggregateOutputType | null
    _avg: Media_typeAvgAggregateOutputType | null
    _sum: Media_typeSumAggregateOutputType | null
    _min: Media_typeMinAggregateOutputType | null
    _max: Media_typeMaxAggregateOutputType | null
  }

  type GetMedia_typeGroupByPayload<T extends media_typeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Media_typeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Media_typeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Media_typeGroupByOutputType[P]>
            : GetScalarType<T[P], Media_typeGroupByOutputType[P]>
        }
      >
    >


  export type media_typeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    media_type_id?: boolean
    name?: boolean
    track?: boolean | media_type$trackArgs<ExtArgs>
    _count?: boolean | Media_typeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["media_type"]>

  export type media_typeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    media_type_id?: boolean
    name?: boolean
  }, ExtArgs["result"]["media_type"]>

  export type media_typeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    media_type_id?: boolean
    name?: boolean
  }, ExtArgs["result"]["media_type"]>

  export type media_typeSelectScalar = {
    media_type_id?: boolean
    name?: boolean
  }

  export type media_typeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"media_type_id" | "name", ExtArgs["result"]["media_type"]>
  export type media_typeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    track?: boolean | media_type$trackArgs<ExtArgs>
    _count?: boolean | Media_typeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type media_typeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type media_typeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $media_typePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "media_type"
    objects: {
      track: Prisma.$trackPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      media_type_id: number
      name: string | null
    }, ExtArgs["result"]["media_type"]>
    composites: {}
  }

  export type media_typeGetPayload<S extends boolean | null | undefined | media_typeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$media_typePayload, S>

  export type media_typeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<media_typeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Media_typeCountAggregateInputType | true
    }

  export interface media_typeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['media_type'], meta: { name: 'media_type' } }
    /**
     * Find zero or one Media_type that matches the filter.
     * @param {media_typeFindUniqueArgs} args - Arguments to find a Media_type
     * @example
     * // Get one Media_type
     * const media_type = await prisma.media_type.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends media_typeFindUniqueArgs>(args: SelectSubset<T, media_typeFindUniqueArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Media_type that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {media_typeFindUniqueOrThrowArgs} args - Arguments to find a Media_type
     * @example
     * // Get one Media_type
     * const media_type = await prisma.media_type.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends media_typeFindUniqueOrThrowArgs>(args: SelectSubset<T, media_typeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media_type that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {media_typeFindFirstArgs} args - Arguments to find a Media_type
     * @example
     * // Get one Media_type
     * const media_type = await prisma.media_type.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends media_typeFindFirstArgs>(args?: SelectSubset<T, media_typeFindFirstArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media_type that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {media_typeFindFirstOrThrowArgs} args - Arguments to find a Media_type
     * @example
     * // Get one Media_type
     * const media_type = await prisma.media_type.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends media_typeFindFirstOrThrowArgs>(args?: SelectSubset<T, media_typeFindFirstOrThrowArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Media_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {media_typeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Media_types
     * const media_types = await prisma.media_type.findMany()
     * 
     * // Get first 10 Media_types
     * const media_types = await prisma.media_type.findMany({ take: 10 })
     * 
     * // Only select the `media_type_id`
     * const media_typeWithMedia_type_idOnly = await prisma.media_type.findMany({ select: { media_type_id: true } })
     * 
     */
    findMany<T extends media_typeFindManyArgs>(args?: SelectSubset<T, media_typeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Media_type.
     * @param {media_typeCreateArgs} args - Arguments to create a Media_type.
     * @example
     * // Create one Media_type
     * const Media_type = await prisma.media_type.create({
     *   data: {
     *     // ... data to create a Media_type
     *   }
     * })
     * 
     */
    create<T extends media_typeCreateArgs>(args: SelectSubset<T, media_typeCreateArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Media_types.
     * @param {media_typeCreateManyArgs} args - Arguments to create many Media_types.
     * @example
     * // Create many Media_types
     * const media_type = await prisma.media_type.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends media_typeCreateManyArgs>(args?: SelectSubset<T, media_typeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Media_types and returns the data saved in the database.
     * @param {media_typeCreateManyAndReturnArgs} args - Arguments to create many Media_types.
     * @example
     * // Create many Media_types
     * const media_type = await prisma.media_type.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Media_types and only return the `media_type_id`
     * const media_typeWithMedia_type_idOnly = await prisma.media_type.createManyAndReturn({
     *   select: { media_type_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends media_typeCreateManyAndReturnArgs>(args?: SelectSubset<T, media_typeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Media_type.
     * @param {media_typeDeleteArgs} args - Arguments to delete one Media_type.
     * @example
     * // Delete one Media_type
     * const Media_type = await prisma.media_type.delete({
     *   where: {
     *     // ... filter to delete one Media_type
     *   }
     * })
     * 
     */
    delete<T extends media_typeDeleteArgs>(args: SelectSubset<T, media_typeDeleteArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Media_type.
     * @param {media_typeUpdateArgs} args - Arguments to update one Media_type.
     * @example
     * // Update one Media_type
     * const media_type = await prisma.media_type.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends media_typeUpdateArgs>(args: SelectSubset<T, media_typeUpdateArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Media_types.
     * @param {media_typeDeleteManyArgs} args - Arguments to filter Media_types to delete.
     * @example
     * // Delete a few Media_types
     * const { count } = await prisma.media_type.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends media_typeDeleteManyArgs>(args?: SelectSubset<T, media_typeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {media_typeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Media_types
     * const media_type = await prisma.media_type.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends media_typeUpdateManyArgs>(args: SelectSubset<T, media_typeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media_types and returns the data updated in the database.
     * @param {media_typeUpdateManyAndReturnArgs} args - Arguments to update many Media_types.
     * @example
     * // Update many Media_types
     * const media_type = await prisma.media_type.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Media_types and only return the `media_type_id`
     * const media_typeWithMedia_type_idOnly = await prisma.media_type.updateManyAndReturn({
     *   select: { media_type_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends media_typeUpdateManyAndReturnArgs>(args: SelectSubset<T, media_typeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Media_type.
     * @param {media_typeUpsertArgs} args - Arguments to update or create a Media_type.
     * @example
     * // Update or create a Media_type
     * const media_type = await prisma.media_type.upsert({
     *   create: {
     *     // ... data to create a Media_type
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Media_type we want to update
     *   }
     * })
     */
    upsert<T extends media_typeUpsertArgs>(args: SelectSubset<T, media_typeUpsertArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Media_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {media_typeCountArgs} args - Arguments to filter Media_types to count.
     * @example
     * // Count the number of Media_types
     * const count = await prisma.media_type.count({
     *   where: {
     *     // ... the filter for the Media_types we want to count
     *   }
     * })
    **/
    count<T extends media_typeCountArgs>(
      args?: Subset<T, media_typeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Media_typeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Media_type.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Media_typeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Media_typeAggregateArgs>(args: Subset<T, Media_typeAggregateArgs>): Prisma.PrismaPromise<GetMedia_typeAggregateType<T>>

    /**
     * Group by Media_type.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {media_typeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends media_typeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: media_typeGroupByArgs['orderBy'] }
        : { orderBy?: media_typeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, media_typeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedia_typeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the media_type model
   */
  readonly fields: media_typeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for media_type.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__media_typeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    track<T extends media_type$trackArgs<ExtArgs> = {}>(args?: Subset<T, media_type$trackArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the media_type model
   */
  export interface media_typeFieldRefs {
    readonly media_type_id: FieldRef<"media_type", 'Int'>
    readonly name: FieldRef<"media_type", 'String'>
  }
    

  // Custom InputTypes
  /**
   * media_type findUnique
   */
  export type media_typeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * Filter, which media_type to fetch.
     */
    where: media_typeWhereUniqueInput
  }

  /**
   * media_type findUniqueOrThrow
   */
  export type media_typeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * Filter, which media_type to fetch.
     */
    where: media_typeWhereUniqueInput
  }

  /**
   * media_type findFirst
   */
  export type media_typeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * Filter, which media_type to fetch.
     */
    where?: media_typeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of media_types to fetch.
     */
    orderBy?: media_typeOrderByWithRelationInput | media_typeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for media_types.
     */
    cursor?: media_typeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` media_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` media_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of media_types.
     */
    distinct?: Media_typeScalarFieldEnum | Media_typeScalarFieldEnum[]
  }

  /**
   * media_type findFirstOrThrow
   */
  export type media_typeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * Filter, which media_type to fetch.
     */
    where?: media_typeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of media_types to fetch.
     */
    orderBy?: media_typeOrderByWithRelationInput | media_typeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for media_types.
     */
    cursor?: media_typeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` media_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` media_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of media_types.
     */
    distinct?: Media_typeScalarFieldEnum | Media_typeScalarFieldEnum[]
  }

  /**
   * media_type findMany
   */
  export type media_typeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * Filter, which media_types to fetch.
     */
    where?: media_typeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of media_types to fetch.
     */
    orderBy?: media_typeOrderByWithRelationInput | media_typeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing media_types.
     */
    cursor?: media_typeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` media_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` media_types.
     */
    skip?: number
    distinct?: Media_typeScalarFieldEnum | Media_typeScalarFieldEnum[]
  }

  /**
   * media_type create
   */
  export type media_typeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * The data needed to create a media_type.
     */
    data: XOR<media_typeCreateInput, media_typeUncheckedCreateInput>
  }

  /**
   * media_type createMany
   */
  export type media_typeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many media_types.
     */
    data: media_typeCreateManyInput | media_typeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * media_type createManyAndReturn
   */
  export type media_typeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * The data used to create many media_types.
     */
    data: media_typeCreateManyInput | media_typeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * media_type update
   */
  export type media_typeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * The data needed to update a media_type.
     */
    data: XOR<media_typeUpdateInput, media_typeUncheckedUpdateInput>
    /**
     * Choose, which media_type to update.
     */
    where: media_typeWhereUniqueInput
  }

  /**
   * media_type updateMany
   */
  export type media_typeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update media_types.
     */
    data: XOR<media_typeUpdateManyMutationInput, media_typeUncheckedUpdateManyInput>
    /**
     * Filter which media_types to update
     */
    where?: media_typeWhereInput
    /**
     * Limit how many media_types to update.
     */
    limit?: number
  }

  /**
   * media_type updateManyAndReturn
   */
  export type media_typeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * The data used to update media_types.
     */
    data: XOR<media_typeUpdateManyMutationInput, media_typeUncheckedUpdateManyInput>
    /**
     * Filter which media_types to update
     */
    where?: media_typeWhereInput
    /**
     * Limit how many media_types to update.
     */
    limit?: number
  }

  /**
   * media_type upsert
   */
  export type media_typeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * The filter to search for the media_type to update in case it exists.
     */
    where: media_typeWhereUniqueInput
    /**
     * In case the media_type found by the `where` argument doesn't exist, create a new media_type with this data.
     */
    create: XOR<media_typeCreateInput, media_typeUncheckedCreateInput>
    /**
     * In case the media_type was found with the provided `where` argument, update it with this data.
     */
    update: XOR<media_typeUpdateInput, media_typeUncheckedUpdateInput>
  }

  /**
   * media_type delete
   */
  export type media_typeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
    /**
     * Filter which media_type to delete.
     */
    where: media_typeWhereUniqueInput
  }

  /**
   * media_type deleteMany
   */
  export type media_typeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which media_types to delete
     */
    where?: media_typeWhereInput
    /**
     * Limit how many media_types to delete.
     */
    limit?: number
  }

  /**
   * media_type.track
   */
  export type media_type$trackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    where?: trackWhereInput
    orderBy?: trackOrderByWithRelationInput | trackOrderByWithRelationInput[]
    cursor?: trackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * media_type without action
   */
  export type media_typeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media_type
     */
    select?: media_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media_type
     */
    omit?: media_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: media_typeInclude<ExtArgs> | null
  }


  /**
   * Model playlist
   */

  export type AggregatePlaylist = {
    _count: PlaylistCountAggregateOutputType | null
    _avg: PlaylistAvgAggregateOutputType | null
    _sum: PlaylistSumAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  export type PlaylistAvgAggregateOutputType = {
    playlist_id: number | null
  }

  export type PlaylistSumAggregateOutputType = {
    playlist_id: number | null
  }

  export type PlaylistMinAggregateOutputType = {
    playlist_id: number | null
    name: string | null
  }

  export type PlaylistMaxAggregateOutputType = {
    playlist_id: number | null
    name: string | null
  }

  export type PlaylistCountAggregateOutputType = {
    playlist_id: number
    name: number
    _all: number
  }


  export type PlaylistAvgAggregateInputType = {
    playlist_id?: true
  }

  export type PlaylistSumAggregateInputType = {
    playlist_id?: true
  }

  export type PlaylistMinAggregateInputType = {
    playlist_id?: true
    name?: true
  }

  export type PlaylistMaxAggregateInputType = {
    playlist_id?: true
    name?: true
  }

  export type PlaylistCountAggregateInputType = {
    playlist_id?: true
    name?: true
    _all?: true
  }

  export type PlaylistAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which playlist to aggregate.
     */
    where?: playlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlists to fetch.
     */
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: playlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned playlists
    **/
    _count?: true | PlaylistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaylistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaylistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistMaxAggregateInputType
  }

  export type GetPlaylistAggregateType<T extends PlaylistAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylist[P]>
      : GetScalarType<T[P], AggregatePlaylist[P]>
  }




  export type playlistGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: playlistWhereInput
    orderBy?: playlistOrderByWithAggregationInput | playlistOrderByWithAggregationInput[]
    by: PlaylistScalarFieldEnum[] | PlaylistScalarFieldEnum
    having?: playlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistCountAggregateInputType | true
    _avg?: PlaylistAvgAggregateInputType
    _sum?: PlaylistSumAggregateInputType
    _min?: PlaylistMinAggregateInputType
    _max?: PlaylistMaxAggregateInputType
  }

  export type PlaylistGroupByOutputType = {
    playlist_id: number
    name: string | null
    _count: PlaylistCountAggregateOutputType | null
    _avg: PlaylistAvgAggregateOutputType | null
    _sum: PlaylistSumAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  type GetPlaylistGroupByPayload<T extends playlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
        }
      >
    >


  export type playlistSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    playlist_id?: boolean
    name?: boolean
    playlist_track?: boolean | playlist$playlist_trackArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>

  export type playlistSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    playlist_id?: boolean
    name?: boolean
  }, ExtArgs["result"]["playlist"]>

  export type playlistSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    playlist_id?: boolean
    name?: boolean
  }, ExtArgs["result"]["playlist"]>

  export type playlistSelectScalar = {
    playlist_id?: boolean
    name?: boolean
  }

  export type playlistOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"playlist_id" | "name", ExtArgs["result"]["playlist"]>
  export type playlistInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    playlist_track?: boolean | playlist$playlist_trackArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type playlistIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type playlistIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $playlistPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "playlist"
    objects: {
      playlist_track: Prisma.$playlist_trackPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      playlist_id: number
      name: string | null
    }, ExtArgs["result"]["playlist"]>
    composites: {}
  }

  export type playlistGetPayload<S extends boolean | null | undefined | playlistDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$playlistPayload, S>

  export type playlistCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<playlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaylistCountAggregateInputType | true
    }

  export interface playlistDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['playlist'], meta: { name: 'playlist' } }
    /**
     * Find zero or one Playlist that matches the filter.
     * @param {playlistFindUniqueArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends playlistFindUniqueArgs>(args: SelectSubset<T, playlistFindUniqueArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {playlistFindUniqueOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends playlistFindUniqueOrThrowArgs>(args: SelectSubset<T, playlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistFindFirstArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends playlistFindFirstArgs>(args?: SelectSubset<T, playlistFindFirstArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistFindFirstOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends playlistFindFirstOrThrowArgs>(args?: SelectSubset<T, playlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playlists
     * const playlists = await prisma.playlist.findMany()
     * 
     * // Get first 10 Playlists
     * const playlists = await prisma.playlist.findMany({ take: 10 })
     * 
     * // Only select the `playlist_id`
     * const playlistWithPlaylist_idOnly = await prisma.playlist.findMany({ select: { playlist_id: true } })
     * 
     */
    findMany<T extends playlistFindManyArgs>(args?: SelectSubset<T, playlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playlist.
     * @param {playlistCreateArgs} args - Arguments to create a Playlist.
     * @example
     * // Create one Playlist
     * const Playlist = await prisma.playlist.create({
     *   data: {
     *     // ... data to create a Playlist
     *   }
     * })
     * 
     */
    create<T extends playlistCreateArgs>(args: SelectSubset<T, playlistCreateArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playlists.
     * @param {playlistCreateManyArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends playlistCreateManyArgs>(args?: SelectSubset<T, playlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Playlists and returns the data saved in the database.
     * @param {playlistCreateManyAndReturnArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Playlists and only return the `playlist_id`
     * const playlistWithPlaylist_idOnly = await prisma.playlist.createManyAndReturn({
     *   select: { playlist_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends playlistCreateManyAndReturnArgs>(args?: SelectSubset<T, playlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Playlist.
     * @param {playlistDeleteArgs} args - Arguments to delete one Playlist.
     * @example
     * // Delete one Playlist
     * const Playlist = await prisma.playlist.delete({
     *   where: {
     *     // ... filter to delete one Playlist
     *   }
     * })
     * 
     */
    delete<T extends playlistDeleteArgs>(args: SelectSubset<T, playlistDeleteArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playlist.
     * @param {playlistUpdateArgs} args - Arguments to update one Playlist.
     * @example
     * // Update one Playlist
     * const playlist = await prisma.playlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends playlistUpdateArgs>(args: SelectSubset<T, playlistUpdateArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playlists.
     * @param {playlistDeleteManyArgs} args - Arguments to filter Playlists to delete.
     * @example
     * // Delete a few Playlists
     * const { count } = await prisma.playlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends playlistDeleteManyArgs>(args?: SelectSubset<T, playlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends playlistUpdateManyArgs>(args: SelectSubset<T, playlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists and returns the data updated in the database.
     * @param {playlistUpdateManyAndReturnArgs} args - Arguments to update many Playlists.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Playlists and only return the `playlist_id`
     * const playlistWithPlaylist_idOnly = await prisma.playlist.updateManyAndReturn({
     *   select: { playlist_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends playlistUpdateManyAndReturnArgs>(args: SelectSubset<T, playlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Playlist.
     * @param {playlistUpsertArgs} args - Arguments to update or create a Playlist.
     * @example
     * // Update or create a Playlist
     * const playlist = await prisma.playlist.upsert({
     *   create: {
     *     // ... data to create a Playlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playlist we want to update
     *   }
     * })
     */
    upsert<T extends playlistUpsertArgs>(args: SelectSubset<T, playlistUpsertArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistCountArgs} args - Arguments to filter Playlists to count.
     * @example
     * // Count the number of Playlists
     * const count = await prisma.playlist.count({
     *   where: {
     *     // ... the filter for the Playlists we want to count
     *   }
     * })
    **/
    count<T extends playlistCountArgs>(
      args?: Subset<T, playlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaylistAggregateArgs>(args: Subset<T, PlaylistAggregateArgs>): Prisma.PrismaPromise<GetPlaylistAggregateType<T>>

    /**
     * Group by Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends playlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: playlistGroupByArgs['orderBy'] }
        : { orderBy?: playlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, playlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the playlist model
   */
  readonly fields: playlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for playlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__playlistClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlist_track<T extends playlist$playlist_trackArgs<ExtArgs> = {}>(args?: Subset<T, playlist$playlist_trackArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the playlist model
   */
  export interface playlistFieldRefs {
    readonly playlist_id: FieldRef<"playlist", 'Int'>
    readonly name: FieldRef<"playlist", 'String'>
  }
    

  // Custom InputTypes
  /**
   * playlist findUnique
   */
  export type playlistFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlist to fetch.
     */
    where: playlistWhereUniqueInput
  }

  /**
   * playlist findUniqueOrThrow
   */
  export type playlistFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlist to fetch.
     */
    where: playlistWhereUniqueInput
  }

  /**
   * playlist findFirst
   */
  export type playlistFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlist to fetch.
     */
    where?: playlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlists to fetch.
     */
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playlists.
     */
    cursor?: playlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * playlist findFirstOrThrow
   */
  export type playlistFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlist to fetch.
     */
    where?: playlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlists to fetch.
     */
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playlists.
     */
    cursor?: playlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * playlist findMany
   */
  export type playlistFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlists to fetch.
     */
    where?: playlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlists to fetch.
     */
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing playlists.
     */
    cursor?: playlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlists.
     */
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * playlist create
   */
  export type playlistCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * The data needed to create a playlist.
     */
    data: XOR<playlistCreateInput, playlistUncheckedCreateInput>
  }

  /**
   * playlist createMany
   */
  export type playlistCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many playlists.
     */
    data: playlistCreateManyInput | playlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * playlist createManyAndReturn
   */
  export type playlistCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * The data used to create many playlists.
     */
    data: playlistCreateManyInput | playlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * playlist update
   */
  export type playlistUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * The data needed to update a playlist.
     */
    data: XOR<playlistUpdateInput, playlistUncheckedUpdateInput>
    /**
     * Choose, which playlist to update.
     */
    where: playlistWhereUniqueInput
  }

  /**
   * playlist updateMany
   */
  export type playlistUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update playlists.
     */
    data: XOR<playlistUpdateManyMutationInput, playlistUncheckedUpdateManyInput>
    /**
     * Filter which playlists to update
     */
    where?: playlistWhereInput
    /**
     * Limit how many playlists to update.
     */
    limit?: number
  }

  /**
   * playlist updateManyAndReturn
   */
  export type playlistUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * The data used to update playlists.
     */
    data: XOR<playlistUpdateManyMutationInput, playlistUncheckedUpdateManyInput>
    /**
     * Filter which playlists to update
     */
    where?: playlistWhereInput
    /**
     * Limit how many playlists to update.
     */
    limit?: number
  }

  /**
   * playlist upsert
   */
  export type playlistUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * The filter to search for the playlist to update in case it exists.
     */
    where: playlistWhereUniqueInput
    /**
     * In case the playlist found by the `where` argument doesn't exist, create a new playlist with this data.
     */
    create: XOR<playlistCreateInput, playlistUncheckedCreateInput>
    /**
     * In case the playlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<playlistUpdateInput, playlistUncheckedUpdateInput>
  }

  /**
   * playlist delete
   */
  export type playlistDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter which playlist to delete.
     */
    where: playlistWhereUniqueInput
  }

  /**
   * playlist deleteMany
   */
  export type playlistDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which playlists to delete
     */
    where?: playlistWhereInput
    /**
     * Limit how many playlists to delete.
     */
    limit?: number
  }

  /**
   * playlist.playlist_track
   */
  export type playlist$playlist_trackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    where?: playlist_trackWhereInput
    orderBy?: playlist_trackOrderByWithRelationInput | playlist_trackOrderByWithRelationInput[]
    cursor?: playlist_trackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Playlist_trackScalarFieldEnum | Playlist_trackScalarFieldEnum[]
  }

  /**
   * playlist without action
   */
  export type playlistDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
  }


  /**
   * Model playlist_track
   */

  export type AggregatePlaylist_track = {
    _count: Playlist_trackCountAggregateOutputType | null
    _avg: Playlist_trackAvgAggregateOutputType | null
    _sum: Playlist_trackSumAggregateOutputType | null
    _min: Playlist_trackMinAggregateOutputType | null
    _max: Playlist_trackMaxAggregateOutputType | null
  }

  export type Playlist_trackAvgAggregateOutputType = {
    playlist_id: number | null
    track_id: number | null
  }

  export type Playlist_trackSumAggregateOutputType = {
    playlist_id: number | null
    track_id: number | null
  }

  export type Playlist_trackMinAggregateOutputType = {
    playlist_id: number | null
    track_id: number | null
  }

  export type Playlist_trackMaxAggregateOutputType = {
    playlist_id: number | null
    track_id: number | null
  }

  export type Playlist_trackCountAggregateOutputType = {
    playlist_id: number
    track_id: number
    _all: number
  }


  export type Playlist_trackAvgAggregateInputType = {
    playlist_id?: true
    track_id?: true
  }

  export type Playlist_trackSumAggregateInputType = {
    playlist_id?: true
    track_id?: true
  }

  export type Playlist_trackMinAggregateInputType = {
    playlist_id?: true
    track_id?: true
  }

  export type Playlist_trackMaxAggregateInputType = {
    playlist_id?: true
    track_id?: true
  }

  export type Playlist_trackCountAggregateInputType = {
    playlist_id?: true
    track_id?: true
    _all?: true
  }

  export type Playlist_trackAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which playlist_track to aggregate.
     */
    where?: playlist_trackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlist_tracks to fetch.
     */
    orderBy?: playlist_trackOrderByWithRelationInput | playlist_trackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: playlist_trackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlist_tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlist_tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned playlist_tracks
    **/
    _count?: true | Playlist_trackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Playlist_trackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Playlist_trackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Playlist_trackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Playlist_trackMaxAggregateInputType
  }

  export type GetPlaylist_trackAggregateType<T extends Playlist_trackAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylist_track]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylist_track[P]>
      : GetScalarType<T[P], AggregatePlaylist_track[P]>
  }




  export type playlist_trackGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: playlist_trackWhereInput
    orderBy?: playlist_trackOrderByWithAggregationInput | playlist_trackOrderByWithAggregationInput[]
    by: Playlist_trackScalarFieldEnum[] | Playlist_trackScalarFieldEnum
    having?: playlist_trackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Playlist_trackCountAggregateInputType | true
    _avg?: Playlist_trackAvgAggregateInputType
    _sum?: Playlist_trackSumAggregateInputType
    _min?: Playlist_trackMinAggregateInputType
    _max?: Playlist_trackMaxAggregateInputType
  }

  export type Playlist_trackGroupByOutputType = {
    playlist_id: number
    track_id: number
    _count: Playlist_trackCountAggregateOutputType | null
    _avg: Playlist_trackAvgAggregateOutputType | null
    _sum: Playlist_trackSumAggregateOutputType | null
    _min: Playlist_trackMinAggregateOutputType | null
    _max: Playlist_trackMaxAggregateOutputType | null
  }

  type GetPlaylist_trackGroupByPayload<T extends playlist_trackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Playlist_trackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Playlist_trackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Playlist_trackGroupByOutputType[P]>
            : GetScalarType<T[P], Playlist_trackGroupByOutputType[P]>
        }
      >
    >


  export type playlist_trackSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    playlist_id?: boolean
    track_id?: boolean
    playlist?: boolean | playlistDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist_track"]>

  export type playlist_trackSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    playlist_id?: boolean
    track_id?: boolean
    playlist?: boolean | playlistDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist_track"]>

  export type playlist_trackSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    playlist_id?: boolean
    track_id?: boolean
    playlist?: boolean | playlistDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist_track"]>

  export type playlist_trackSelectScalar = {
    playlist_id?: boolean
    track_id?: boolean
  }

  export type playlist_trackOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"playlist_id" | "track_id", ExtArgs["result"]["playlist_track"]>
  export type playlist_trackInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    playlist?: boolean | playlistDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }
  export type playlist_trackIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    playlist?: boolean | playlistDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }
  export type playlist_trackIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    playlist?: boolean | playlistDefaultArgs<ExtArgs>
    track?: boolean | trackDefaultArgs<ExtArgs>
  }

  export type $playlist_trackPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "playlist_track"
    objects: {
      playlist: Prisma.$playlistPayload<ExtArgs>
      track: Prisma.$trackPayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      playlist_id: number
      track_id: number
    }, ExtArgs["result"]["playlist_track"]>
    composites: {}
  }

  export type playlist_trackGetPayload<S extends boolean | null | undefined | playlist_trackDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload, S>

  export type playlist_trackCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<playlist_trackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Playlist_trackCountAggregateInputType | true
    }

  export interface playlist_trackDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['playlist_track'], meta: { name: 'playlist_track' } }
    /**
     * Find zero or one Playlist_track that matches the filter.
     * @param {playlist_trackFindUniqueArgs} args - Arguments to find a Playlist_track
     * @example
     * // Get one Playlist_track
     * const playlist_track = await prisma.playlist_track.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends playlist_trackFindUniqueArgs>(args: SelectSubset<T, playlist_trackFindUniqueArgs<ExtArgs>>): Prisma__playlist_trackClient<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playlist_track that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {playlist_trackFindUniqueOrThrowArgs} args - Arguments to find a Playlist_track
     * @example
     * // Get one Playlist_track
     * const playlist_track = await prisma.playlist_track.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends playlist_trackFindUniqueOrThrowArgs>(args: SelectSubset<T, playlist_trackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__playlist_trackClient<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist_track that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_trackFindFirstArgs} args - Arguments to find a Playlist_track
     * @example
     * // Get one Playlist_track
     * const playlist_track = await prisma.playlist_track.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends playlist_trackFindFirstArgs>(args?: SelectSubset<T, playlist_trackFindFirstArgs<ExtArgs>>): Prisma__playlist_trackClient<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist_track that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_trackFindFirstOrThrowArgs} args - Arguments to find a Playlist_track
     * @example
     * // Get one Playlist_track
     * const playlist_track = await prisma.playlist_track.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends playlist_trackFindFirstOrThrowArgs>(args?: SelectSubset<T, playlist_trackFindFirstOrThrowArgs<ExtArgs>>): Prisma__playlist_trackClient<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playlist_tracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_trackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playlist_tracks
     * const playlist_tracks = await prisma.playlist_track.findMany()
     * 
     * // Get first 10 Playlist_tracks
     * const playlist_tracks = await prisma.playlist_track.findMany({ take: 10 })
     * 
     * // Only select the `playlist_id`
     * const playlist_trackWithPlaylist_idOnly = await prisma.playlist_track.findMany({ select: { playlist_id: true } })
     * 
     */
    findMany<T extends playlist_trackFindManyArgs>(args?: SelectSubset<T, playlist_trackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playlist_track.
     * @param {playlist_trackCreateArgs} args - Arguments to create a Playlist_track.
     * @example
     * // Create one Playlist_track
     * const Playlist_track = await prisma.playlist_track.create({
     *   data: {
     *     // ... data to create a Playlist_track
     *   }
     * })
     * 
     */
    create<T extends playlist_trackCreateArgs>(args: SelectSubset<T, playlist_trackCreateArgs<ExtArgs>>): Prisma__playlist_trackClient<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playlist_tracks.
     * @param {playlist_trackCreateManyArgs} args - Arguments to create many Playlist_tracks.
     * @example
     * // Create many Playlist_tracks
     * const playlist_track = await prisma.playlist_track.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends playlist_trackCreateManyArgs>(args?: SelectSubset<T, playlist_trackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Playlist_tracks and returns the data saved in the database.
     * @param {playlist_trackCreateManyAndReturnArgs} args - Arguments to create many Playlist_tracks.
     * @example
     * // Create many Playlist_tracks
     * const playlist_track = await prisma.playlist_track.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Playlist_tracks and only return the `playlist_id`
     * const playlist_trackWithPlaylist_idOnly = await prisma.playlist_track.createManyAndReturn({
     *   select: { playlist_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends playlist_trackCreateManyAndReturnArgs>(args?: SelectSubset<T, playlist_trackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Playlist_track.
     * @param {playlist_trackDeleteArgs} args - Arguments to delete one Playlist_track.
     * @example
     * // Delete one Playlist_track
     * const Playlist_track = await prisma.playlist_track.delete({
     *   where: {
     *     // ... filter to delete one Playlist_track
     *   }
     * })
     * 
     */
    delete<T extends playlist_trackDeleteArgs>(args: SelectSubset<T, playlist_trackDeleteArgs<ExtArgs>>): Prisma__playlist_trackClient<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playlist_track.
     * @param {playlist_trackUpdateArgs} args - Arguments to update one Playlist_track.
     * @example
     * // Update one Playlist_track
     * const playlist_track = await prisma.playlist_track.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends playlist_trackUpdateArgs>(args: SelectSubset<T, playlist_trackUpdateArgs<ExtArgs>>): Prisma__playlist_trackClient<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playlist_tracks.
     * @param {playlist_trackDeleteManyArgs} args - Arguments to filter Playlist_tracks to delete.
     * @example
     * // Delete a few Playlist_tracks
     * const { count } = await prisma.playlist_track.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends playlist_trackDeleteManyArgs>(args?: SelectSubset<T, playlist_trackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlist_tracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_trackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playlist_tracks
     * const playlist_track = await prisma.playlist_track.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends playlist_trackUpdateManyArgs>(args: SelectSubset<T, playlist_trackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlist_tracks and returns the data updated in the database.
     * @param {playlist_trackUpdateManyAndReturnArgs} args - Arguments to update many Playlist_tracks.
     * @example
     * // Update many Playlist_tracks
     * const playlist_track = await prisma.playlist_track.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Playlist_tracks and only return the `playlist_id`
     * const playlist_trackWithPlaylist_idOnly = await prisma.playlist_track.updateManyAndReturn({
     *   select: { playlist_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends playlist_trackUpdateManyAndReturnArgs>(args: SelectSubset<T, playlist_trackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Playlist_track.
     * @param {playlist_trackUpsertArgs} args - Arguments to update or create a Playlist_track.
     * @example
     * // Update or create a Playlist_track
     * const playlist_track = await prisma.playlist_track.upsert({
     *   create: {
     *     // ... data to create a Playlist_track
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playlist_track we want to update
     *   }
     * })
     */
    upsert<T extends playlist_trackUpsertArgs>(args: SelectSubset<T, playlist_trackUpsertArgs<ExtArgs>>): Prisma__playlist_trackClient<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playlist_tracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_trackCountArgs} args - Arguments to filter Playlist_tracks to count.
     * @example
     * // Count the number of Playlist_tracks
     * const count = await prisma.playlist_track.count({
     *   where: {
     *     // ... the filter for the Playlist_tracks we want to count
     *   }
     * })
    **/
    count<T extends playlist_trackCountArgs>(
      args?: Subset<T, playlist_trackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Playlist_trackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playlist_track.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Playlist_trackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Playlist_trackAggregateArgs>(args: Subset<T, Playlist_trackAggregateArgs>): Prisma.PrismaPromise<GetPlaylist_trackAggregateType<T>>

    /**
     * Group by Playlist_track.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_trackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends playlist_trackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: playlist_trackGroupByArgs['orderBy'] }
        : { orderBy?: playlist_trackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, playlist_trackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylist_trackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the playlist_track model
   */
  readonly fields: playlist_trackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for playlist_track.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__playlist_trackClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlist<T extends playlistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, playlistDefaultArgs<ExtArgs>>): Prisma__playlistClient<runtime.Types.Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    track<T extends trackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, trackDefaultArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the playlist_track model
   */
  export interface playlist_trackFieldRefs {
    readonly playlist_id: FieldRef<"playlist_track", 'Int'>
    readonly track_id: FieldRef<"playlist_track", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * playlist_track findUnique
   */
  export type playlist_trackFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * Filter, which playlist_track to fetch.
     */
    where: playlist_trackWhereUniqueInput
  }

  /**
   * playlist_track findUniqueOrThrow
   */
  export type playlist_trackFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * Filter, which playlist_track to fetch.
     */
    where: playlist_trackWhereUniqueInput
  }

  /**
   * playlist_track findFirst
   */
  export type playlist_trackFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * Filter, which playlist_track to fetch.
     */
    where?: playlist_trackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlist_tracks to fetch.
     */
    orderBy?: playlist_trackOrderByWithRelationInput | playlist_trackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playlist_tracks.
     */
    cursor?: playlist_trackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlist_tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlist_tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playlist_tracks.
     */
    distinct?: Playlist_trackScalarFieldEnum | Playlist_trackScalarFieldEnum[]
  }

  /**
   * playlist_track findFirstOrThrow
   */
  export type playlist_trackFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * Filter, which playlist_track to fetch.
     */
    where?: playlist_trackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlist_tracks to fetch.
     */
    orderBy?: playlist_trackOrderByWithRelationInput | playlist_trackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playlist_tracks.
     */
    cursor?: playlist_trackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlist_tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlist_tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playlist_tracks.
     */
    distinct?: Playlist_trackScalarFieldEnum | Playlist_trackScalarFieldEnum[]
  }

  /**
   * playlist_track findMany
   */
  export type playlist_trackFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * Filter, which playlist_tracks to fetch.
     */
    where?: playlist_trackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlist_tracks to fetch.
     */
    orderBy?: playlist_trackOrderByWithRelationInput | playlist_trackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing playlist_tracks.
     */
    cursor?: playlist_trackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlist_tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlist_tracks.
     */
    skip?: number
    distinct?: Playlist_trackScalarFieldEnum | Playlist_trackScalarFieldEnum[]
  }

  /**
   * playlist_track create
   */
  export type playlist_trackCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * The data needed to create a playlist_track.
     */
    data: XOR<playlist_trackCreateInput, playlist_trackUncheckedCreateInput>
  }

  /**
   * playlist_track createMany
   */
  export type playlist_trackCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many playlist_tracks.
     */
    data: playlist_trackCreateManyInput | playlist_trackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * playlist_track createManyAndReturn
   */
  export type playlist_trackCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * The data used to create many playlist_tracks.
     */
    data: playlist_trackCreateManyInput | playlist_trackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * playlist_track update
   */
  export type playlist_trackUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * The data needed to update a playlist_track.
     */
    data: XOR<playlist_trackUpdateInput, playlist_trackUncheckedUpdateInput>
    /**
     * Choose, which playlist_track to update.
     */
    where: playlist_trackWhereUniqueInput
  }

  /**
   * playlist_track updateMany
   */
  export type playlist_trackUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update playlist_tracks.
     */
    data: XOR<playlist_trackUpdateManyMutationInput, playlist_trackUncheckedUpdateManyInput>
    /**
     * Filter which playlist_tracks to update
     */
    where?: playlist_trackWhereInput
    /**
     * Limit how many playlist_tracks to update.
     */
    limit?: number
  }

  /**
   * playlist_track updateManyAndReturn
   */
  export type playlist_trackUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * The data used to update playlist_tracks.
     */
    data: XOR<playlist_trackUpdateManyMutationInput, playlist_trackUncheckedUpdateManyInput>
    /**
     * Filter which playlist_tracks to update
     */
    where?: playlist_trackWhereInput
    /**
     * Limit how many playlist_tracks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * playlist_track upsert
   */
  export type playlist_trackUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * The filter to search for the playlist_track to update in case it exists.
     */
    where: playlist_trackWhereUniqueInput
    /**
     * In case the playlist_track found by the `where` argument doesn't exist, create a new playlist_track with this data.
     */
    create: XOR<playlist_trackCreateInput, playlist_trackUncheckedCreateInput>
    /**
     * In case the playlist_track was found with the provided `where` argument, update it with this data.
     */
    update: XOR<playlist_trackUpdateInput, playlist_trackUncheckedUpdateInput>
  }

  /**
   * playlist_track delete
   */
  export type playlist_trackDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    /**
     * Filter which playlist_track to delete.
     */
    where: playlist_trackWhereUniqueInput
  }

  /**
   * playlist_track deleteMany
   */
  export type playlist_trackDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which playlist_tracks to delete
     */
    where?: playlist_trackWhereInput
    /**
     * Limit how many playlist_tracks to delete.
     */
    limit?: number
  }

  /**
   * playlist_track without action
   */
  export type playlist_trackDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
  }


  /**
   * Model track
   */

  export type AggregateTrack = {
    _count: TrackCountAggregateOutputType | null
    _avg: TrackAvgAggregateOutputType | null
    _sum: TrackSumAggregateOutputType | null
    _min: TrackMinAggregateOutputType | null
    _max: TrackMaxAggregateOutputType | null
  }

  export type TrackAvgAggregateOutputType = {
    track_id: number | null
    album_id: number | null
    media_type_id: number | null
    genre_id: number | null
    milliseconds: number | null
    bytes: number | null
    unit_price: Decimal | null
  }

  export type TrackSumAggregateOutputType = {
    track_id: number | null
    album_id: number | null
    media_type_id: number | null
    genre_id: number | null
    milliseconds: number | null
    bytes: number | null
    unit_price: Decimal | null
  }

  export type TrackMinAggregateOutputType = {
    track_id: number | null
    name: string | null
    album_id: number | null
    media_type_id: number | null
    genre_id: number | null
    composer: string | null
    milliseconds: number | null
    bytes: number | null
    unit_price: Decimal | null
  }

  export type TrackMaxAggregateOutputType = {
    track_id: number | null
    name: string | null
    album_id: number | null
    media_type_id: number | null
    genre_id: number | null
    composer: string | null
    milliseconds: number | null
    bytes: number | null
    unit_price: Decimal | null
  }

  export type TrackCountAggregateOutputType = {
    track_id: number
    name: number
    album_id: number
    media_type_id: number
    genre_id: number
    composer: number
    milliseconds: number
    bytes: number
    unit_price: number
    _all: number
  }


  export type TrackAvgAggregateInputType = {
    track_id?: true
    album_id?: true
    media_type_id?: true
    genre_id?: true
    milliseconds?: true
    bytes?: true
    unit_price?: true
  }

  export type TrackSumAggregateInputType = {
    track_id?: true
    album_id?: true
    media_type_id?: true
    genre_id?: true
    milliseconds?: true
    bytes?: true
    unit_price?: true
  }

  export type TrackMinAggregateInputType = {
    track_id?: true
    name?: true
    album_id?: true
    media_type_id?: true
    genre_id?: true
    composer?: true
    milliseconds?: true
    bytes?: true
    unit_price?: true
  }

  export type TrackMaxAggregateInputType = {
    track_id?: true
    name?: true
    album_id?: true
    media_type_id?: true
    genre_id?: true
    composer?: true
    milliseconds?: true
    bytes?: true
    unit_price?: true
  }

  export type TrackCountAggregateInputType = {
    track_id?: true
    name?: true
    album_id?: true
    media_type_id?: true
    genre_id?: true
    composer?: true
    milliseconds?: true
    bytes?: true
    unit_price?: true
    _all?: true
  }

  export type TrackAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which track to aggregate.
     */
    where?: trackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tracks to fetch.
     */
    orderBy?: trackOrderByWithRelationInput | trackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: trackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tracks
    **/
    _count?: true | TrackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackMaxAggregateInputType
  }

  export type GetTrackAggregateType<T extends TrackAggregateArgs> = {
        [P in keyof T & keyof AggregateTrack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrack[P]>
      : GetScalarType<T[P], AggregateTrack[P]>
  }




  export type trackGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: trackWhereInput
    orderBy?: trackOrderByWithAggregationInput | trackOrderByWithAggregationInput[]
    by: TrackScalarFieldEnum[] | TrackScalarFieldEnum
    having?: trackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackCountAggregateInputType | true
    _avg?: TrackAvgAggregateInputType
    _sum?: TrackSumAggregateInputType
    _min?: TrackMinAggregateInputType
    _max?: TrackMaxAggregateInputType
  }

  export type TrackGroupByOutputType = {
    track_id: number
    name: string
    album_id: number | null
    media_type_id: number
    genre_id: number | null
    composer: string | null
    milliseconds: number
    bytes: number | null
    unit_price: Decimal
    _count: TrackCountAggregateOutputType | null
    _avg: TrackAvgAggregateOutputType | null
    _sum: TrackSumAggregateOutputType | null
    _min: TrackMinAggregateOutputType | null
    _max: TrackMaxAggregateOutputType | null
  }

  type GetTrackGroupByPayload<T extends trackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackGroupByOutputType[P]>
            : GetScalarType<T[P], TrackGroupByOutputType[P]>
        }
      >
    >


  export type trackSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    track_id?: boolean
    name?: boolean
    album_id?: boolean
    media_type_id?: boolean
    genre_id?: boolean
    composer?: boolean
    milliseconds?: boolean
    bytes?: boolean
    unit_price?: boolean
    invoice_line?: boolean | track$invoice_lineArgs<ExtArgs>
    playlist_track?: boolean | track$playlist_trackArgs<ExtArgs>
    album?: boolean | track$albumArgs<ExtArgs>
    genre?: boolean | track$genreArgs<ExtArgs>
    media_type?: boolean | media_typeDefaultArgs<ExtArgs>
    _count?: boolean | TrackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["track"]>

  export type trackSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    track_id?: boolean
    name?: boolean
    album_id?: boolean
    media_type_id?: boolean
    genre_id?: boolean
    composer?: boolean
    milliseconds?: boolean
    bytes?: boolean
    unit_price?: boolean
    album?: boolean | track$albumArgs<ExtArgs>
    genre?: boolean | track$genreArgs<ExtArgs>
    media_type?: boolean | media_typeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["track"]>

  export type trackSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    track_id?: boolean
    name?: boolean
    album_id?: boolean
    media_type_id?: boolean
    genre_id?: boolean
    composer?: boolean
    milliseconds?: boolean
    bytes?: boolean
    unit_price?: boolean
    album?: boolean | track$albumArgs<ExtArgs>
    genre?: boolean | track$genreArgs<ExtArgs>
    media_type?: boolean | media_typeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["track"]>

  export type trackSelectScalar = {
    track_id?: boolean
    name?: boolean
    album_id?: boolean
    media_type_id?: boolean
    genre_id?: boolean
    composer?: boolean
    milliseconds?: boolean
    bytes?: boolean
    unit_price?: boolean
  }

  export type trackOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"track_id" | "name" | "album_id" | "media_type_id" | "genre_id" | "composer" | "milliseconds" | "bytes" | "unit_price", ExtArgs["result"]["track"]>
  export type trackInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice_line?: boolean | track$invoice_lineArgs<ExtArgs>
    playlist_track?: boolean | track$playlist_trackArgs<ExtArgs>
    album?: boolean | track$albumArgs<ExtArgs>
    genre?: boolean | track$genreArgs<ExtArgs>
    media_type?: boolean | media_typeDefaultArgs<ExtArgs>
    _count?: boolean | TrackCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type trackIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    album?: boolean | track$albumArgs<ExtArgs>
    genre?: boolean | track$genreArgs<ExtArgs>
    media_type?: boolean | media_typeDefaultArgs<ExtArgs>
  }
  export type trackIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    album?: boolean | track$albumArgs<ExtArgs>
    genre?: boolean | track$genreArgs<ExtArgs>
    media_type?: boolean | media_typeDefaultArgs<ExtArgs>
  }

  export type $trackPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "track"
    objects: {
      invoice_line: Prisma.$invoice_linePayload<ExtArgs>[]
      playlist_track: Prisma.$playlist_trackPayload<ExtArgs>[]
      album: Prisma.$albumPayload<ExtArgs> | null
      genre: Prisma.$genrePayload<ExtArgs> | null
      media_type: Prisma.$media_typePayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      track_id: number
      name: string
      album_id: number | null
      media_type_id: number
      genre_id: number | null
      composer: string | null
      milliseconds: number
      bytes: number | null
      unit_price: Prisma.Decimal
    }, ExtArgs["result"]["track"]>
    composites: {}
  }

  export type trackGetPayload<S extends boolean | null | undefined | trackDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$trackPayload, S>

  export type trackCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<trackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackCountAggregateInputType | true
    }

  export interface trackDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['track'], meta: { name: 'track' } }
    /**
     * Find zero or one Track that matches the filter.
     * @param {trackFindUniqueArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends trackFindUniqueArgs>(args: SelectSubset<T, trackFindUniqueArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Track that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {trackFindUniqueOrThrowArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends trackFindUniqueOrThrowArgs>(args: SelectSubset<T, trackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Track that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trackFindFirstArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends trackFindFirstArgs>(args?: SelectSubset<T, trackFindFirstArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Track that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trackFindFirstOrThrowArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends trackFindFirstOrThrowArgs>(args?: SelectSubset<T, trackFindFirstOrThrowArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tracks
     * const tracks = await prisma.track.findMany()
     * 
     * // Get first 10 Tracks
     * const tracks = await prisma.track.findMany({ take: 10 })
     * 
     * // Only select the `track_id`
     * const trackWithTrack_idOnly = await prisma.track.findMany({ select: { track_id: true } })
     * 
     */
    findMany<T extends trackFindManyArgs>(args?: SelectSubset<T, trackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Track.
     * @param {trackCreateArgs} args - Arguments to create a Track.
     * @example
     * // Create one Track
     * const Track = await prisma.track.create({
     *   data: {
     *     // ... data to create a Track
     *   }
     * })
     * 
     */
    create<T extends trackCreateArgs>(args: SelectSubset<T, trackCreateArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tracks.
     * @param {trackCreateManyArgs} args - Arguments to create many Tracks.
     * @example
     * // Create many Tracks
     * const track = await prisma.track.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends trackCreateManyArgs>(args?: SelectSubset<T, trackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tracks and returns the data saved in the database.
     * @param {trackCreateManyAndReturnArgs} args - Arguments to create many Tracks.
     * @example
     * // Create many Tracks
     * const track = await prisma.track.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tracks and only return the `track_id`
     * const trackWithTrack_idOnly = await prisma.track.createManyAndReturn({
     *   select: { track_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends trackCreateManyAndReturnArgs>(args?: SelectSubset<T, trackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Track.
     * @param {trackDeleteArgs} args - Arguments to delete one Track.
     * @example
     * // Delete one Track
     * const Track = await prisma.track.delete({
     *   where: {
     *     // ... filter to delete one Track
     *   }
     * })
     * 
     */
    delete<T extends trackDeleteArgs>(args: SelectSubset<T, trackDeleteArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Track.
     * @param {trackUpdateArgs} args - Arguments to update one Track.
     * @example
     * // Update one Track
     * const track = await prisma.track.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends trackUpdateArgs>(args: SelectSubset<T, trackUpdateArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tracks.
     * @param {trackDeleteManyArgs} args - Arguments to filter Tracks to delete.
     * @example
     * // Delete a few Tracks
     * const { count } = await prisma.track.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends trackDeleteManyArgs>(args?: SelectSubset<T, trackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tracks
     * const track = await prisma.track.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends trackUpdateManyArgs>(args: SelectSubset<T, trackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tracks and returns the data updated in the database.
     * @param {trackUpdateManyAndReturnArgs} args - Arguments to update many Tracks.
     * @example
     * // Update many Tracks
     * const track = await prisma.track.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tracks and only return the `track_id`
     * const trackWithTrack_idOnly = await prisma.track.updateManyAndReturn({
     *   select: { track_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends trackUpdateManyAndReturnArgs>(args: SelectSubset<T, trackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Track.
     * @param {trackUpsertArgs} args - Arguments to update or create a Track.
     * @example
     * // Update or create a Track
     * const track = await prisma.track.upsert({
     *   create: {
     *     // ... data to create a Track
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Track we want to update
     *   }
     * })
     */
    upsert<T extends trackUpsertArgs>(args: SelectSubset<T, trackUpsertArgs<ExtArgs>>): Prisma__trackClient<runtime.Types.Result.GetResult<Prisma.$trackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trackCountArgs} args - Arguments to filter Tracks to count.
     * @example
     * // Count the number of Tracks
     * const count = await prisma.track.count({
     *   where: {
     *     // ... the filter for the Tracks we want to count
     *   }
     * })
    **/
    count<T extends trackCountArgs>(
      args?: Subset<T, trackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Track.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrackAggregateArgs>(args: Subset<T, TrackAggregateArgs>): Prisma.PrismaPromise<GetTrackAggregateType<T>>

    /**
     * Group by Track.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends trackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: trackGroupByArgs['orderBy'] }
        : { orderBy?: trackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, trackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the track model
   */
  readonly fields: trackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for track.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__trackClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoice_line<T extends track$invoice_lineArgs<ExtArgs> = {}>(args?: Subset<T, track$invoice_lineArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$invoice_linePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playlist_track<T extends track$playlist_trackArgs<ExtArgs> = {}>(args?: Subset<T, track$playlist_trackArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$playlist_trackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    album<T extends track$albumArgs<ExtArgs> = {}>(args?: Subset<T, track$albumArgs<ExtArgs>>): Prisma__albumClient<runtime.Types.Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    genre<T extends track$genreArgs<ExtArgs> = {}>(args?: Subset<T, track$genreArgs<ExtArgs>>): Prisma__genreClient<runtime.Types.Result.GetResult<Prisma.$genrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    media_type<T extends media_typeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, media_typeDefaultArgs<ExtArgs>>): Prisma__media_typeClient<runtime.Types.Result.GetResult<Prisma.$media_typePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the track model
   */
  export interface trackFieldRefs {
    readonly track_id: FieldRef<"track", 'Int'>
    readonly name: FieldRef<"track", 'String'>
    readonly album_id: FieldRef<"track", 'Int'>
    readonly media_type_id: FieldRef<"track", 'Int'>
    readonly genre_id: FieldRef<"track", 'Int'>
    readonly composer: FieldRef<"track", 'String'>
    readonly milliseconds: FieldRef<"track", 'Int'>
    readonly bytes: FieldRef<"track", 'Int'>
    readonly unit_price: FieldRef<"track", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * track findUnique
   */
  export type trackFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * Filter, which track to fetch.
     */
    where: trackWhereUniqueInput
  }

  /**
   * track findUniqueOrThrow
   */
  export type trackFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * Filter, which track to fetch.
     */
    where: trackWhereUniqueInput
  }

  /**
   * track findFirst
   */
  export type trackFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * Filter, which track to fetch.
     */
    where?: trackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tracks to fetch.
     */
    orderBy?: trackOrderByWithRelationInput | trackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tracks.
     */
    cursor?: trackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tracks.
     */
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * track findFirstOrThrow
   */
  export type trackFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * Filter, which track to fetch.
     */
    where?: trackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tracks to fetch.
     */
    orderBy?: trackOrderByWithRelationInput | trackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tracks.
     */
    cursor?: trackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tracks.
     */
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * track findMany
   */
  export type trackFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * Filter, which tracks to fetch.
     */
    where?: trackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tracks to fetch.
     */
    orderBy?: trackOrderByWithRelationInput | trackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tracks.
     */
    cursor?: trackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tracks.
     */
    skip?: number
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * track create
   */
  export type trackCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * The data needed to create a track.
     */
    data: XOR<trackCreateInput, trackUncheckedCreateInput>
  }

  /**
   * track createMany
   */
  export type trackCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many tracks.
     */
    data: trackCreateManyInput | trackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * track createManyAndReturn
   */
  export type trackCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * The data used to create many tracks.
     */
    data: trackCreateManyInput | trackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * track update
   */
  export type trackUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * The data needed to update a track.
     */
    data: XOR<trackUpdateInput, trackUncheckedUpdateInput>
    /**
     * Choose, which track to update.
     */
    where: trackWhereUniqueInput
  }

  /**
   * track updateMany
   */
  export type trackUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update tracks.
     */
    data: XOR<trackUpdateManyMutationInput, trackUncheckedUpdateManyInput>
    /**
     * Filter which tracks to update
     */
    where?: trackWhereInput
    /**
     * Limit how many tracks to update.
     */
    limit?: number
  }

  /**
   * track updateManyAndReturn
   */
  export type trackUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * The data used to update tracks.
     */
    data: XOR<trackUpdateManyMutationInput, trackUncheckedUpdateManyInput>
    /**
     * Filter which tracks to update
     */
    where?: trackWhereInput
    /**
     * Limit how many tracks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * track upsert
   */
  export type trackUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * The filter to search for the track to update in case it exists.
     */
    where: trackWhereUniqueInput
    /**
     * In case the track found by the `where` argument doesn't exist, create a new track with this data.
     */
    create: XOR<trackCreateInput, trackUncheckedCreateInput>
    /**
     * In case the track was found with the provided `where` argument, update it with this data.
     */
    update: XOR<trackUpdateInput, trackUncheckedUpdateInput>
  }

  /**
   * track delete
   */
  export type trackDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
    /**
     * Filter which track to delete.
     */
    where: trackWhereUniqueInput
  }

  /**
   * track deleteMany
   */
  export type trackDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which tracks to delete
     */
    where?: trackWhereInput
    /**
     * Limit how many tracks to delete.
     */
    limit?: number
  }

  /**
   * track.invoice_line
   */
  export type track$invoice_lineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invoice_line
     */
    select?: invoice_lineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invoice_line
     */
    omit?: invoice_lineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invoice_lineInclude<ExtArgs> | null
    where?: invoice_lineWhereInput
    orderBy?: invoice_lineOrderByWithRelationInput | invoice_lineOrderByWithRelationInput[]
    cursor?: invoice_lineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Invoice_lineScalarFieldEnum | Invoice_lineScalarFieldEnum[]
  }

  /**
   * track.playlist_track
   */
  export type track$playlist_trackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_track
     */
    select?: playlist_trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_track
     */
    omit?: playlist_trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_trackInclude<ExtArgs> | null
    where?: playlist_trackWhereInput
    orderBy?: playlist_trackOrderByWithRelationInput | playlist_trackOrderByWithRelationInput[]
    cursor?: playlist_trackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Playlist_trackScalarFieldEnum | Playlist_trackScalarFieldEnum[]
  }

  /**
   * track.album
   */
  export type track$albumArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    where?: albumWhereInput
  }

  /**
   * track.genre
   */
  export type track$genreArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the genre
     */
    select?: genreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the genre
     */
    omit?: genreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: genreInclude<ExtArgs> | null
    where?: genreWhereInput
  }

  /**
   * track without action
   */
  export type trackDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the track
     */
    select?: trackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the track
     */
    omit?: trackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trackInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  } as const)

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AlbumScalarFieldEnum = {
    album_id: 'album_id',
    title: 'title',
    artist_id: 'artist_id'
  } as const

  export type AlbumScalarFieldEnum = (typeof AlbumScalarFieldEnum)[keyof typeof AlbumScalarFieldEnum]


  export const ArtistScalarFieldEnum = {
    artist_id: 'artist_id',
    name: 'name'
  } as const

  export type ArtistScalarFieldEnum = (typeof ArtistScalarFieldEnum)[keyof typeof ArtistScalarFieldEnum]


  export const CustomerScalarFieldEnum = {
    customer_id: 'customer_id',
    first_name: 'first_name',
    last_name: 'last_name',
    company: 'company',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    postal_code: 'postal_code',
    phone: 'phone',
    fax: 'fax',
    email: 'email',
    support_rep_id: 'support_rep_id'
  } as const

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const EmployeeScalarFieldEnum = {
    employee_id: 'employee_id',
    last_name: 'last_name',
    first_name: 'first_name',
    title: 'title',
    reports_to: 'reports_to',
    birth_date: 'birth_date',
    hire_date: 'hire_date',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    postal_code: 'postal_code',
    phone: 'phone',
    fax: 'fax',
    email: 'email'
  } as const

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const GenreScalarFieldEnum = {
    genre_id: 'genre_id',
    name: 'name'
  } as const

  export type GenreScalarFieldEnum = (typeof GenreScalarFieldEnum)[keyof typeof GenreScalarFieldEnum]


  export const InvoiceScalarFieldEnum = {
    invoice_id: 'invoice_id',
    customer_id: 'customer_id',
    invoice_date: 'invoice_date',
    billing_address: 'billing_address',
    billing_city: 'billing_city',
    billing_state: 'billing_state',
    billing_country: 'billing_country',
    billing_postal_code: 'billing_postal_code',
    total: 'total'
  } as const

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const Invoice_lineScalarFieldEnum = {
    invoice_line_id: 'invoice_line_id',
    invoice_id: 'invoice_id',
    track_id: 'track_id',
    unit_price: 'unit_price',
    quantity: 'quantity'
  } as const

  export type Invoice_lineScalarFieldEnum = (typeof Invoice_lineScalarFieldEnum)[keyof typeof Invoice_lineScalarFieldEnum]


  export const Media_typeScalarFieldEnum = {
    media_type_id: 'media_type_id',
    name: 'name'
  } as const

  export type Media_typeScalarFieldEnum = (typeof Media_typeScalarFieldEnum)[keyof typeof Media_typeScalarFieldEnum]


  export const PlaylistScalarFieldEnum = {
    playlist_id: 'playlist_id',
    name: 'name'
  } as const

  export type PlaylistScalarFieldEnum = (typeof PlaylistScalarFieldEnum)[keyof typeof PlaylistScalarFieldEnum]


  export const Playlist_trackScalarFieldEnum = {
    playlist_id: 'playlist_id',
    track_id: 'track_id'
  } as const

  export type Playlist_trackScalarFieldEnum = (typeof Playlist_trackScalarFieldEnum)[keyof typeof Playlist_trackScalarFieldEnum]


  export const TrackScalarFieldEnum = {
    track_id: 'track_id',
    name: 'name',
    album_id: 'album_id',
    media_type_id: 'media_type_id',
    genre_id: 'genre_id',
    composer: 'composer',
    milliseconds: 'milliseconds',
    bytes: 'bytes',
    unit_price: 'unit_price'
  } as const

  export type TrackScalarFieldEnum = (typeof TrackScalarFieldEnum)[keyof typeof TrackScalarFieldEnum]


  export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
  } as const

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
  } as const

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder = {
    first: 'first',
    last: 'last'
  } as const

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type albumWhereInput = {
    AND?: albumWhereInput | albumWhereInput[]
    OR?: albumWhereInput[]
    NOT?: albumWhereInput | albumWhereInput[]
    album_id?: IntFilter<"album"> | number
    title?: StringFilter<"album"> | string
    artist_id?: IntFilter<"album"> | number
    artist?: XOR<ArtistScalarRelationFilter, artistWhereInput>
    track?: TrackListRelationFilter
  }

  export type albumOrderByWithRelationInput = {
    album_id?: SortOrder
    title?: SortOrder
    artist_id?: SortOrder
    artist?: artistOrderByWithRelationInput
    track?: trackOrderByRelationAggregateInput
  }

  export type albumWhereUniqueInput = Prisma.AtLeast<{
    album_id?: number
    AND?: albumWhereInput | albumWhereInput[]
    OR?: albumWhereInput[]
    NOT?: albumWhereInput | albumWhereInput[]
    title?: StringFilter<"album"> | string
    artist_id?: IntFilter<"album"> | number
    artist?: XOR<ArtistScalarRelationFilter, artistWhereInput>
    track?: TrackListRelationFilter
  }, "album_id">

  export type albumOrderByWithAggregationInput = {
    album_id?: SortOrder
    title?: SortOrder
    artist_id?: SortOrder
    _count?: albumCountOrderByAggregateInput
    _avg?: albumAvgOrderByAggregateInput
    _max?: albumMaxOrderByAggregateInput
    _min?: albumMinOrderByAggregateInput
    _sum?: albumSumOrderByAggregateInput
  }

  export type albumScalarWhereWithAggregatesInput = {
    AND?: albumScalarWhereWithAggregatesInput | albumScalarWhereWithAggregatesInput[]
    OR?: albumScalarWhereWithAggregatesInput[]
    NOT?: albumScalarWhereWithAggregatesInput | albumScalarWhereWithAggregatesInput[]
    album_id?: IntWithAggregatesFilter<"album"> | number
    title?: StringWithAggregatesFilter<"album"> | string
    artist_id?: IntWithAggregatesFilter<"album"> | number
  }

  export type artistWhereInput = {
    AND?: artistWhereInput | artistWhereInput[]
    OR?: artistWhereInput[]
    NOT?: artistWhereInput | artistWhereInput[]
    artist_id?: IntFilter<"artist"> | number
    name?: StringNullableFilter<"artist"> | string | null
    album?: AlbumListRelationFilter
  }

  export type artistOrderByWithRelationInput = {
    artist_id?: SortOrder
    name?: SortOrderInput | SortOrder
    album?: albumOrderByRelationAggregateInput
  }

  export type artistWhereUniqueInput = Prisma.AtLeast<{
    artist_id?: number
    AND?: artistWhereInput | artistWhereInput[]
    OR?: artistWhereInput[]
    NOT?: artistWhereInput | artistWhereInput[]
    name?: StringNullableFilter<"artist"> | string | null
    album?: AlbumListRelationFilter
  }, "artist_id">

  export type artistOrderByWithAggregationInput = {
    artist_id?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: artistCountOrderByAggregateInput
    _avg?: artistAvgOrderByAggregateInput
    _max?: artistMaxOrderByAggregateInput
    _min?: artistMinOrderByAggregateInput
    _sum?: artistSumOrderByAggregateInput
  }

  export type artistScalarWhereWithAggregatesInput = {
    AND?: artistScalarWhereWithAggregatesInput | artistScalarWhereWithAggregatesInput[]
    OR?: artistScalarWhereWithAggregatesInput[]
    NOT?: artistScalarWhereWithAggregatesInput | artistScalarWhereWithAggregatesInput[]
    artist_id?: IntWithAggregatesFilter<"artist"> | number
    name?: StringNullableWithAggregatesFilter<"artist"> | string | null
  }

  export type customerWhereInput = {
    AND?: customerWhereInput | customerWhereInput[]
    OR?: customerWhereInput[]
    NOT?: customerWhereInput | customerWhereInput[]
    customer_id?: IntFilter<"customer"> | number
    first_name?: StringFilter<"customer"> | string
    last_name?: StringFilter<"customer"> | string
    company?: StringNullableFilter<"customer"> | string | null
    address?: StringNullableFilter<"customer"> | string | null
    city?: StringNullableFilter<"customer"> | string | null
    state?: StringNullableFilter<"customer"> | string | null
    country?: StringNullableFilter<"customer"> | string | null
    postal_code?: StringNullableFilter<"customer"> | string | null
    phone?: StringNullableFilter<"customer"> | string | null
    fax?: StringNullableFilter<"customer"> | string | null
    email?: StringFilter<"customer"> | string
    support_rep_id?: IntNullableFilter<"customer"> | number | null
    employee?: XOR<EmployeeNullableScalarRelationFilter, employeeWhereInput> | null
    invoice?: InvoiceListRelationFilter
  }

  export type customerOrderByWithRelationInput = {
    customer_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    company?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    postal_code?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    fax?: SortOrderInput | SortOrder
    email?: SortOrder
    support_rep_id?: SortOrderInput | SortOrder
    employee?: employeeOrderByWithRelationInput
    invoice?: invoiceOrderByRelationAggregateInput
  }

  export type customerWhereUniqueInput = Prisma.AtLeast<{
    customer_id?: number
    AND?: customerWhereInput | customerWhereInput[]
    OR?: customerWhereInput[]
    NOT?: customerWhereInput | customerWhereInput[]
    first_name?: StringFilter<"customer"> | string
    last_name?: StringFilter<"customer"> | string
    company?: StringNullableFilter<"customer"> | string | null
    address?: StringNullableFilter<"customer"> | string | null
    city?: StringNullableFilter<"customer"> | string | null
    state?: StringNullableFilter<"customer"> | string | null
    country?: StringNullableFilter<"customer"> | string | null
    postal_code?: StringNullableFilter<"customer"> | string | null
    phone?: StringNullableFilter<"customer"> | string | null
    fax?: StringNullableFilter<"customer"> | string | null
    email?: StringFilter<"customer"> | string
    support_rep_id?: IntNullableFilter<"customer"> | number | null
    employee?: XOR<EmployeeNullableScalarRelationFilter, employeeWhereInput> | null
    invoice?: InvoiceListRelationFilter
  }, "customer_id">

  export type customerOrderByWithAggregationInput = {
    customer_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    company?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    postal_code?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    fax?: SortOrderInput | SortOrder
    email?: SortOrder
    support_rep_id?: SortOrderInput | SortOrder
    _count?: customerCountOrderByAggregateInput
    _avg?: customerAvgOrderByAggregateInput
    _max?: customerMaxOrderByAggregateInput
    _min?: customerMinOrderByAggregateInput
    _sum?: customerSumOrderByAggregateInput
  }

  export type customerScalarWhereWithAggregatesInput = {
    AND?: customerScalarWhereWithAggregatesInput | customerScalarWhereWithAggregatesInput[]
    OR?: customerScalarWhereWithAggregatesInput[]
    NOT?: customerScalarWhereWithAggregatesInput | customerScalarWhereWithAggregatesInput[]
    customer_id?: IntWithAggregatesFilter<"customer"> | number
    first_name?: StringWithAggregatesFilter<"customer"> | string
    last_name?: StringWithAggregatesFilter<"customer"> | string
    company?: StringNullableWithAggregatesFilter<"customer"> | string | null
    address?: StringNullableWithAggregatesFilter<"customer"> | string | null
    city?: StringNullableWithAggregatesFilter<"customer"> | string | null
    state?: StringNullableWithAggregatesFilter<"customer"> | string | null
    country?: StringNullableWithAggregatesFilter<"customer"> | string | null
    postal_code?: StringNullableWithAggregatesFilter<"customer"> | string | null
    phone?: StringNullableWithAggregatesFilter<"customer"> | string | null
    fax?: StringNullableWithAggregatesFilter<"customer"> | string | null
    email?: StringWithAggregatesFilter<"customer"> | string
    support_rep_id?: IntNullableWithAggregatesFilter<"customer"> | number | null
  }

  export type employeeWhereInput = {
    AND?: employeeWhereInput | employeeWhereInput[]
    OR?: employeeWhereInput[]
    NOT?: employeeWhereInput | employeeWhereInput[]
    employee_id?: IntFilter<"employee"> | number
    last_name?: StringFilter<"employee"> | string
    first_name?: StringFilter<"employee"> | string
    title?: StringNullableFilter<"employee"> | string | null
    reports_to?: IntNullableFilter<"employee"> | number | null
    birth_date?: DateTimeNullableFilter<"employee"> | Date | string | null
    hire_date?: DateTimeNullableFilter<"employee"> | Date | string | null
    address?: StringNullableFilter<"employee"> | string | null
    city?: StringNullableFilter<"employee"> | string | null
    state?: StringNullableFilter<"employee"> | string | null
    country?: StringNullableFilter<"employee"> | string | null
    postal_code?: StringNullableFilter<"employee"> | string | null
    phone?: StringNullableFilter<"employee"> | string | null
    fax?: StringNullableFilter<"employee"> | string | null
    email?: StringNullableFilter<"employee"> | string | null
    customer?: CustomerListRelationFilter
    employee?: XOR<EmployeeNullableScalarRelationFilter, employeeWhereInput> | null
    other_employee?: EmployeeListRelationFilter
  }

  export type employeeOrderByWithRelationInput = {
    employee_id?: SortOrder
    last_name?: SortOrder
    first_name?: SortOrder
    title?: SortOrderInput | SortOrder
    reports_to?: SortOrderInput | SortOrder
    birth_date?: SortOrderInput | SortOrder
    hire_date?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    postal_code?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    fax?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    customer?: customerOrderByRelationAggregateInput
    employee?: employeeOrderByWithRelationInput
    other_employee?: employeeOrderByRelationAggregateInput
  }

  export type employeeWhereUniqueInput = Prisma.AtLeast<{
    employee_id?: number
    AND?: employeeWhereInput | employeeWhereInput[]
    OR?: employeeWhereInput[]
    NOT?: employeeWhereInput | employeeWhereInput[]
    last_name?: StringFilter<"employee"> | string
    first_name?: StringFilter<"employee"> | string
    title?: StringNullableFilter<"employee"> | string | null
    reports_to?: IntNullableFilter<"employee"> | number | null
    birth_date?: DateTimeNullableFilter<"employee"> | Date | string | null
    hire_date?: DateTimeNullableFilter<"employee"> | Date | string | null
    address?: StringNullableFilter<"employee"> | string | null
    city?: StringNullableFilter<"employee"> | string | null
    state?: StringNullableFilter<"employee"> | string | null
    country?: StringNullableFilter<"employee"> | string | null
    postal_code?: StringNullableFilter<"employee"> | string | null
    phone?: StringNullableFilter<"employee"> | string | null
    fax?: StringNullableFilter<"employee"> | string | null
    email?: StringNullableFilter<"employee"> | string | null
    customer?: CustomerListRelationFilter
    employee?: XOR<EmployeeNullableScalarRelationFilter, employeeWhereInput> | null
    other_employee?: EmployeeListRelationFilter
  }, "employee_id">

  export type employeeOrderByWithAggregationInput = {
    employee_id?: SortOrder
    last_name?: SortOrder
    first_name?: SortOrder
    title?: SortOrderInput | SortOrder
    reports_to?: SortOrderInput | SortOrder
    birth_date?: SortOrderInput | SortOrder
    hire_date?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    postal_code?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    fax?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    _count?: employeeCountOrderByAggregateInput
    _avg?: employeeAvgOrderByAggregateInput
    _max?: employeeMaxOrderByAggregateInput
    _min?: employeeMinOrderByAggregateInput
    _sum?: employeeSumOrderByAggregateInput
  }

  export type employeeScalarWhereWithAggregatesInput = {
    AND?: employeeScalarWhereWithAggregatesInput | employeeScalarWhereWithAggregatesInput[]
    OR?: employeeScalarWhereWithAggregatesInput[]
    NOT?: employeeScalarWhereWithAggregatesInput | employeeScalarWhereWithAggregatesInput[]
    employee_id?: IntWithAggregatesFilter<"employee"> | number
    last_name?: StringWithAggregatesFilter<"employee"> | string
    first_name?: StringWithAggregatesFilter<"employee"> | string
    title?: StringNullableWithAggregatesFilter<"employee"> | string | null
    reports_to?: IntNullableWithAggregatesFilter<"employee"> | number | null
    birth_date?: DateTimeNullableWithAggregatesFilter<"employee"> | Date | string | null
    hire_date?: DateTimeNullableWithAggregatesFilter<"employee"> | Date | string | null
    address?: StringNullableWithAggregatesFilter<"employee"> | string | null
    city?: StringNullableWithAggregatesFilter<"employee"> | string | null
    state?: StringNullableWithAggregatesFilter<"employee"> | string | null
    country?: StringNullableWithAggregatesFilter<"employee"> | string | null
    postal_code?: StringNullableWithAggregatesFilter<"employee"> | string | null
    phone?: StringNullableWithAggregatesFilter<"employee"> | string | null
    fax?: StringNullableWithAggregatesFilter<"employee"> | string | null
    email?: StringNullableWithAggregatesFilter<"employee"> | string | null
  }

  export type genreWhereInput = {
    AND?: genreWhereInput | genreWhereInput[]
    OR?: genreWhereInput[]
    NOT?: genreWhereInput | genreWhereInput[]
    genre_id?: IntFilter<"genre"> | number
    name?: StringNullableFilter<"genre"> | string | null
    track?: TrackListRelationFilter
  }

  export type genreOrderByWithRelationInput = {
    genre_id?: SortOrder
    name?: SortOrderInput | SortOrder
    track?: trackOrderByRelationAggregateInput
  }

  export type genreWhereUniqueInput = Prisma.AtLeast<{
    genre_id?: number
    AND?: genreWhereInput | genreWhereInput[]
    OR?: genreWhereInput[]
    NOT?: genreWhereInput | genreWhereInput[]
    name?: StringNullableFilter<"genre"> | string | null
    track?: TrackListRelationFilter
  }, "genre_id">

  export type genreOrderByWithAggregationInput = {
    genre_id?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: genreCountOrderByAggregateInput
    _avg?: genreAvgOrderByAggregateInput
    _max?: genreMaxOrderByAggregateInput
    _min?: genreMinOrderByAggregateInput
    _sum?: genreSumOrderByAggregateInput
  }

  export type genreScalarWhereWithAggregatesInput = {
    AND?: genreScalarWhereWithAggregatesInput | genreScalarWhereWithAggregatesInput[]
    OR?: genreScalarWhereWithAggregatesInput[]
    NOT?: genreScalarWhereWithAggregatesInput | genreScalarWhereWithAggregatesInput[]
    genre_id?: IntWithAggregatesFilter<"genre"> | number
    name?: StringNullableWithAggregatesFilter<"genre"> | string | null
  }

  export type invoiceWhereInput = {
    AND?: invoiceWhereInput | invoiceWhereInput[]
    OR?: invoiceWhereInput[]
    NOT?: invoiceWhereInput | invoiceWhereInput[]
    invoice_id?: IntFilter<"invoice"> | number
    customer_id?: IntFilter<"invoice"> | number
    invoice_date?: DateTimeFilter<"invoice"> | Date | string
    billing_address?: StringNullableFilter<"invoice"> | string | null
    billing_city?: StringNullableFilter<"invoice"> | string | null
    billing_state?: StringNullableFilter<"invoice"> | string | null
    billing_country?: StringNullableFilter<"invoice"> | string | null
    billing_postal_code?: StringNullableFilter<"invoice"> | string | null
    total?: DecimalFilter<"invoice"> | Decimal | DecimalJsLike | number | string
    customer?: XOR<CustomerScalarRelationFilter, customerWhereInput>
    invoice_line?: Invoice_lineListRelationFilter
  }

  export type invoiceOrderByWithRelationInput = {
    invoice_id?: SortOrder
    customer_id?: SortOrder
    invoice_date?: SortOrder
    billing_address?: SortOrderInput | SortOrder
    billing_city?: SortOrderInput | SortOrder
    billing_state?: SortOrderInput | SortOrder
    billing_country?: SortOrderInput | SortOrder
    billing_postal_code?: SortOrderInput | SortOrder
    total?: SortOrder
    customer?: customerOrderByWithRelationInput
    invoice_line?: invoice_lineOrderByRelationAggregateInput
  }

  export type invoiceWhereUniqueInput = Prisma.AtLeast<{
    invoice_id?: number
    AND?: invoiceWhereInput | invoiceWhereInput[]
    OR?: invoiceWhereInput[]
    NOT?: invoiceWhereInput | invoiceWhereInput[]
    customer_id?: IntFilter<"invoice"> | number
    invoice_date?: DateTimeFilter<"invoice"> | Date | string
    billing_address?: StringNullableFilter<"invoice"> | string | null
    billing_city?: StringNullableFilter<"invoice"> | string | null
    billing_state?: StringNullableFilter<"invoice"> | string | null
    billing_country?: StringNullableFilter<"invoice"> | string | null
    billing_postal_code?: StringNullableFilter<"invoice"> | string | null
    total?: DecimalFilter<"invoice"> | Decimal | DecimalJsLike | number | string
    customer?: XOR<CustomerScalarRelationFilter, customerWhereInput>
    invoice_line?: Invoice_lineListRelationFilter
  }, "invoice_id">

  export type invoiceOrderByWithAggregationInput = {
    invoice_id?: SortOrder
    customer_id?: SortOrder
    invoice_date?: SortOrder
    billing_address?: SortOrderInput | SortOrder
    billing_city?: SortOrderInput | SortOrder
    billing_state?: SortOrderInput | SortOrder
    billing_country?: SortOrderInput | SortOrder
    billing_postal_code?: SortOrderInput | SortOrder
    total?: SortOrder
    _count?: invoiceCountOrderByAggregateInput
    _avg?: invoiceAvgOrderByAggregateInput
    _max?: invoiceMaxOrderByAggregateInput
    _min?: invoiceMinOrderByAggregateInput
    _sum?: invoiceSumOrderByAggregateInput
  }

  export type invoiceScalarWhereWithAggregatesInput = {
    AND?: invoiceScalarWhereWithAggregatesInput | invoiceScalarWhereWithAggregatesInput[]
    OR?: invoiceScalarWhereWithAggregatesInput[]
    NOT?: invoiceScalarWhereWithAggregatesInput | invoiceScalarWhereWithAggregatesInput[]
    invoice_id?: IntWithAggregatesFilter<"invoice"> | number
    customer_id?: IntWithAggregatesFilter<"invoice"> | number
    invoice_date?: DateTimeWithAggregatesFilter<"invoice"> | Date | string
    billing_address?: StringNullableWithAggregatesFilter<"invoice"> | string | null
    billing_city?: StringNullableWithAggregatesFilter<"invoice"> | string | null
    billing_state?: StringNullableWithAggregatesFilter<"invoice"> | string | null
    billing_country?: StringNullableWithAggregatesFilter<"invoice"> | string | null
    billing_postal_code?: StringNullableWithAggregatesFilter<"invoice"> | string | null
    total?: DecimalWithAggregatesFilter<"invoice"> | Decimal | DecimalJsLike | number | string
  }

  export type invoice_lineWhereInput = {
    AND?: invoice_lineWhereInput | invoice_lineWhereInput[]
    OR?: invoice_lineWhereInput[]
    NOT?: invoice_lineWhereInput | invoice_lineWhereInput[]
    invoice_line_id?: IntFilter<"invoice_line"> | number
    invoice_id?: IntFilter<"invoice_line"> | number
    track_id?: IntFilter<"invoice_line"> | number
    unit_price?: DecimalFilter<"invoice_line"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"invoice_line"> | number
    invoice?: XOR<InvoiceScalarRelationFilter, invoiceWhereInput>
    track?: XOR<TrackScalarRelationFilter, trackWhereInput>
  }

  export type invoice_lineOrderByWithRelationInput = {
    invoice_line_id?: SortOrder
    invoice_id?: SortOrder
    track_id?: SortOrder
    unit_price?: SortOrder
    quantity?: SortOrder
    invoice?: invoiceOrderByWithRelationInput
    track?: trackOrderByWithRelationInput
  }

  export type invoice_lineWhereUniqueInput = Prisma.AtLeast<{
    invoice_line_id?: number
    AND?: invoice_lineWhereInput | invoice_lineWhereInput[]
    OR?: invoice_lineWhereInput[]
    NOT?: invoice_lineWhereInput | invoice_lineWhereInput[]
    invoice_id?: IntFilter<"invoice_line"> | number
    track_id?: IntFilter<"invoice_line"> | number
    unit_price?: DecimalFilter<"invoice_line"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"invoice_line"> | number
    invoice?: XOR<InvoiceScalarRelationFilter, invoiceWhereInput>
    track?: XOR<TrackScalarRelationFilter, trackWhereInput>
  }, "invoice_line_id">

  export type invoice_lineOrderByWithAggregationInput = {
    invoice_line_id?: SortOrder
    invoice_id?: SortOrder
    track_id?: SortOrder
    unit_price?: SortOrder
    quantity?: SortOrder
    _count?: invoice_lineCountOrderByAggregateInput
    _avg?: invoice_lineAvgOrderByAggregateInput
    _max?: invoice_lineMaxOrderByAggregateInput
    _min?: invoice_lineMinOrderByAggregateInput
    _sum?: invoice_lineSumOrderByAggregateInput
  }

  export type invoice_lineScalarWhereWithAggregatesInput = {
    AND?: invoice_lineScalarWhereWithAggregatesInput | invoice_lineScalarWhereWithAggregatesInput[]
    OR?: invoice_lineScalarWhereWithAggregatesInput[]
    NOT?: invoice_lineScalarWhereWithAggregatesInput | invoice_lineScalarWhereWithAggregatesInput[]
    invoice_line_id?: IntWithAggregatesFilter<"invoice_line"> | number
    invoice_id?: IntWithAggregatesFilter<"invoice_line"> | number
    track_id?: IntWithAggregatesFilter<"invoice_line"> | number
    unit_price?: DecimalWithAggregatesFilter<"invoice_line"> | Decimal | DecimalJsLike | number | string
    quantity?: IntWithAggregatesFilter<"invoice_line"> | number
  }

  export type media_typeWhereInput = {
    AND?: media_typeWhereInput | media_typeWhereInput[]
    OR?: media_typeWhereInput[]
    NOT?: media_typeWhereInput | media_typeWhereInput[]
    media_type_id?: IntFilter<"media_type"> | number
    name?: StringNullableFilter<"media_type"> | string | null
    track?: TrackListRelationFilter
  }

  export type media_typeOrderByWithRelationInput = {
    media_type_id?: SortOrder
    name?: SortOrderInput | SortOrder
    track?: trackOrderByRelationAggregateInput
  }

  export type media_typeWhereUniqueInput = Prisma.AtLeast<{
    media_type_id?: number
    AND?: media_typeWhereInput | media_typeWhereInput[]
    OR?: media_typeWhereInput[]
    NOT?: media_typeWhereInput | media_typeWhereInput[]
    name?: StringNullableFilter<"media_type"> | string | null
    track?: TrackListRelationFilter
  }, "media_type_id">

  export type media_typeOrderByWithAggregationInput = {
    media_type_id?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: media_typeCountOrderByAggregateInput
    _avg?: media_typeAvgOrderByAggregateInput
    _max?: media_typeMaxOrderByAggregateInput
    _min?: media_typeMinOrderByAggregateInput
    _sum?: media_typeSumOrderByAggregateInput
  }

  export type media_typeScalarWhereWithAggregatesInput = {
    AND?: media_typeScalarWhereWithAggregatesInput | media_typeScalarWhereWithAggregatesInput[]
    OR?: media_typeScalarWhereWithAggregatesInput[]
    NOT?: media_typeScalarWhereWithAggregatesInput | media_typeScalarWhereWithAggregatesInput[]
    media_type_id?: IntWithAggregatesFilter<"media_type"> | number
    name?: StringNullableWithAggregatesFilter<"media_type"> | string | null
  }

  export type playlistWhereInput = {
    AND?: playlistWhereInput | playlistWhereInput[]
    OR?: playlistWhereInput[]
    NOT?: playlistWhereInput | playlistWhereInput[]
    playlist_id?: IntFilter<"playlist"> | number
    name?: StringNullableFilter<"playlist"> | string | null
    playlist_track?: Playlist_trackListRelationFilter
  }

  export type playlistOrderByWithRelationInput = {
    playlist_id?: SortOrder
    name?: SortOrderInput | SortOrder
    playlist_track?: playlist_trackOrderByRelationAggregateInput
  }

  export type playlistWhereUniqueInput = Prisma.AtLeast<{
    playlist_id?: number
    AND?: playlistWhereInput | playlistWhereInput[]
    OR?: playlistWhereInput[]
    NOT?: playlistWhereInput | playlistWhereInput[]
    name?: StringNullableFilter<"playlist"> | string | null
    playlist_track?: Playlist_trackListRelationFilter
  }, "playlist_id">

  export type playlistOrderByWithAggregationInput = {
    playlist_id?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: playlistCountOrderByAggregateInput
    _avg?: playlistAvgOrderByAggregateInput
    _max?: playlistMaxOrderByAggregateInput
    _min?: playlistMinOrderByAggregateInput
    _sum?: playlistSumOrderByAggregateInput
  }

  export type playlistScalarWhereWithAggregatesInput = {
    AND?: playlistScalarWhereWithAggregatesInput | playlistScalarWhereWithAggregatesInput[]
    OR?: playlistScalarWhereWithAggregatesInput[]
    NOT?: playlistScalarWhereWithAggregatesInput | playlistScalarWhereWithAggregatesInput[]
    playlist_id?: IntWithAggregatesFilter<"playlist"> | number
    name?: StringNullableWithAggregatesFilter<"playlist"> | string | null
  }

  export type playlist_trackWhereInput = {
    AND?: playlist_trackWhereInput | playlist_trackWhereInput[]
    OR?: playlist_trackWhereInput[]
    NOT?: playlist_trackWhereInput | playlist_trackWhereInput[]
    playlist_id?: IntFilter<"playlist_track"> | number
    track_id?: IntFilter<"playlist_track"> | number
    playlist?: XOR<PlaylistScalarRelationFilter, playlistWhereInput>
    track?: XOR<TrackScalarRelationFilter, trackWhereInput>
  }

  export type playlist_trackOrderByWithRelationInput = {
    playlist_id?: SortOrder
    track_id?: SortOrder
    playlist?: playlistOrderByWithRelationInput
    track?: trackOrderByWithRelationInput
  }

  export type playlist_trackWhereUniqueInput = Prisma.AtLeast<{
    playlist_id_track_id?: playlist_trackPlaylist_idTrack_idCompoundUniqueInput
    AND?: playlist_trackWhereInput | playlist_trackWhereInput[]
    OR?: playlist_trackWhereInput[]
    NOT?: playlist_trackWhereInput | playlist_trackWhereInput[]
    playlist_id?: IntFilter<"playlist_track"> | number
    track_id?: IntFilter<"playlist_track"> | number
    playlist?: XOR<PlaylistScalarRelationFilter, playlistWhereInput>
    track?: XOR<TrackScalarRelationFilter, trackWhereInput>
  }, "playlist_id_track_id">

  export type playlist_trackOrderByWithAggregationInput = {
    playlist_id?: SortOrder
    track_id?: SortOrder
    _count?: playlist_trackCountOrderByAggregateInput
    _avg?: playlist_trackAvgOrderByAggregateInput
    _max?: playlist_trackMaxOrderByAggregateInput
    _min?: playlist_trackMinOrderByAggregateInput
    _sum?: playlist_trackSumOrderByAggregateInput
  }

  export type playlist_trackScalarWhereWithAggregatesInput = {
    AND?: playlist_trackScalarWhereWithAggregatesInput | playlist_trackScalarWhereWithAggregatesInput[]
    OR?: playlist_trackScalarWhereWithAggregatesInput[]
    NOT?: playlist_trackScalarWhereWithAggregatesInput | playlist_trackScalarWhereWithAggregatesInput[]
    playlist_id?: IntWithAggregatesFilter<"playlist_track"> | number
    track_id?: IntWithAggregatesFilter<"playlist_track"> | number
  }

  export type trackWhereInput = {
    AND?: trackWhereInput | trackWhereInput[]
    OR?: trackWhereInput[]
    NOT?: trackWhereInput | trackWhereInput[]
    track_id?: IntFilter<"track"> | number
    name?: StringFilter<"track"> | string
    album_id?: IntNullableFilter<"track"> | number | null
    media_type_id?: IntFilter<"track"> | number
    genre_id?: IntNullableFilter<"track"> | number | null
    composer?: StringNullableFilter<"track"> | string | null
    milliseconds?: IntFilter<"track"> | number
    bytes?: IntNullableFilter<"track"> | number | null
    unit_price?: DecimalFilter<"track"> | Decimal | DecimalJsLike | number | string
    invoice_line?: Invoice_lineListRelationFilter
    playlist_track?: Playlist_trackListRelationFilter
    album?: XOR<AlbumNullableScalarRelationFilter, albumWhereInput> | null
    genre?: XOR<GenreNullableScalarRelationFilter, genreWhereInput> | null
    media_type?: XOR<Media_typeScalarRelationFilter, media_typeWhereInput>
  }

  export type trackOrderByWithRelationInput = {
    track_id?: SortOrder
    name?: SortOrder
    album_id?: SortOrderInput | SortOrder
    media_type_id?: SortOrder
    genre_id?: SortOrderInput | SortOrder
    composer?: SortOrderInput | SortOrder
    milliseconds?: SortOrder
    bytes?: SortOrderInput | SortOrder
    unit_price?: SortOrder
    invoice_line?: invoice_lineOrderByRelationAggregateInput
    playlist_track?: playlist_trackOrderByRelationAggregateInput
    album?: albumOrderByWithRelationInput
    genre?: genreOrderByWithRelationInput
    media_type?: media_typeOrderByWithRelationInput
  }

  export type trackWhereUniqueInput = Prisma.AtLeast<{
    track_id?: number
    AND?: trackWhereInput | trackWhereInput[]
    OR?: trackWhereInput[]
    NOT?: trackWhereInput | trackWhereInput[]
    name?: StringFilter<"track"> | string
    album_id?: IntNullableFilter<"track"> | number | null
    media_type_id?: IntFilter<"track"> | number
    genre_id?: IntNullableFilter<"track"> | number | null
    composer?: StringNullableFilter<"track"> | string | null
    milliseconds?: IntFilter<"track"> | number
    bytes?: IntNullableFilter<"track"> | number | null
    unit_price?: DecimalFilter<"track"> | Decimal | DecimalJsLike | number | string
    invoice_line?: Invoice_lineListRelationFilter
    playlist_track?: Playlist_trackListRelationFilter
    album?: XOR<AlbumNullableScalarRelationFilter, albumWhereInput> | null
    genre?: XOR<GenreNullableScalarRelationFilter, genreWhereInput> | null
    media_type?: XOR<Media_typeScalarRelationFilter, media_typeWhereInput>
  }, "track_id">

  export type trackOrderByWithAggregationInput = {
    track_id?: SortOrder
    name?: SortOrder
    album_id?: SortOrderInput | SortOrder
    media_type_id?: SortOrder
    genre_id?: SortOrderInput | SortOrder
    composer?: SortOrderInput | SortOrder
    milliseconds?: SortOrder
    bytes?: SortOrderInput | SortOrder
    unit_price?: SortOrder
    _count?: trackCountOrderByAggregateInput
    _avg?: trackAvgOrderByAggregateInput
    _max?: trackMaxOrderByAggregateInput
    _min?: trackMinOrderByAggregateInput
    _sum?: trackSumOrderByAggregateInput
  }

  export type trackScalarWhereWithAggregatesInput = {
    AND?: trackScalarWhereWithAggregatesInput | trackScalarWhereWithAggregatesInput[]
    OR?: trackScalarWhereWithAggregatesInput[]
    NOT?: trackScalarWhereWithAggregatesInput | trackScalarWhereWithAggregatesInput[]
    track_id?: IntWithAggregatesFilter<"track"> | number
    name?: StringWithAggregatesFilter<"track"> | string
    album_id?: IntNullableWithAggregatesFilter<"track"> | number | null
    media_type_id?: IntWithAggregatesFilter<"track"> | number
    genre_id?: IntNullableWithAggregatesFilter<"track"> | number | null
    composer?: StringNullableWithAggregatesFilter<"track"> | string | null
    milliseconds?: IntWithAggregatesFilter<"track"> | number
    bytes?: IntNullableWithAggregatesFilter<"track"> | number | null
    unit_price?: DecimalWithAggregatesFilter<"track"> | Decimal | DecimalJsLike | number | string
  }

  export type albumCreateInput = {
    album_id: number
    title: string
    artist: artistCreateNestedOneWithoutAlbumInput
    track?: trackCreateNestedManyWithoutAlbumInput
  }

  export type albumUncheckedCreateInput = {
    album_id: number
    title: string
    artist_id: number
    track?: trackUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type albumUpdateInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist?: artistUpdateOneRequiredWithoutAlbumNestedInput
    track?: trackUpdateManyWithoutAlbumNestedInput
  }

  export type albumUncheckedUpdateInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist_id?: IntFieldUpdateOperationsInput | number
    track?: trackUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type albumCreateManyInput = {
    album_id: number
    title: string
    artist_id: number
  }

  export type albumUpdateManyMutationInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  }

  export type albumUncheckedUpdateManyInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist_id?: IntFieldUpdateOperationsInput | number
  }

  export type artistCreateInput = {
    artist_id: number
    name?: string | null
    album?: albumCreateNestedManyWithoutArtistInput
  }

  export type artistUncheckedCreateInput = {
    artist_id: number
    name?: string | null
    album?: albumUncheckedCreateNestedManyWithoutArtistInput
  }

  export type artistUpdateInput = {
    artist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    album?: albumUpdateManyWithoutArtistNestedInput
  }

  export type artistUncheckedUpdateInput = {
    artist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    album?: albumUncheckedUpdateManyWithoutArtistNestedInput
  }

  export type artistCreateManyInput = {
    artist_id: number
    name?: string | null
  }

  export type artistUpdateManyMutationInput = {
    artist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type artistUncheckedUpdateManyInput = {
    artist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type customerCreateInput = {
    customer_id: number
    first_name: string
    last_name: string
    company?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email: string
    employee?: employeeCreateNestedOneWithoutCustomerInput
    invoice?: invoiceCreateNestedManyWithoutCustomerInput
  }

  export type customerUncheckedCreateInput = {
    customer_id: number
    first_name: string
    last_name: string
    company?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email: string
    support_rep_id?: number | null
    invoice?: invoiceUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type customerUpdateInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    employee?: employeeUpdateOneWithoutCustomerNestedInput
    invoice?: invoiceUpdateManyWithoutCustomerNestedInput
  }

  export type customerUncheckedUpdateInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    support_rep_id?: NullableIntFieldUpdateOperationsInput | number | null
    invoice?: invoiceUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type customerCreateManyInput = {
    customer_id: number
    first_name: string
    last_name: string
    company?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email: string
    support_rep_id?: number | null
  }

  export type customerUpdateManyMutationInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
  }

  export type customerUncheckedUpdateManyInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    support_rep_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type employeeCreateInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
    customer?: customerCreateNestedManyWithoutEmployeeInput
    employee?: employeeCreateNestedOneWithoutOther_employeeInput
    other_employee?: employeeCreateNestedManyWithoutEmployeeInput
  }

  export type employeeUncheckedCreateInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    reports_to?: number | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
    customer?: customerUncheckedCreateNestedManyWithoutEmployeeInput
    other_employee?: employeeUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeeUpdateInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: customerUpdateManyWithoutEmployeeNestedInput
    employee?: employeeUpdateOneWithoutOther_employeeNestedInput
    other_employee?: employeeUpdateManyWithoutEmployeeNestedInput
  }

  export type employeeUncheckedUpdateInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    reports_to?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: customerUncheckedUpdateManyWithoutEmployeeNestedInput
    other_employee?: employeeUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type employeeCreateManyInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    reports_to?: number | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
  }

  export type employeeUpdateManyMutationInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type employeeUncheckedUpdateManyInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    reports_to?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type genreCreateInput = {
    genre_id: number
    name?: string | null
    track?: trackCreateNestedManyWithoutGenreInput
  }

  export type genreUncheckedCreateInput = {
    genre_id: number
    name?: string | null
    track?: trackUncheckedCreateNestedManyWithoutGenreInput
  }

  export type genreUpdateInput = {
    genre_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    track?: trackUpdateManyWithoutGenreNestedInput
  }

  export type genreUncheckedUpdateInput = {
    genre_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    track?: trackUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type genreCreateManyInput = {
    genre_id: number
    name?: string | null
  }

  export type genreUpdateManyMutationInput = {
    genre_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type genreUncheckedUpdateManyInput = {
    genre_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type invoiceCreateInput = {
    invoice_id: number
    invoice_date: Date | string
    billing_address?: string | null
    billing_city?: string | null
    billing_state?: string | null
    billing_country?: string | null
    billing_postal_code?: string | null
    total: Decimal | DecimalJsLike | number | string
    customer: customerCreateNestedOneWithoutInvoiceInput
    invoice_line?: invoice_lineCreateNestedManyWithoutInvoiceInput
  }

  export type invoiceUncheckedCreateInput = {
    invoice_id: number
    customer_id: number
    invoice_date: Date | string
    billing_address?: string | null
    billing_city?: string | null
    billing_state?: string | null
    billing_country?: string | null
    billing_postal_code?: string | null
    total: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type invoiceUpdateInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    customer?: customerUpdateOneRequiredWithoutInvoiceNestedInput
    invoice_line?: invoice_lineUpdateManyWithoutInvoiceNestedInput
  }

  export type invoiceUncheckedUpdateInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    customer_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type invoiceCreateManyInput = {
    invoice_id: number
    customer_id: number
    invoice_date: Date | string
    billing_address?: string | null
    billing_city?: string | null
    billing_state?: string | null
    billing_country?: string | null
    billing_postal_code?: string | null
    total: Decimal | DecimalJsLike | number | string
  }

  export type invoiceUpdateManyMutationInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type invoiceUncheckedUpdateManyInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    customer_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type invoice_lineCreateInput = {
    invoice_line_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
    invoice: invoiceCreateNestedOneWithoutInvoice_lineInput
    track: trackCreateNestedOneWithoutInvoice_lineInput
  }

  export type invoice_lineUncheckedCreateInput = {
    invoice_line_id: number
    invoice_id: number
    track_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
  }

  export type invoice_lineUpdateInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    invoice?: invoiceUpdateOneRequiredWithoutInvoice_lineNestedInput
    track?: trackUpdateOneRequiredWithoutInvoice_lineNestedInput
  }

  export type invoice_lineUncheckedUpdateInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    invoice_id?: IntFieldUpdateOperationsInput | number
    track_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type invoice_lineCreateManyInput = {
    invoice_line_id: number
    invoice_id: number
    track_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
  }

  export type invoice_lineUpdateManyMutationInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type invoice_lineUncheckedUpdateManyInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    invoice_id?: IntFieldUpdateOperationsInput | number
    track_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type media_typeCreateInput = {
    media_type_id: number
    name?: string | null
    track?: trackCreateNestedManyWithoutMedia_typeInput
  }

  export type media_typeUncheckedCreateInput = {
    media_type_id: number
    name?: string | null
    track?: trackUncheckedCreateNestedManyWithoutMedia_typeInput
  }

  export type media_typeUpdateInput = {
    media_type_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    track?: trackUpdateManyWithoutMedia_typeNestedInput
  }

  export type media_typeUncheckedUpdateInput = {
    media_type_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    track?: trackUncheckedUpdateManyWithoutMedia_typeNestedInput
  }

  export type media_typeCreateManyInput = {
    media_type_id: number
    name?: string | null
  }

  export type media_typeUpdateManyMutationInput = {
    media_type_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type media_typeUncheckedUpdateManyInput = {
    media_type_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playlistCreateInput = {
    playlist_id: number
    name?: string | null
    playlist_track?: playlist_trackCreateNestedManyWithoutPlaylistInput
  }

  export type playlistUncheckedCreateInput = {
    playlist_id: number
    name?: string | null
    playlist_track?: playlist_trackUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type playlistUpdateInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    playlist_track?: playlist_trackUpdateManyWithoutPlaylistNestedInput
  }

  export type playlistUncheckedUpdateInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    playlist_track?: playlist_trackUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type playlistCreateManyInput = {
    playlist_id: number
    name?: string | null
  }

  export type playlistUpdateManyMutationInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playlistUncheckedUpdateManyInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playlist_trackCreateInput = {
    playlist: playlistCreateNestedOneWithoutPlaylist_trackInput
    track: trackCreateNestedOneWithoutPlaylist_trackInput
  }

  export type playlist_trackUncheckedCreateInput = {
    playlist_id: number
    track_id: number
  }

  export type playlist_trackUpdateInput = {
    playlist?: playlistUpdateOneRequiredWithoutPlaylist_trackNestedInput
    track?: trackUpdateOneRequiredWithoutPlaylist_trackNestedInput
  }

  export type playlist_trackUncheckedUpdateInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
    track_id?: IntFieldUpdateOperationsInput | number
  }

  export type playlist_trackCreateManyInput = {
    playlist_id: number
    track_id: number
  }

  export type playlist_trackUpdateManyMutationInput = {

  }

  export type playlist_trackUncheckedUpdateManyInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
    track_id?: IntFieldUpdateOperationsInput | number
  }

  export type trackCreateInput = {
    track_id: number
    name: string
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineCreateNestedManyWithoutTrackInput
    playlist_track?: playlist_trackCreateNestedManyWithoutTrackInput
    album?: albumCreateNestedOneWithoutTrackInput
    genre?: genreCreateNestedOneWithoutTrackInput
    media_type: media_typeCreateNestedOneWithoutTrackInput
  }

  export type trackUncheckedCreateInput = {
    track_id: number
    name: string
    album_id?: number | null
    media_type_id: number
    genre_id?: number | null
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedCreateNestedManyWithoutTrackInput
    playlist_track?: playlist_trackUncheckedCreateNestedManyWithoutTrackInput
  }

  export type trackUpdateInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUpdateManyWithoutTrackNestedInput
    playlist_track?: playlist_trackUpdateManyWithoutTrackNestedInput
    album?: albumUpdateOneWithoutTrackNestedInput
    genre?: genreUpdateOneWithoutTrackNestedInput
    media_type?: media_typeUpdateOneRequiredWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    album_id?: NullableIntFieldUpdateOperationsInput | number | null
    media_type_id?: IntFieldUpdateOperationsInput | number
    genre_id?: NullableIntFieldUpdateOperationsInput | number | null
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedUpdateManyWithoutTrackNestedInput
    playlist_track?: playlist_trackUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type trackCreateManyInput = {
    track_id: number
    name: string
    album_id?: number | null
    media_type_id: number
    genre_id?: number | null
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
  }

  export type trackUpdateManyMutationInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type trackUncheckedUpdateManyInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    album_id?: NullableIntFieldUpdateOperationsInput | number | null
    media_type_id?: IntFieldUpdateOperationsInput | number
    genre_id?: NullableIntFieldUpdateOperationsInput | number | null
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ArtistScalarRelationFilter = {
    is?: artistWhereInput
    isNot?: artistWhereInput
  }

  export type TrackListRelationFilter = {
    every?: trackWhereInput
    some?: trackWhereInput
    none?: trackWhereInput
  }

  export type trackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type albumCountOrderByAggregateInput = {
    album_id?: SortOrder
    title?: SortOrder
    artist_id?: SortOrder
  }

  export type albumAvgOrderByAggregateInput = {
    album_id?: SortOrder
    artist_id?: SortOrder
  }

  export type albumMaxOrderByAggregateInput = {
    album_id?: SortOrder
    title?: SortOrder
    artist_id?: SortOrder
  }

  export type albumMinOrderByAggregateInput = {
    album_id?: SortOrder
    title?: SortOrder
    artist_id?: SortOrder
  }

  export type albumSumOrderByAggregateInput = {
    album_id?: SortOrder
    artist_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AlbumListRelationFilter = {
    every?: albumWhereInput
    some?: albumWhereInput
    none?: albumWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type albumOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type artistCountOrderByAggregateInput = {
    artist_id?: SortOrder
    name?: SortOrder
  }

  export type artistAvgOrderByAggregateInput = {
    artist_id?: SortOrder
  }

  export type artistMaxOrderByAggregateInput = {
    artist_id?: SortOrder
    name?: SortOrder
  }

  export type artistMinOrderByAggregateInput = {
    artist_id?: SortOrder
    name?: SortOrder
  }

  export type artistSumOrderByAggregateInput = {
    artist_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EmployeeNullableScalarRelationFilter = {
    is?: employeeWhereInput | null
    isNot?: employeeWhereInput | null
  }

  export type InvoiceListRelationFilter = {
    every?: invoiceWhereInput
    some?: invoiceWhereInput
    none?: invoiceWhereInput
  }

  export type invoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type customerCountOrderByAggregateInput = {
    customer_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    company?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postal_code?: SortOrder
    phone?: SortOrder
    fax?: SortOrder
    email?: SortOrder
    support_rep_id?: SortOrder
  }

  export type customerAvgOrderByAggregateInput = {
    customer_id?: SortOrder
    support_rep_id?: SortOrder
  }

  export type customerMaxOrderByAggregateInput = {
    customer_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    company?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postal_code?: SortOrder
    phone?: SortOrder
    fax?: SortOrder
    email?: SortOrder
    support_rep_id?: SortOrder
  }

  export type customerMinOrderByAggregateInput = {
    customer_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    company?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postal_code?: SortOrder
    phone?: SortOrder
    fax?: SortOrder
    email?: SortOrder
    support_rep_id?: SortOrder
  }

  export type customerSumOrderByAggregateInput = {
    customer_id?: SortOrder
    support_rep_id?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CustomerListRelationFilter = {
    every?: customerWhereInput
    some?: customerWhereInput
    none?: customerWhereInput
  }

  export type EmployeeListRelationFilter = {
    every?: employeeWhereInput
    some?: employeeWhereInput
    none?: employeeWhereInput
  }

  export type customerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type employeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type employeeCountOrderByAggregateInput = {
    employee_id?: SortOrder
    last_name?: SortOrder
    first_name?: SortOrder
    title?: SortOrder
    reports_to?: SortOrder
    birth_date?: SortOrder
    hire_date?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postal_code?: SortOrder
    phone?: SortOrder
    fax?: SortOrder
    email?: SortOrder
  }

  export type employeeAvgOrderByAggregateInput = {
    employee_id?: SortOrder
    reports_to?: SortOrder
  }

  export type employeeMaxOrderByAggregateInput = {
    employee_id?: SortOrder
    last_name?: SortOrder
    first_name?: SortOrder
    title?: SortOrder
    reports_to?: SortOrder
    birth_date?: SortOrder
    hire_date?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postal_code?: SortOrder
    phone?: SortOrder
    fax?: SortOrder
    email?: SortOrder
  }

  export type employeeMinOrderByAggregateInput = {
    employee_id?: SortOrder
    last_name?: SortOrder
    first_name?: SortOrder
    title?: SortOrder
    reports_to?: SortOrder
    birth_date?: SortOrder
    hire_date?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postal_code?: SortOrder
    phone?: SortOrder
    fax?: SortOrder
    email?: SortOrder
  }

  export type employeeSumOrderByAggregateInput = {
    employee_id?: SortOrder
    reports_to?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type genreCountOrderByAggregateInput = {
    genre_id?: SortOrder
    name?: SortOrder
  }

  export type genreAvgOrderByAggregateInput = {
    genre_id?: SortOrder
  }

  export type genreMaxOrderByAggregateInput = {
    genre_id?: SortOrder
    name?: SortOrder
  }

  export type genreMinOrderByAggregateInput = {
    genre_id?: SortOrder
    name?: SortOrder
  }

  export type genreSumOrderByAggregateInput = {
    genre_id?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CustomerScalarRelationFilter = {
    is?: customerWhereInput
    isNot?: customerWhereInput
  }

  export type Invoice_lineListRelationFilter = {
    every?: invoice_lineWhereInput
    some?: invoice_lineWhereInput
    none?: invoice_lineWhereInput
  }

  export type invoice_lineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type invoiceCountOrderByAggregateInput = {
    invoice_id?: SortOrder
    customer_id?: SortOrder
    invoice_date?: SortOrder
    billing_address?: SortOrder
    billing_city?: SortOrder
    billing_state?: SortOrder
    billing_country?: SortOrder
    billing_postal_code?: SortOrder
    total?: SortOrder
  }

  export type invoiceAvgOrderByAggregateInput = {
    invoice_id?: SortOrder
    customer_id?: SortOrder
    total?: SortOrder
  }

  export type invoiceMaxOrderByAggregateInput = {
    invoice_id?: SortOrder
    customer_id?: SortOrder
    invoice_date?: SortOrder
    billing_address?: SortOrder
    billing_city?: SortOrder
    billing_state?: SortOrder
    billing_country?: SortOrder
    billing_postal_code?: SortOrder
    total?: SortOrder
  }

  export type invoiceMinOrderByAggregateInput = {
    invoice_id?: SortOrder
    customer_id?: SortOrder
    invoice_date?: SortOrder
    billing_address?: SortOrder
    billing_city?: SortOrder
    billing_state?: SortOrder
    billing_country?: SortOrder
    billing_postal_code?: SortOrder
    total?: SortOrder
  }

  export type invoiceSumOrderByAggregateInput = {
    invoice_id?: SortOrder
    customer_id?: SortOrder
    total?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type InvoiceScalarRelationFilter = {
    is?: invoiceWhereInput
    isNot?: invoiceWhereInput
  }

  export type TrackScalarRelationFilter = {
    is?: trackWhereInput
    isNot?: trackWhereInput
  }

  export type invoice_lineCountOrderByAggregateInput = {
    invoice_line_id?: SortOrder
    invoice_id?: SortOrder
    track_id?: SortOrder
    unit_price?: SortOrder
    quantity?: SortOrder
  }

  export type invoice_lineAvgOrderByAggregateInput = {
    invoice_line_id?: SortOrder
    invoice_id?: SortOrder
    track_id?: SortOrder
    unit_price?: SortOrder
    quantity?: SortOrder
  }

  export type invoice_lineMaxOrderByAggregateInput = {
    invoice_line_id?: SortOrder
    invoice_id?: SortOrder
    track_id?: SortOrder
    unit_price?: SortOrder
    quantity?: SortOrder
  }

  export type invoice_lineMinOrderByAggregateInput = {
    invoice_line_id?: SortOrder
    invoice_id?: SortOrder
    track_id?: SortOrder
    unit_price?: SortOrder
    quantity?: SortOrder
  }

  export type invoice_lineSumOrderByAggregateInput = {
    invoice_line_id?: SortOrder
    invoice_id?: SortOrder
    track_id?: SortOrder
    unit_price?: SortOrder
    quantity?: SortOrder
  }

  export type media_typeCountOrderByAggregateInput = {
    media_type_id?: SortOrder
    name?: SortOrder
  }

  export type media_typeAvgOrderByAggregateInput = {
    media_type_id?: SortOrder
  }

  export type media_typeMaxOrderByAggregateInput = {
    media_type_id?: SortOrder
    name?: SortOrder
  }

  export type media_typeMinOrderByAggregateInput = {
    media_type_id?: SortOrder
    name?: SortOrder
  }

  export type media_typeSumOrderByAggregateInput = {
    media_type_id?: SortOrder
  }

  export type Playlist_trackListRelationFilter = {
    every?: playlist_trackWhereInput
    some?: playlist_trackWhereInput
    none?: playlist_trackWhereInput
  }

  export type playlist_trackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type playlistCountOrderByAggregateInput = {
    playlist_id?: SortOrder
    name?: SortOrder
  }

  export type playlistAvgOrderByAggregateInput = {
    playlist_id?: SortOrder
  }

  export type playlistMaxOrderByAggregateInput = {
    playlist_id?: SortOrder
    name?: SortOrder
  }

  export type playlistMinOrderByAggregateInput = {
    playlist_id?: SortOrder
    name?: SortOrder
  }

  export type playlistSumOrderByAggregateInput = {
    playlist_id?: SortOrder
  }

  export type PlaylistScalarRelationFilter = {
    is?: playlistWhereInput
    isNot?: playlistWhereInput
  }

  export type playlist_trackPlaylist_idTrack_idCompoundUniqueInput = {
    playlist_id: number
    track_id: number
  }

  export type playlist_trackCountOrderByAggregateInput = {
    playlist_id?: SortOrder
    track_id?: SortOrder
  }

  export type playlist_trackAvgOrderByAggregateInput = {
    playlist_id?: SortOrder
    track_id?: SortOrder
  }

  export type playlist_trackMaxOrderByAggregateInput = {
    playlist_id?: SortOrder
    track_id?: SortOrder
  }

  export type playlist_trackMinOrderByAggregateInput = {
    playlist_id?: SortOrder
    track_id?: SortOrder
  }

  export type playlist_trackSumOrderByAggregateInput = {
    playlist_id?: SortOrder
    track_id?: SortOrder
  }

  export type AlbumNullableScalarRelationFilter = {
    is?: albumWhereInput | null
    isNot?: albumWhereInput | null
  }

  export type GenreNullableScalarRelationFilter = {
    is?: genreWhereInput | null
    isNot?: genreWhereInput | null
  }

  export type Media_typeScalarRelationFilter = {
    is?: media_typeWhereInput
    isNot?: media_typeWhereInput
  }

  export type trackCountOrderByAggregateInput = {
    track_id?: SortOrder
    name?: SortOrder
    album_id?: SortOrder
    media_type_id?: SortOrder
    genre_id?: SortOrder
    composer?: SortOrder
    milliseconds?: SortOrder
    bytes?: SortOrder
    unit_price?: SortOrder
  }

  export type trackAvgOrderByAggregateInput = {
    track_id?: SortOrder
    album_id?: SortOrder
    media_type_id?: SortOrder
    genre_id?: SortOrder
    milliseconds?: SortOrder
    bytes?: SortOrder
    unit_price?: SortOrder
  }

  export type trackMaxOrderByAggregateInput = {
    track_id?: SortOrder
    name?: SortOrder
    album_id?: SortOrder
    media_type_id?: SortOrder
    genre_id?: SortOrder
    composer?: SortOrder
    milliseconds?: SortOrder
    bytes?: SortOrder
    unit_price?: SortOrder
  }

  export type trackMinOrderByAggregateInput = {
    track_id?: SortOrder
    name?: SortOrder
    album_id?: SortOrder
    media_type_id?: SortOrder
    genre_id?: SortOrder
    composer?: SortOrder
    milliseconds?: SortOrder
    bytes?: SortOrder
    unit_price?: SortOrder
  }

  export type trackSumOrderByAggregateInput = {
    track_id?: SortOrder
    album_id?: SortOrder
    media_type_id?: SortOrder
    genre_id?: SortOrder
    milliseconds?: SortOrder
    bytes?: SortOrder
    unit_price?: SortOrder
  }

  export type artistCreateNestedOneWithoutAlbumInput = {
    create?: XOR<artistCreateWithoutAlbumInput, artistUncheckedCreateWithoutAlbumInput>
    connectOrCreate?: artistCreateOrConnectWithoutAlbumInput
    connect?: artistWhereUniqueInput
  }

  export type trackCreateNestedManyWithoutAlbumInput = {
    create?: XOR<trackCreateWithoutAlbumInput, trackUncheckedCreateWithoutAlbumInput> | trackCreateWithoutAlbumInput[] | trackUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: trackCreateOrConnectWithoutAlbumInput | trackCreateOrConnectWithoutAlbumInput[]
    createMany?: trackCreateManyAlbumInputEnvelope
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
  }

  export type trackUncheckedCreateNestedManyWithoutAlbumInput = {
    create?: XOR<trackCreateWithoutAlbumInput, trackUncheckedCreateWithoutAlbumInput> | trackCreateWithoutAlbumInput[] | trackUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: trackCreateOrConnectWithoutAlbumInput | trackCreateOrConnectWithoutAlbumInput[]
    createMany?: trackCreateManyAlbumInputEnvelope
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type artistUpdateOneRequiredWithoutAlbumNestedInput = {
    create?: XOR<artistCreateWithoutAlbumInput, artistUncheckedCreateWithoutAlbumInput>
    connectOrCreate?: artistCreateOrConnectWithoutAlbumInput
    upsert?: artistUpsertWithoutAlbumInput
    connect?: artistWhereUniqueInput
    update?: XOR<XOR<artistUpdateToOneWithWhereWithoutAlbumInput, artistUpdateWithoutAlbumInput>, artistUncheckedUpdateWithoutAlbumInput>
  }

  export type trackUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<trackCreateWithoutAlbumInput, trackUncheckedCreateWithoutAlbumInput> | trackCreateWithoutAlbumInput[] | trackUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: trackCreateOrConnectWithoutAlbumInput | trackCreateOrConnectWithoutAlbumInput[]
    upsert?: trackUpsertWithWhereUniqueWithoutAlbumInput | trackUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: trackCreateManyAlbumInputEnvelope
    set?: trackWhereUniqueInput | trackWhereUniqueInput[]
    disconnect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    delete?: trackWhereUniqueInput | trackWhereUniqueInput[]
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    update?: trackUpdateWithWhereUniqueWithoutAlbumInput | trackUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: trackUpdateManyWithWhereWithoutAlbumInput | trackUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: trackScalarWhereInput | trackScalarWhereInput[]
  }

  export type trackUncheckedUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<trackCreateWithoutAlbumInput, trackUncheckedCreateWithoutAlbumInput> | trackCreateWithoutAlbumInput[] | trackUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: trackCreateOrConnectWithoutAlbumInput | trackCreateOrConnectWithoutAlbumInput[]
    upsert?: trackUpsertWithWhereUniqueWithoutAlbumInput | trackUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: trackCreateManyAlbumInputEnvelope
    set?: trackWhereUniqueInput | trackWhereUniqueInput[]
    disconnect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    delete?: trackWhereUniqueInput | trackWhereUniqueInput[]
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    update?: trackUpdateWithWhereUniqueWithoutAlbumInput | trackUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: trackUpdateManyWithWhereWithoutAlbumInput | trackUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: trackScalarWhereInput | trackScalarWhereInput[]
  }

  export type albumCreateNestedManyWithoutArtistInput = {
    create?: XOR<albumCreateWithoutArtistInput, albumUncheckedCreateWithoutArtistInput> | albumCreateWithoutArtistInput[] | albumUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: albumCreateOrConnectWithoutArtistInput | albumCreateOrConnectWithoutArtistInput[]
    createMany?: albumCreateManyArtistInputEnvelope
    connect?: albumWhereUniqueInput | albumWhereUniqueInput[]
  }

  export type albumUncheckedCreateNestedManyWithoutArtistInput = {
    create?: XOR<albumCreateWithoutArtistInput, albumUncheckedCreateWithoutArtistInput> | albumCreateWithoutArtistInput[] | albumUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: albumCreateOrConnectWithoutArtistInput | albumCreateOrConnectWithoutArtistInput[]
    createMany?: albumCreateManyArtistInputEnvelope
    connect?: albumWhereUniqueInput | albumWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type albumUpdateManyWithoutArtistNestedInput = {
    create?: XOR<albumCreateWithoutArtistInput, albumUncheckedCreateWithoutArtistInput> | albumCreateWithoutArtistInput[] | albumUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: albumCreateOrConnectWithoutArtistInput | albumCreateOrConnectWithoutArtistInput[]
    upsert?: albumUpsertWithWhereUniqueWithoutArtistInput | albumUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: albumCreateManyArtistInputEnvelope
    set?: albumWhereUniqueInput | albumWhereUniqueInput[]
    disconnect?: albumWhereUniqueInput | albumWhereUniqueInput[]
    delete?: albumWhereUniqueInput | albumWhereUniqueInput[]
    connect?: albumWhereUniqueInput | albumWhereUniqueInput[]
    update?: albumUpdateWithWhereUniqueWithoutArtistInput | albumUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: albumUpdateManyWithWhereWithoutArtistInput | albumUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: albumScalarWhereInput | albumScalarWhereInput[]
  }

  export type albumUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: XOR<albumCreateWithoutArtistInput, albumUncheckedCreateWithoutArtistInput> | albumCreateWithoutArtistInput[] | albumUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: albumCreateOrConnectWithoutArtistInput | albumCreateOrConnectWithoutArtistInput[]
    upsert?: albumUpsertWithWhereUniqueWithoutArtistInput | albumUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: albumCreateManyArtistInputEnvelope
    set?: albumWhereUniqueInput | albumWhereUniqueInput[]
    disconnect?: albumWhereUniqueInput | albumWhereUniqueInput[]
    delete?: albumWhereUniqueInput | albumWhereUniqueInput[]
    connect?: albumWhereUniqueInput | albumWhereUniqueInput[]
    update?: albumUpdateWithWhereUniqueWithoutArtistInput | albumUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: albumUpdateManyWithWhereWithoutArtistInput | albumUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: albumScalarWhereInput | albumScalarWhereInput[]
  }

  export type employeeCreateNestedOneWithoutCustomerInput = {
    create?: XOR<employeeCreateWithoutCustomerInput, employeeUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: employeeCreateOrConnectWithoutCustomerInput
    connect?: employeeWhereUniqueInput
  }

  export type invoiceCreateNestedManyWithoutCustomerInput = {
    create?: XOR<invoiceCreateWithoutCustomerInput, invoiceUncheckedCreateWithoutCustomerInput> | invoiceCreateWithoutCustomerInput[] | invoiceUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: invoiceCreateOrConnectWithoutCustomerInput | invoiceCreateOrConnectWithoutCustomerInput[]
    createMany?: invoiceCreateManyCustomerInputEnvelope
    connect?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
  }

  export type invoiceUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<invoiceCreateWithoutCustomerInput, invoiceUncheckedCreateWithoutCustomerInput> | invoiceCreateWithoutCustomerInput[] | invoiceUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: invoiceCreateOrConnectWithoutCustomerInput | invoiceCreateOrConnectWithoutCustomerInput[]
    createMany?: invoiceCreateManyCustomerInputEnvelope
    connect?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
  }

  export type employeeUpdateOneWithoutCustomerNestedInput = {
    create?: XOR<employeeCreateWithoutCustomerInput, employeeUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: employeeCreateOrConnectWithoutCustomerInput
    upsert?: employeeUpsertWithoutCustomerInput
    disconnect?: employeeWhereInput | boolean
    delete?: employeeWhereInput | boolean
    connect?: employeeWhereUniqueInput
    update?: XOR<XOR<employeeUpdateToOneWithWhereWithoutCustomerInput, employeeUpdateWithoutCustomerInput>, employeeUncheckedUpdateWithoutCustomerInput>
  }

  export type invoiceUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<invoiceCreateWithoutCustomerInput, invoiceUncheckedCreateWithoutCustomerInput> | invoiceCreateWithoutCustomerInput[] | invoiceUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: invoiceCreateOrConnectWithoutCustomerInput | invoiceCreateOrConnectWithoutCustomerInput[]
    upsert?: invoiceUpsertWithWhereUniqueWithoutCustomerInput | invoiceUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: invoiceCreateManyCustomerInputEnvelope
    set?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
    disconnect?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
    delete?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
    connect?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
    update?: invoiceUpdateWithWhereUniqueWithoutCustomerInput | invoiceUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: invoiceUpdateManyWithWhereWithoutCustomerInput | invoiceUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: invoiceScalarWhereInput | invoiceScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type invoiceUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<invoiceCreateWithoutCustomerInput, invoiceUncheckedCreateWithoutCustomerInput> | invoiceCreateWithoutCustomerInput[] | invoiceUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: invoiceCreateOrConnectWithoutCustomerInput | invoiceCreateOrConnectWithoutCustomerInput[]
    upsert?: invoiceUpsertWithWhereUniqueWithoutCustomerInput | invoiceUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: invoiceCreateManyCustomerInputEnvelope
    set?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
    disconnect?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
    delete?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
    connect?: invoiceWhereUniqueInput | invoiceWhereUniqueInput[]
    update?: invoiceUpdateWithWhereUniqueWithoutCustomerInput | invoiceUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: invoiceUpdateManyWithWhereWithoutCustomerInput | invoiceUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: invoiceScalarWhereInput | invoiceScalarWhereInput[]
  }

  export type customerCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<customerCreateWithoutEmployeeInput, customerUncheckedCreateWithoutEmployeeInput> | customerCreateWithoutEmployeeInput[] | customerUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: customerCreateOrConnectWithoutEmployeeInput | customerCreateOrConnectWithoutEmployeeInput[]
    createMany?: customerCreateManyEmployeeInputEnvelope
    connect?: customerWhereUniqueInput | customerWhereUniqueInput[]
  }

  export type employeeCreateNestedOneWithoutOther_employeeInput = {
    create?: XOR<employeeCreateWithoutOther_employeeInput, employeeUncheckedCreateWithoutOther_employeeInput>
    connectOrCreate?: employeeCreateOrConnectWithoutOther_employeeInput
    connect?: employeeWhereUniqueInput
  }

  export type employeeCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<employeeCreateWithoutEmployeeInput, employeeUncheckedCreateWithoutEmployeeInput> | employeeCreateWithoutEmployeeInput[] | employeeUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: employeeCreateOrConnectWithoutEmployeeInput | employeeCreateOrConnectWithoutEmployeeInput[]
    createMany?: employeeCreateManyEmployeeInputEnvelope
    connect?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
  }

  export type customerUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<customerCreateWithoutEmployeeInput, customerUncheckedCreateWithoutEmployeeInput> | customerCreateWithoutEmployeeInput[] | customerUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: customerCreateOrConnectWithoutEmployeeInput | customerCreateOrConnectWithoutEmployeeInput[]
    createMany?: customerCreateManyEmployeeInputEnvelope
    connect?: customerWhereUniqueInput | customerWhereUniqueInput[]
  }

  export type employeeUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<employeeCreateWithoutEmployeeInput, employeeUncheckedCreateWithoutEmployeeInput> | employeeCreateWithoutEmployeeInput[] | employeeUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: employeeCreateOrConnectWithoutEmployeeInput | employeeCreateOrConnectWithoutEmployeeInput[]
    createMany?: employeeCreateManyEmployeeInputEnvelope
    connect?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type customerUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<customerCreateWithoutEmployeeInput, customerUncheckedCreateWithoutEmployeeInput> | customerCreateWithoutEmployeeInput[] | customerUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: customerCreateOrConnectWithoutEmployeeInput | customerCreateOrConnectWithoutEmployeeInput[]
    upsert?: customerUpsertWithWhereUniqueWithoutEmployeeInput | customerUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: customerCreateManyEmployeeInputEnvelope
    set?: customerWhereUniqueInput | customerWhereUniqueInput[]
    disconnect?: customerWhereUniqueInput | customerWhereUniqueInput[]
    delete?: customerWhereUniqueInput | customerWhereUniqueInput[]
    connect?: customerWhereUniqueInput | customerWhereUniqueInput[]
    update?: customerUpdateWithWhereUniqueWithoutEmployeeInput | customerUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: customerUpdateManyWithWhereWithoutEmployeeInput | customerUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: customerScalarWhereInput | customerScalarWhereInput[]
  }

  export type employeeUpdateOneWithoutOther_employeeNestedInput = {
    create?: XOR<employeeCreateWithoutOther_employeeInput, employeeUncheckedCreateWithoutOther_employeeInput>
    connectOrCreate?: employeeCreateOrConnectWithoutOther_employeeInput
    upsert?: employeeUpsertWithoutOther_employeeInput
    disconnect?: employeeWhereInput | boolean
    delete?: employeeWhereInput | boolean
    connect?: employeeWhereUniqueInput
    update?: XOR<XOR<employeeUpdateToOneWithWhereWithoutOther_employeeInput, employeeUpdateWithoutOther_employeeInput>, employeeUncheckedUpdateWithoutOther_employeeInput>
  }

  export type employeeUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<employeeCreateWithoutEmployeeInput, employeeUncheckedCreateWithoutEmployeeInput> | employeeCreateWithoutEmployeeInput[] | employeeUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: employeeCreateOrConnectWithoutEmployeeInput | employeeCreateOrConnectWithoutEmployeeInput[]
    upsert?: employeeUpsertWithWhereUniqueWithoutEmployeeInput | employeeUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: employeeCreateManyEmployeeInputEnvelope
    set?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
    disconnect?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
    delete?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
    connect?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
    update?: employeeUpdateWithWhereUniqueWithoutEmployeeInput | employeeUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: employeeUpdateManyWithWhereWithoutEmployeeInput | employeeUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: employeeScalarWhereInput | employeeScalarWhereInput[]
  }

  export type customerUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<customerCreateWithoutEmployeeInput, customerUncheckedCreateWithoutEmployeeInput> | customerCreateWithoutEmployeeInput[] | customerUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: customerCreateOrConnectWithoutEmployeeInput | customerCreateOrConnectWithoutEmployeeInput[]
    upsert?: customerUpsertWithWhereUniqueWithoutEmployeeInput | customerUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: customerCreateManyEmployeeInputEnvelope
    set?: customerWhereUniqueInput | customerWhereUniqueInput[]
    disconnect?: customerWhereUniqueInput | customerWhereUniqueInput[]
    delete?: customerWhereUniqueInput | customerWhereUniqueInput[]
    connect?: customerWhereUniqueInput | customerWhereUniqueInput[]
    update?: customerUpdateWithWhereUniqueWithoutEmployeeInput | customerUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: customerUpdateManyWithWhereWithoutEmployeeInput | customerUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: customerScalarWhereInput | customerScalarWhereInput[]
  }

  export type employeeUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<employeeCreateWithoutEmployeeInput, employeeUncheckedCreateWithoutEmployeeInput> | employeeCreateWithoutEmployeeInput[] | employeeUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: employeeCreateOrConnectWithoutEmployeeInput | employeeCreateOrConnectWithoutEmployeeInput[]
    upsert?: employeeUpsertWithWhereUniqueWithoutEmployeeInput | employeeUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: employeeCreateManyEmployeeInputEnvelope
    set?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
    disconnect?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
    delete?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
    connect?: employeeWhereUniqueInput | employeeWhereUniqueInput[]
    update?: employeeUpdateWithWhereUniqueWithoutEmployeeInput | employeeUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: employeeUpdateManyWithWhereWithoutEmployeeInput | employeeUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: employeeScalarWhereInput | employeeScalarWhereInput[]
  }

  export type trackCreateNestedManyWithoutGenreInput = {
    create?: XOR<trackCreateWithoutGenreInput, trackUncheckedCreateWithoutGenreInput> | trackCreateWithoutGenreInput[] | trackUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: trackCreateOrConnectWithoutGenreInput | trackCreateOrConnectWithoutGenreInput[]
    createMany?: trackCreateManyGenreInputEnvelope
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
  }

  export type trackUncheckedCreateNestedManyWithoutGenreInput = {
    create?: XOR<trackCreateWithoutGenreInput, trackUncheckedCreateWithoutGenreInput> | trackCreateWithoutGenreInput[] | trackUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: trackCreateOrConnectWithoutGenreInput | trackCreateOrConnectWithoutGenreInput[]
    createMany?: trackCreateManyGenreInputEnvelope
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
  }

  export type trackUpdateManyWithoutGenreNestedInput = {
    create?: XOR<trackCreateWithoutGenreInput, trackUncheckedCreateWithoutGenreInput> | trackCreateWithoutGenreInput[] | trackUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: trackCreateOrConnectWithoutGenreInput | trackCreateOrConnectWithoutGenreInput[]
    upsert?: trackUpsertWithWhereUniqueWithoutGenreInput | trackUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: trackCreateManyGenreInputEnvelope
    set?: trackWhereUniqueInput | trackWhereUniqueInput[]
    disconnect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    delete?: trackWhereUniqueInput | trackWhereUniqueInput[]
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    update?: trackUpdateWithWhereUniqueWithoutGenreInput | trackUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: trackUpdateManyWithWhereWithoutGenreInput | trackUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: trackScalarWhereInput | trackScalarWhereInput[]
  }

  export type trackUncheckedUpdateManyWithoutGenreNestedInput = {
    create?: XOR<trackCreateWithoutGenreInput, trackUncheckedCreateWithoutGenreInput> | trackCreateWithoutGenreInput[] | trackUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: trackCreateOrConnectWithoutGenreInput | trackCreateOrConnectWithoutGenreInput[]
    upsert?: trackUpsertWithWhereUniqueWithoutGenreInput | trackUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: trackCreateManyGenreInputEnvelope
    set?: trackWhereUniqueInput | trackWhereUniqueInput[]
    disconnect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    delete?: trackWhereUniqueInput | trackWhereUniqueInput[]
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    update?: trackUpdateWithWhereUniqueWithoutGenreInput | trackUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: trackUpdateManyWithWhereWithoutGenreInput | trackUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: trackScalarWhereInput | trackScalarWhereInput[]
  }

  export type customerCreateNestedOneWithoutInvoiceInput = {
    create?: XOR<customerCreateWithoutInvoiceInput, customerUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: customerCreateOrConnectWithoutInvoiceInput
    connect?: customerWhereUniqueInput
  }

  export type invoice_lineCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<invoice_lineCreateWithoutInvoiceInput, invoice_lineUncheckedCreateWithoutInvoiceInput> | invoice_lineCreateWithoutInvoiceInput[] | invoice_lineUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: invoice_lineCreateOrConnectWithoutInvoiceInput | invoice_lineCreateOrConnectWithoutInvoiceInput[]
    createMany?: invoice_lineCreateManyInvoiceInputEnvelope
    connect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
  }

  export type invoice_lineUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<invoice_lineCreateWithoutInvoiceInput, invoice_lineUncheckedCreateWithoutInvoiceInput> | invoice_lineCreateWithoutInvoiceInput[] | invoice_lineUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: invoice_lineCreateOrConnectWithoutInvoiceInput | invoice_lineCreateOrConnectWithoutInvoiceInput[]
    createMany?: invoice_lineCreateManyInvoiceInputEnvelope
    connect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type customerUpdateOneRequiredWithoutInvoiceNestedInput = {
    create?: XOR<customerCreateWithoutInvoiceInput, customerUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: customerCreateOrConnectWithoutInvoiceInput
    upsert?: customerUpsertWithoutInvoiceInput
    connect?: customerWhereUniqueInput
    update?: XOR<XOR<customerUpdateToOneWithWhereWithoutInvoiceInput, customerUpdateWithoutInvoiceInput>, customerUncheckedUpdateWithoutInvoiceInput>
  }

  export type invoice_lineUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<invoice_lineCreateWithoutInvoiceInput, invoice_lineUncheckedCreateWithoutInvoiceInput> | invoice_lineCreateWithoutInvoiceInput[] | invoice_lineUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: invoice_lineCreateOrConnectWithoutInvoiceInput | invoice_lineCreateOrConnectWithoutInvoiceInput[]
    upsert?: invoice_lineUpsertWithWhereUniqueWithoutInvoiceInput | invoice_lineUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: invoice_lineCreateManyInvoiceInputEnvelope
    set?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    disconnect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    delete?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    connect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    update?: invoice_lineUpdateWithWhereUniqueWithoutInvoiceInput | invoice_lineUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: invoice_lineUpdateManyWithWhereWithoutInvoiceInput | invoice_lineUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: invoice_lineScalarWhereInput | invoice_lineScalarWhereInput[]
  }

  export type invoice_lineUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<invoice_lineCreateWithoutInvoiceInput, invoice_lineUncheckedCreateWithoutInvoiceInput> | invoice_lineCreateWithoutInvoiceInput[] | invoice_lineUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: invoice_lineCreateOrConnectWithoutInvoiceInput | invoice_lineCreateOrConnectWithoutInvoiceInput[]
    upsert?: invoice_lineUpsertWithWhereUniqueWithoutInvoiceInput | invoice_lineUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: invoice_lineCreateManyInvoiceInputEnvelope
    set?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    disconnect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    delete?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    connect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    update?: invoice_lineUpdateWithWhereUniqueWithoutInvoiceInput | invoice_lineUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: invoice_lineUpdateManyWithWhereWithoutInvoiceInput | invoice_lineUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: invoice_lineScalarWhereInput | invoice_lineScalarWhereInput[]
  }

  export type invoiceCreateNestedOneWithoutInvoice_lineInput = {
    create?: XOR<invoiceCreateWithoutInvoice_lineInput, invoiceUncheckedCreateWithoutInvoice_lineInput>
    connectOrCreate?: invoiceCreateOrConnectWithoutInvoice_lineInput
    connect?: invoiceWhereUniqueInput
  }

  export type trackCreateNestedOneWithoutInvoice_lineInput = {
    create?: XOR<trackCreateWithoutInvoice_lineInput, trackUncheckedCreateWithoutInvoice_lineInput>
    connectOrCreate?: trackCreateOrConnectWithoutInvoice_lineInput
    connect?: trackWhereUniqueInput
  }

  export type invoiceUpdateOneRequiredWithoutInvoice_lineNestedInput = {
    create?: XOR<invoiceCreateWithoutInvoice_lineInput, invoiceUncheckedCreateWithoutInvoice_lineInput>
    connectOrCreate?: invoiceCreateOrConnectWithoutInvoice_lineInput
    upsert?: invoiceUpsertWithoutInvoice_lineInput
    connect?: invoiceWhereUniqueInput
    update?: XOR<XOR<invoiceUpdateToOneWithWhereWithoutInvoice_lineInput, invoiceUpdateWithoutInvoice_lineInput>, invoiceUncheckedUpdateWithoutInvoice_lineInput>
  }

  export type trackUpdateOneRequiredWithoutInvoice_lineNestedInput = {
    create?: XOR<trackCreateWithoutInvoice_lineInput, trackUncheckedCreateWithoutInvoice_lineInput>
    connectOrCreate?: trackCreateOrConnectWithoutInvoice_lineInput
    upsert?: trackUpsertWithoutInvoice_lineInput
    connect?: trackWhereUniqueInput
    update?: XOR<XOR<trackUpdateToOneWithWhereWithoutInvoice_lineInput, trackUpdateWithoutInvoice_lineInput>, trackUncheckedUpdateWithoutInvoice_lineInput>
  }

  export type trackCreateNestedManyWithoutMedia_typeInput = {
    create?: XOR<trackCreateWithoutMedia_typeInput, trackUncheckedCreateWithoutMedia_typeInput> | trackCreateWithoutMedia_typeInput[] | trackUncheckedCreateWithoutMedia_typeInput[]
    connectOrCreate?: trackCreateOrConnectWithoutMedia_typeInput | trackCreateOrConnectWithoutMedia_typeInput[]
    createMany?: trackCreateManyMedia_typeInputEnvelope
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
  }

  export type trackUncheckedCreateNestedManyWithoutMedia_typeInput = {
    create?: XOR<trackCreateWithoutMedia_typeInput, trackUncheckedCreateWithoutMedia_typeInput> | trackCreateWithoutMedia_typeInput[] | trackUncheckedCreateWithoutMedia_typeInput[]
    connectOrCreate?: trackCreateOrConnectWithoutMedia_typeInput | trackCreateOrConnectWithoutMedia_typeInput[]
    createMany?: trackCreateManyMedia_typeInputEnvelope
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
  }

  export type trackUpdateManyWithoutMedia_typeNestedInput = {
    create?: XOR<trackCreateWithoutMedia_typeInput, trackUncheckedCreateWithoutMedia_typeInput> | trackCreateWithoutMedia_typeInput[] | trackUncheckedCreateWithoutMedia_typeInput[]
    connectOrCreate?: trackCreateOrConnectWithoutMedia_typeInput | trackCreateOrConnectWithoutMedia_typeInput[]
    upsert?: trackUpsertWithWhereUniqueWithoutMedia_typeInput | trackUpsertWithWhereUniqueWithoutMedia_typeInput[]
    createMany?: trackCreateManyMedia_typeInputEnvelope
    set?: trackWhereUniqueInput | trackWhereUniqueInput[]
    disconnect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    delete?: trackWhereUniqueInput | trackWhereUniqueInput[]
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    update?: trackUpdateWithWhereUniqueWithoutMedia_typeInput | trackUpdateWithWhereUniqueWithoutMedia_typeInput[]
    updateMany?: trackUpdateManyWithWhereWithoutMedia_typeInput | trackUpdateManyWithWhereWithoutMedia_typeInput[]
    deleteMany?: trackScalarWhereInput | trackScalarWhereInput[]
  }

  export type trackUncheckedUpdateManyWithoutMedia_typeNestedInput = {
    create?: XOR<trackCreateWithoutMedia_typeInput, trackUncheckedCreateWithoutMedia_typeInput> | trackCreateWithoutMedia_typeInput[] | trackUncheckedCreateWithoutMedia_typeInput[]
    connectOrCreate?: trackCreateOrConnectWithoutMedia_typeInput | trackCreateOrConnectWithoutMedia_typeInput[]
    upsert?: trackUpsertWithWhereUniqueWithoutMedia_typeInput | trackUpsertWithWhereUniqueWithoutMedia_typeInput[]
    createMany?: trackCreateManyMedia_typeInputEnvelope
    set?: trackWhereUniqueInput | trackWhereUniqueInput[]
    disconnect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    delete?: trackWhereUniqueInput | trackWhereUniqueInput[]
    connect?: trackWhereUniqueInput | trackWhereUniqueInput[]
    update?: trackUpdateWithWhereUniqueWithoutMedia_typeInput | trackUpdateWithWhereUniqueWithoutMedia_typeInput[]
    updateMany?: trackUpdateManyWithWhereWithoutMedia_typeInput | trackUpdateManyWithWhereWithoutMedia_typeInput[]
    deleteMany?: trackScalarWhereInput | trackScalarWhereInput[]
  }

  export type playlist_trackCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<playlist_trackCreateWithoutPlaylistInput, playlist_trackUncheckedCreateWithoutPlaylistInput> | playlist_trackCreateWithoutPlaylistInput[] | playlist_trackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: playlist_trackCreateOrConnectWithoutPlaylistInput | playlist_trackCreateOrConnectWithoutPlaylistInput[]
    createMany?: playlist_trackCreateManyPlaylistInputEnvelope
    connect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
  }

  export type playlist_trackUncheckedCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<playlist_trackCreateWithoutPlaylistInput, playlist_trackUncheckedCreateWithoutPlaylistInput> | playlist_trackCreateWithoutPlaylistInput[] | playlist_trackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: playlist_trackCreateOrConnectWithoutPlaylistInput | playlist_trackCreateOrConnectWithoutPlaylistInput[]
    createMany?: playlist_trackCreateManyPlaylistInputEnvelope
    connect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
  }

  export type playlist_trackUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<playlist_trackCreateWithoutPlaylistInput, playlist_trackUncheckedCreateWithoutPlaylistInput> | playlist_trackCreateWithoutPlaylistInput[] | playlist_trackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: playlist_trackCreateOrConnectWithoutPlaylistInput | playlist_trackCreateOrConnectWithoutPlaylistInput[]
    upsert?: playlist_trackUpsertWithWhereUniqueWithoutPlaylistInput | playlist_trackUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: playlist_trackCreateManyPlaylistInputEnvelope
    set?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    disconnect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    delete?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    connect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    update?: playlist_trackUpdateWithWhereUniqueWithoutPlaylistInput | playlist_trackUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: playlist_trackUpdateManyWithWhereWithoutPlaylistInput | playlist_trackUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: playlist_trackScalarWhereInput | playlist_trackScalarWhereInput[]
  }

  export type playlist_trackUncheckedUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<playlist_trackCreateWithoutPlaylistInput, playlist_trackUncheckedCreateWithoutPlaylistInput> | playlist_trackCreateWithoutPlaylistInput[] | playlist_trackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: playlist_trackCreateOrConnectWithoutPlaylistInput | playlist_trackCreateOrConnectWithoutPlaylistInput[]
    upsert?: playlist_trackUpsertWithWhereUniqueWithoutPlaylistInput | playlist_trackUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: playlist_trackCreateManyPlaylistInputEnvelope
    set?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    disconnect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    delete?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    connect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    update?: playlist_trackUpdateWithWhereUniqueWithoutPlaylistInput | playlist_trackUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: playlist_trackUpdateManyWithWhereWithoutPlaylistInput | playlist_trackUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: playlist_trackScalarWhereInput | playlist_trackScalarWhereInput[]
  }

  export type playlistCreateNestedOneWithoutPlaylist_trackInput = {
    create?: XOR<playlistCreateWithoutPlaylist_trackInput, playlistUncheckedCreateWithoutPlaylist_trackInput>
    connectOrCreate?: playlistCreateOrConnectWithoutPlaylist_trackInput
    connect?: playlistWhereUniqueInput
  }

  export type trackCreateNestedOneWithoutPlaylist_trackInput = {
    create?: XOR<trackCreateWithoutPlaylist_trackInput, trackUncheckedCreateWithoutPlaylist_trackInput>
    connectOrCreate?: trackCreateOrConnectWithoutPlaylist_trackInput
    connect?: trackWhereUniqueInput
  }

  export type playlistUpdateOneRequiredWithoutPlaylist_trackNestedInput = {
    create?: XOR<playlistCreateWithoutPlaylist_trackInput, playlistUncheckedCreateWithoutPlaylist_trackInput>
    connectOrCreate?: playlistCreateOrConnectWithoutPlaylist_trackInput
    upsert?: playlistUpsertWithoutPlaylist_trackInput
    connect?: playlistWhereUniqueInput
    update?: XOR<XOR<playlistUpdateToOneWithWhereWithoutPlaylist_trackInput, playlistUpdateWithoutPlaylist_trackInput>, playlistUncheckedUpdateWithoutPlaylist_trackInput>
  }

  export type trackUpdateOneRequiredWithoutPlaylist_trackNestedInput = {
    create?: XOR<trackCreateWithoutPlaylist_trackInput, trackUncheckedCreateWithoutPlaylist_trackInput>
    connectOrCreate?: trackCreateOrConnectWithoutPlaylist_trackInput
    upsert?: trackUpsertWithoutPlaylist_trackInput
    connect?: trackWhereUniqueInput
    update?: XOR<XOR<trackUpdateToOneWithWhereWithoutPlaylist_trackInput, trackUpdateWithoutPlaylist_trackInput>, trackUncheckedUpdateWithoutPlaylist_trackInput>
  }

  export type invoice_lineCreateNestedManyWithoutTrackInput = {
    create?: XOR<invoice_lineCreateWithoutTrackInput, invoice_lineUncheckedCreateWithoutTrackInput> | invoice_lineCreateWithoutTrackInput[] | invoice_lineUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: invoice_lineCreateOrConnectWithoutTrackInput | invoice_lineCreateOrConnectWithoutTrackInput[]
    createMany?: invoice_lineCreateManyTrackInputEnvelope
    connect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
  }

  export type playlist_trackCreateNestedManyWithoutTrackInput = {
    create?: XOR<playlist_trackCreateWithoutTrackInput, playlist_trackUncheckedCreateWithoutTrackInput> | playlist_trackCreateWithoutTrackInput[] | playlist_trackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: playlist_trackCreateOrConnectWithoutTrackInput | playlist_trackCreateOrConnectWithoutTrackInput[]
    createMany?: playlist_trackCreateManyTrackInputEnvelope
    connect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
  }

  export type albumCreateNestedOneWithoutTrackInput = {
    create?: XOR<albumCreateWithoutTrackInput, albumUncheckedCreateWithoutTrackInput>
    connectOrCreate?: albumCreateOrConnectWithoutTrackInput
    connect?: albumWhereUniqueInput
  }

  export type genreCreateNestedOneWithoutTrackInput = {
    create?: XOR<genreCreateWithoutTrackInput, genreUncheckedCreateWithoutTrackInput>
    connectOrCreate?: genreCreateOrConnectWithoutTrackInput
    connect?: genreWhereUniqueInput
  }

  export type media_typeCreateNestedOneWithoutTrackInput = {
    create?: XOR<media_typeCreateWithoutTrackInput, media_typeUncheckedCreateWithoutTrackInput>
    connectOrCreate?: media_typeCreateOrConnectWithoutTrackInput
    connect?: media_typeWhereUniqueInput
  }

  export type invoice_lineUncheckedCreateNestedManyWithoutTrackInput = {
    create?: XOR<invoice_lineCreateWithoutTrackInput, invoice_lineUncheckedCreateWithoutTrackInput> | invoice_lineCreateWithoutTrackInput[] | invoice_lineUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: invoice_lineCreateOrConnectWithoutTrackInput | invoice_lineCreateOrConnectWithoutTrackInput[]
    createMany?: invoice_lineCreateManyTrackInputEnvelope
    connect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
  }

  export type playlist_trackUncheckedCreateNestedManyWithoutTrackInput = {
    create?: XOR<playlist_trackCreateWithoutTrackInput, playlist_trackUncheckedCreateWithoutTrackInput> | playlist_trackCreateWithoutTrackInput[] | playlist_trackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: playlist_trackCreateOrConnectWithoutTrackInput | playlist_trackCreateOrConnectWithoutTrackInput[]
    createMany?: playlist_trackCreateManyTrackInputEnvelope
    connect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
  }

  export type invoice_lineUpdateManyWithoutTrackNestedInput = {
    create?: XOR<invoice_lineCreateWithoutTrackInput, invoice_lineUncheckedCreateWithoutTrackInput> | invoice_lineCreateWithoutTrackInput[] | invoice_lineUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: invoice_lineCreateOrConnectWithoutTrackInput | invoice_lineCreateOrConnectWithoutTrackInput[]
    upsert?: invoice_lineUpsertWithWhereUniqueWithoutTrackInput | invoice_lineUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: invoice_lineCreateManyTrackInputEnvelope
    set?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    disconnect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    delete?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    connect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    update?: invoice_lineUpdateWithWhereUniqueWithoutTrackInput | invoice_lineUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: invoice_lineUpdateManyWithWhereWithoutTrackInput | invoice_lineUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: invoice_lineScalarWhereInput | invoice_lineScalarWhereInput[]
  }

  export type playlist_trackUpdateManyWithoutTrackNestedInput = {
    create?: XOR<playlist_trackCreateWithoutTrackInput, playlist_trackUncheckedCreateWithoutTrackInput> | playlist_trackCreateWithoutTrackInput[] | playlist_trackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: playlist_trackCreateOrConnectWithoutTrackInput | playlist_trackCreateOrConnectWithoutTrackInput[]
    upsert?: playlist_trackUpsertWithWhereUniqueWithoutTrackInput | playlist_trackUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: playlist_trackCreateManyTrackInputEnvelope
    set?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    disconnect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    delete?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    connect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    update?: playlist_trackUpdateWithWhereUniqueWithoutTrackInput | playlist_trackUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: playlist_trackUpdateManyWithWhereWithoutTrackInput | playlist_trackUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: playlist_trackScalarWhereInput | playlist_trackScalarWhereInput[]
  }

  export type albumUpdateOneWithoutTrackNestedInput = {
    create?: XOR<albumCreateWithoutTrackInput, albumUncheckedCreateWithoutTrackInput>
    connectOrCreate?: albumCreateOrConnectWithoutTrackInput
    upsert?: albumUpsertWithoutTrackInput
    disconnect?: albumWhereInput | boolean
    delete?: albumWhereInput | boolean
    connect?: albumWhereUniqueInput
    update?: XOR<XOR<albumUpdateToOneWithWhereWithoutTrackInput, albumUpdateWithoutTrackInput>, albumUncheckedUpdateWithoutTrackInput>
  }

  export type genreUpdateOneWithoutTrackNestedInput = {
    create?: XOR<genreCreateWithoutTrackInput, genreUncheckedCreateWithoutTrackInput>
    connectOrCreate?: genreCreateOrConnectWithoutTrackInput
    upsert?: genreUpsertWithoutTrackInput
    disconnect?: genreWhereInput | boolean
    delete?: genreWhereInput | boolean
    connect?: genreWhereUniqueInput
    update?: XOR<XOR<genreUpdateToOneWithWhereWithoutTrackInput, genreUpdateWithoutTrackInput>, genreUncheckedUpdateWithoutTrackInput>
  }

  export type media_typeUpdateOneRequiredWithoutTrackNestedInput = {
    create?: XOR<media_typeCreateWithoutTrackInput, media_typeUncheckedCreateWithoutTrackInput>
    connectOrCreate?: media_typeCreateOrConnectWithoutTrackInput
    upsert?: media_typeUpsertWithoutTrackInput
    connect?: media_typeWhereUniqueInput
    update?: XOR<XOR<media_typeUpdateToOneWithWhereWithoutTrackInput, media_typeUpdateWithoutTrackInput>, media_typeUncheckedUpdateWithoutTrackInput>
  }

  export type invoice_lineUncheckedUpdateManyWithoutTrackNestedInput = {
    create?: XOR<invoice_lineCreateWithoutTrackInput, invoice_lineUncheckedCreateWithoutTrackInput> | invoice_lineCreateWithoutTrackInput[] | invoice_lineUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: invoice_lineCreateOrConnectWithoutTrackInput | invoice_lineCreateOrConnectWithoutTrackInput[]
    upsert?: invoice_lineUpsertWithWhereUniqueWithoutTrackInput | invoice_lineUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: invoice_lineCreateManyTrackInputEnvelope
    set?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    disconnect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    delete?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    connect?: invoice_lineWhereUniqueInput | invoice_lineWhereUniqueInput[]
    update?: invoice_lineUpdateWithWhereUniqueWithoutTrackInput | invoice_lineUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: invoice_lineUpdateManyWithWhereWithoutTrackInput | invoice_lineUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: invoice_lineScalarWhereInput | invoice_lineScalarWhereInput[]
  }

  export type playlist_trackUncheckedUpdateManyWithoutTrackNestedInput = {
    create?: XOR<playlist_trackCreateWithoutTrackInput, playlist_trackUncheckedCreateWithoutTrackInput> | playlist_trackCreateWithoutTrackInput[] | playlist_trackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: playlist_trackCreateOrConnectWithoutTrackInput | playlist_trackCreateOrConnectWithoutTrackInput[]
    upsert?: playlist_trackUpsertWithWhereUniqueWithoutTrackInput | playlist_trackUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: playlist_trackCreateManyTrackInputEnvelope
    set?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    disconnect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    delete?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    connect?: playlist_trackWhereUniqueInput | playlist_trackWhereUniqueInput[]
    update?: playlist_trackUpdateWithWhereUniqueWithoutTrackInput | playlist_trackUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: playlist_trackUpdateManyWithWhereWithoutTrackInput | playlist_trackUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: playlist_trackScalarWhereInput | playlist_trackScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type artistCreateWithoutAlbumInput = {
    artist_id: number
    name?: string | null
  }

  export type artistUncheckedCreateWithoutAlbumInput = {
    artist_id: number
    name?: string | null
  }

  export type artistCreateOrConnectWithoutAlbumInput = {
    where: artistWhereUniqueInput
    create: XOR<artistCreateWithoutAlbumInput, artistUncheckedCreateWithoutAlbumInput>
  }

  export type trackCreateWithoutAlbumInput = {
    track_id: number
    name: string
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineCreateNestedManyWithoutTrackInput
    playlist_track?: playlist_trackCreateNestedManyWithoutTrackInput
    genre?: genreCreateNestedOneWithoutTrackInput
    media_type: media_typeCreateNestedOneWithoutTrackInput
  }

  export type trackUncheckedCreateWithoutAlbumInput = {
    track_id: number
    name: string
    media_type_id: number
    genre_id?: number | null
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedCreateNestedManyWithoutTrackInput
    playlist_track?: playlist_trackUncheckedCreateNestedManyWithoutTrackInput
  }

  export type trackCreateOrConnectWithoutAlbumInput = {
    where: trackWhereUniqueInput
    create: XOR<trackCreateWithoutAlbumInput, trackUncheckedCreateWithoutAlbumInput>
  }

  export type trackCreateManyAlbumInputEnvelope = {
    data: trackCreateManyAlbumInput | trackCreateManyAlbumInput[]
    skipDuplicates?: boolean
  }

  export type artistUpsertWithoutAlbumInput = {
    update: XOR<artistUpdateWithoutAlbumInput, artistUncheckedUpdateWithoutAlbumInput>
    create: XOR<artistCreateWithoutAlbumInput, artistUncheckedCreateWithoutAlbumInput>
    where?: artistWhereInput
  }

  export type artistUpdateToOneWithWhereWithoutAlbumInput = {
    where?: artistWhereInput
    data: XOR<artistUpdateWithoutAlbumInput, artistUncheckedUpdateWithoutAlbumInput>
  }

  export type artistUpdateWithoutAlbumInput = {
    artist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type artistUncheckedUpdateWithoutAlbumInput = {
    artist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type trackUpsertWithWhereUniqueWithoutAlbumInput = {
    where: trackWhereUniqueInput
    update: XOR<trackUpdateWithoutAlbumInput, trackUncheckedUpdateWithoutAlbumInput>
    create: XOR<trackCreateWithoutAlbumInput, trackUncheckedCreateWithoutAlbumInput>
  }

  export type trackUpdateWithWhereUniqueWithoutAlbumInput = {
    where: trackWhereUniqueInput
    data: XOR<trackUpdateWithoutAlbumInput, trackUncheckedUpdateWithoutAlbumInput>
  }

  export type trackUpdateManyWithWhereWithoutAlbumInput = {
    where: trackScalarWhereInput
    data: XOR<trackUpdateManyMutationInput, trackUncheckedUpdateManyWithoutAlbumInput>
  }

  export type trackScalarWhereInput = {
    AND?: trackScalarWhereInput | trackScalarWhereInput[]
    OR?: trackScalarWhereInput[]
    NOT?: trackScalarWhereInput | trackScalarWhereInput[]
    track_id?: IntFilter<"track"> | number
    name?: StringFilter<"track"> | string
    album_id?: IntNullableFilter<"track"> | number | null
    media_type_id?: IntFilter<"track"> | number
    genre_id?: IntNullableFilter<"track"> | number | null
    composer?: StringNullableFilter<"track"> | string | null
    milliseconds?: IntFilter<"track"> | number
    bytes?: IntNullableFilter<"track"> | number | null
    unit_price?: DecimalFilter<"track"> | Decimal | DecimalJsLike | number | string
  }

  export type albumCreateWithoutArtistInput = {
    album_id: number
    title: string
    track?: trackCreateNestedManyWithoutAlbumInput
  }

  export type albumUncheckedCreateWithoutArtistInput = {
    album_id: number
    title: string
    track?: trackUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type albumCreateOrConnectWithoutArtistInput = {
    where: albumWhereUniqueInput
    create: XOR<albumCreateWithoutArtistInput, albumUncheckedCreateWithoutArtistInput>
  }

  export type albumCreateManyArtistInputEnvelope = {
    data: albumCreateManyArtistInput | albumCreateManyArtistInput[]
    skipDuplicates?: boolean
  }

  export type albumUpsertWithWhereUniqueWithoutArtistInput = {
    where: albumWhereUniqueInput
    update: XOR<albumUpdateWithoutArtistInput, albumUncheckedUpdateWithoutArtistInput>
    create: XOR<albumCreateWithoutArtistInput, albumUncheckedCreateWithoutArtistInput>
  }

  export type albumUpdateWithWhereUniqueWithoutArtistInput = {
    where: albumWhereUniqueInput
    data: XOR<albumUpdateWithoutArtistInput, albumUncheckedUpdateWithoutArtistInput>
  }

  export type albumUpdateManyWithWhereWithoutArtistInput = {
    where: albumScalarWhereInput
    data: XOR<albumUpdateManyMutationInput, albumUncheckedUpdateManyWithoutArtistInput>
  }

  export type albumScalarWhereInput = {
    AND?: albumScalarWhereInput | albumScalarWhereInput[]
    OR?: albumScalarWhereInput[]
    NOT?: albumScalarWhereInput | albumScalarWhereInput[]
    album_id?: IntFilter<"album"> | number
    title?: StringFilter<"album"> | string
    artist_id?: IntFilter<"album"> | number
  }

  export type employeeCreateWithoutCustomerInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
    employee?: employeeCreateNestedOneWithoutOther_employeeInput
    other_employee?: employeeCreateNestedManyWithoutEmployeeInput
  }

  export type employeeUncheckedCreateWithoutCustomerInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    reports_to?: number | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
    other_employee?: employeeUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeeCreateOrConnectWithoutCustomerInput = {
    where: employeeWhereUniqueInput
    create: XOR<employeeCreateWithoutCustomerInput, employeeUncheckedCreateWithoutCustomerInput>
  }

  export type invoiceCreateWithoutCustomerInput = {
    invoice_id: number
    invoice_date: Date | string
    billing_address?: string | null
    billing_city?: string | null
    billing_state?: string | null
    billing_country?: string | null
    billing_postal_code?: string | null
    total: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineCreateNestedManyWithoutInvoiceInput
  }

  export type invoiceUncheckedCreateWithoutCustomerInput = {
    invoice_id: number
    invoice_date: Date | string
    billing_address?: string | null
    billing_city?: string | null
    billing_state?: string | null
    billing_country?: string | null
    billing_postal_code?: string | null
    total: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type invoiceCreateOrConnectWithoutCustomerInput = {
    where: invoiceWhereUniqueInput
    create: XOR<invoiceCreateWithoutCustomerInput, invoiceUncheckedCreateWithoutCustomerInput>
  }

  export type invoiceCreateManyCustomerInputEnvelope = {
    data: invoiceCreateManyCustomerInput | invoiceCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type employeeUpsertWithoutCustomerInput = {
    update: XOR<employeeUpdateWithoutCustomerInput, employeeUncheckedUpdateWithoutCustomerInput>
    create: XOR<employeeCreateWithoutCustomerInput, employeeUncheckedCreateWithoutCustomerInput>
    where?: employeeWhereInput
  }

  export type employeeUpdateToOneWithWhereWithoutCustomerInput = {
    where?: employeeWhereInput
    data: XOR<employeeUpdateWithoutCustomerInput, employeeUncheckedUpdateWithoutCustomerInput>
  }

  export type employeeUpdateWithoutCustomerInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutOther_employeeNestedInput
    other_employee?: employeeUpdateManyWithoutEmployeeNestedInput
  }

  export type employeeUncheckedUpdateWithoutCustomerInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    reports_to?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    other_employee?: employeeUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type invoiceUpsertWithWhereUniqueWithoutCustomerInput = {
    where: invoiceWhereUniqueInput
    update: XOR<invoiceUpdateWithoutCustomerInput, invoiceUncheckedUpdateWithoutCustomerInput>
    create: XOR<invoiceCreateWithoutCustomerInput, invoiceUncheckedCreateWithoutCustomerInput>
  }

  export type invoiceUpdateWithWhereUniqueWithoutCustomerInput = {
    where: invoiceWhereUniqueInput
    data: XOR<invoiceUpdateWithoutCustomerInput, invoiceUncheckedUpdateWithoutCustomerInput>
  }

  export type invoiceUpdateManyWithWhereWithoutCustomerInput = {
    where: invoiceScalarWhereInput
    data: XOR<invoiceUpdateManyMutationInput, invoiceUncheckedUpdateManyWithoutCustomerInput>
  }

  export type invoiceScalarWhereInput = {
    AND?: invoiceScalarWhereInput | invoiceScalarWhereInput[]
    OR?: invoiceScalarWhereInput[]
    NOT?: invoiceScalarWhereInput | invoiceScalarWhereInput[]
    invoice_id?: IntFilter<"invoice"> | number
    customer_id?: IntFilter<"invoice"> | number
    invoice_date?: DateTimeFilter<"invoice"> | Date | string
    billing_address?: StringNullableFilter<"invoice"> | string | null
    billing_city?: StringNullableFilter<"invoice"> | string | null
    billing_state?: StringNullableFilter<"invoice"> | string | null
    billing_country?: StringNullableFilter<"invoice"> | string | null
    billing_postal_code?: StringNullableFilter<"invoice"> | string | null
    total?: DecimalFilter<"invoice"> | Decimal | DecimalJsLike | number | string
  }

  export type customerCreateWithoutEmployeeInput = {
    customer_id: number
    first_name: string
    last_name: string
    company?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email: string
    invoice?: invoiceCreateNestedManyWithoutCustomerInput
  }

  export type customerUncheckedCreateWithoutEmployeeInput = {
    customer_id: number
    first_name: string
    last_name: string
    company?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email: string
    invoice?: invoiceUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type customerCreateOrConnectWithoutEmployeeInput = {
    where: customerWhereUniqueInput
    create: XOR<customerCreateWithoutEmployeeInput, customerUncheckedCreateWithoutEmployeeInput>
  }

  export type customerCreateManyEmployeeInputEnvelope = {
    data: customerCreateManyEmployeeInput | customerCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type employeeCreateWithoutOther_employeeInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
    customer?: customerCreateNestedManyWithoutEmployeeInput
    employee?: employeeCreateNestedOneWithoutOther_employeeInput
  }

  export type employeeUncheckedCreateWithoutOther_employeeInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    reports_to?: number | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
    customer?: customerUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeeCreateOrConnectWithoutOther_employeeInput = {
    where: employeeWhereUniqueInput
    create: XOR<employeeCreateWithoutOther_employeeInput, employeeUncheckedCreateWithoutOther_employeeInput>
  }

  export type employeeCreateWithoutEmployeeInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
    customer?: customerCreateNestedManyWithoutEmployeeInput
    other_employee?: employeeCreateNestedManyWithoutEmployeeInput
  }

  export type employeeUncheckedCreateWithoutEmployeeInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
    customer?: customerUncheckedCreateNestedManyWithoutEmployeeInput
    other_employee?: employeeUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeeCreateOrConnectWithoutEmployeeInput = {
    where: employeeWhereUniqueInput
    create: XOR<employeeCreateWithoutEmployeeInput, employeeUncheckedCreateWithoutEmployeeInput>
  }

  export type employeeCreateManyEmployeeInputEnvelope = {
    data: employeeCreateManyEmployeeInput | employeeCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type customerUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: customerWhereUniqueInput
    update: XOR<customerUpdateWithoutEmployeeInput, customerUncheckedUpdateWithoutEmployeeInput>
    create: XOR<customerCreateWithoutEmployeeInput, customerUncheckedCreateWithoutEmployeeInput>
  }

  export type customerUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: customerWhereUniqueInput
    data: XOR<customerUpdateWithoutEmployeeInput, customerUncheckedUpdateWithoutEmployeeInput>
  }

  export type customerUpdateManyWithWhereWithoutEmployeeInput = {
    where: customerScalarWhereInput
    data: XOR<customerUpdateManyMutationInput, customerUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type customerScalarWhereInput = {
    AND?: customerScalarWhereInput | customerScalarWhereInput[]
    OR?: customerScalarWhereInput[]
    NOT?: customerScalarWhereInput | customerScalarWhereInput[]
    customer_id?: IntFilter<"customer"> | number
    first_name?: StringFilter<"customer"> | string
    last_name?: StringFilter<"customer"> | string
    company?: StringNullableFilter<"customer"> | string | null
    address?: StringNullableFilter<"customer"> | string | null
    city?: StringNullableFilter<"customer"> | string | null
    state?: StringNullableFilter<"customer"> | string | null
    country?: StringNullableFilter<"customer"> | string | null
    postal_code?: StringNullableFilter<"customer"> | string | null
    phone?: StringNullableFilter<"customer"> | string | null
    fax?: StringNullableFilter<"customer"> | string | null
    email?: StringFilter<"customer"> | string
    support_rep_id?: IntNullableFilter<"customer"> | number | null
  }

  export type employeeUpsertWithoutOther_employeeInput = {
    update: XOR<employeeUpdateWithoutOther_employeeInput, employeeUncheckedUpdateWithoutOther_employeeInput>
    create: XOR<employeeCreateWithoutOther_employeeInput, employeeUncheckedCreateWithoutOther_employeeInput>
    where?: employeeWhereInput
  }

  export type employeeUpdateToOneWithWhereWithoutOther_employeeInput = {
    where?: employeeWhereInput
    data: XOR<employeeUpdateWithoutOther_employeeInput, employeeUncheckedUpdateWithoutOther_employeeInput>
  }

  export type employeeUpdateWithoutOther_employeeInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: customerUpdateManyWithoutEmployeeNestedInput
    employee?: employeeUpdateOneWithoutOther_employeeNestedInput
  }

  export type employeeUncheckedUpdateWithoutOther_employeeInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    reports_to?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: customerUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type employeeUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: employeeWhereUniqueInput
    update: XOR<employeeUpdateWithoutEmployeeInput, employeeUncheckedUpdateWithoutEmployeeInput>
    create: XOR<employeeCreateWithoutEmployeeInput, employeeUncheckedCreateWithoutEmployeeInput>
  }

  export type employeeUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: employeeWhereUniqueInput
    data: XOR<employeeUpdateWithoutEmployeeInput, employeeUncheckedUpdateWithoutEmployeeInput>
  }

  export type employeeUpdateManyWithWhereWithoutEmployeeInput = {
    where: employeeScalarWhereInput
    data: XOR<employeeUpdateManyMutationInput, employeeUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type employeeScalarWhereInput = {
    AND?: employeeScalarWhereInput | employeeScalarWhereInput[]
    OR?: employeeScalarWhereInput[]
    NOT?: employeeScalarWhereInput | employeeScalarWhereInput[]
    employee_id?: IntFilter<"employee"> | number
    last_name?: StringFilter<"employee"> | string
    first_name?: StringFilter<"employee"> | string
    title?: StringNullableFilter<"employee"> | string | null
    reports_to?: IntNullableFilter<"employee"> | number | null
    birth_date?: DateTimeNullableFilter<"employee"> | Date | string | null
    hire_date?: DateTimeNullableFilter<"employee"> | Date | string | null
    address?: StringNullableFilter<"employee"> | string | null
    city?: StringNullableFilter<"employee"> | string | null
    state?: StringNullableFilter<"employee"> | string | null
    country?: StringNullableFilter<"employee"> | string | null
    postal_code?: StringNullableFilter<"employee"> | string | null
    phone?: StringNullableFilter<"employee"> | string | null
    fax?: StringNullableFilter<"employee"> | string | null
    email?: StringNullableFilter<"employee"> | string | null
  }

  export type trackCreateWithoutGenreInput = {
    track_id: number
    name: string
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineCreateNestedManyWithoutTrackInput
    playlist_track?: playlist_trackCreateNestedManyWithoutTrackInput
    album?: albumCreateNestedOneWithoutTrackInput
    media_type: media_typeCreateNestedOneWithoutTrackInput
  }

  export type trackUncheckedCreateWithoutGenreInput = {
    track_id: number
    name: string
    album_id?: number | null
    media_type_id: number
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedCreateNestedManyWithoutTrackInput
    playlist_track?: playlist_trackUncheckedCreateNestedManyWithoutTrackInput
  }

  export type trackCreateOrConnectWithoutGenreInput = {
    where: trackWhereUniqueInput
    create: XOR<trackCreateWithoutGenreInput, trackUncheckedCreateWithoutGenreInput>
  }

  export type trackCreateManyGenreInputEnvelope = {
    data: trackCreateManyGenreInput | trackCreateManyGenreInput[]
    skipDuplicates?: boolean
  }

  export type trackUpsertWithWhereUniqueWithoutGenreInput = {
    where: trackWhereUniqueInput
    update: XOR<trackUpdateWithoutGenreInput, trackUncheckedUpdateWithoutGenreInput>
    create: XOR<trackCreateWithoutGenreInput, trackUncheckedCreateWithoutGenreInput>
  }

  export type trackUpdateWithWhereUniqueWithoutGenreInput = {
    where: trackWhereUniqueInput
    data: XOR<trackUpdateWithoutGenreInput, trackUncheckedUpdateWithoutGenreInput>
  }

  export type trackUpdateManyWithWhereWithoutGenreInput = {
    where: trackScalarWhereInput
    data: XOR<trackUpdateManyMutationInput, trackUncheckedUpdateManyWithoutGenreInput>
  }

  export type customerCreateWithoutInvoiceInput = {
    customer_id: number
    first_name: string
    last_name: string
    company?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email: string
    employee?: employeeCreateNestedOneWithoutCustomerInput
  }

  export type customerUncheckedCreateWithoutInvoiceInput = {
    customer_id: number
    first_name: string
    last_name: string
    company?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email: string
    support_rep_id?: number | null
  }

  export type customerCreateOrConnectWithoutInvoiceInput = {
    where: customerWhereUniqueInput
    create: XOR<customerCreateWithoutInvoiceInput, customerUncheckedCreateWithoutInvoiceInput>
  }

  export type invoice_lineCreateWithoutInvoiceInput = {
    invoice_line_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
    track: trackCreateNestedOneWithoutInvoice_lineInput
  }

  export type invoice_lineUncheckedCreateWithoutInvoiceInput = {
    invoice_line_id: number
    track_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
  }

  export type invoice_lineCreateOrConnectWithoutInvoiceInput = {
    where: invoice_lineWhereUniqueInput
    create: XOR<invoice_lineCreateWithoutInvoiceInput, invoice_lineUncheckedCreateWithoutInvoiceInput>
  }

  export type invoice_lineCreateManyInvoiceInputEnvelope = {
    data: invoice_lineCreateManyInvoiceInput | invoice_lineCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type customerUpsertWithoutInvoiceInput = {
    update: XOR<customerUpdateWithoutInvoiceInput, customerUncheckedUpdateWithoutInvoiceInput>
    create: XOR<customerCreateWithoutInvoiceInput, customerUncheckedCreateWithoutInvoiceInput>
    where?: customerWhereInput
  }

  export type customerUpdateToOneWithWhereWithoutInvoiceInput = {
    where?: customerWhereInput
    data: XOR<customerUpdateWithoutInvoiceInput, customerUncheckedUpdateWithoutInvoiceInput>
  }

  export type customerUpdateWithoutInvoiceInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    employee?: employeeUpdateOneWithoutCustomerNestedInput
  }

  export type customerUncheckedUpdateWithoutInvoiceInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    support_rep_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type invoice_lineUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: invoice_lineWhereUniqueInput
    update: XOR<invoice_lineUpdateWithoutInvoiceInput, invoice_lineUncheckedUpdateWithoutInvoiceInput>
    create: XOR<invoice_lineCreateWithoutInvoiceInput, invoice_lineUncheckedCreateWithoutInvoiceInput>
  }

  export type invoice_lineUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: invoice_lineWhereUniqueInput
    data: XOR<invoice_lineUpdateWithoutInvoiceInput, invoice_lineUncheckedUpdateWithoutInvoiceInput>
  }

  export type invoice_lineUpdateManyWithWhereWithoutInvoiceInput = {
    where: invoice_lineScalarWhereInput
    data: XOR<invoice_lineUpdateManyMutationInput, invoice_lineUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type invoice_lineScalarWhereInput = {
    AND?: invoice_lineScalarWhereInput | invoice_lineScalarWhereInput[]
    OR?: invoice_lineScalarWhereInput[]
    NOT?: invoice_lineScalarWhereInput | invoice_lineScalarWhereInput[]
    invoice_line_id?: IntFilter<"invoice_line"> | number
    invoice_id?: IntFilter<"invoice_line"> | number
    track_id?: IntFilter<"invoice_line"> | number
    unit_price?: DecimalFilter<"invoice_line"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"invoice_line"> | number
  }

  export type invoiceCreateWithoutInvoice_lineInput = {
    invoice_id: number
    invoice_date: Date | string
    billing_address?: string | null
    billing_city?: string | null
    billing_state?: string | null
    billing_country?: string | null
    billing_postal_code?: string | null
    total: Decimal | DecimalJsLike | number | string
    customer: customerCreateNestedOneWithoutInvoiceInput
  }

  export type invoiceUncheckedCreateWithoutInvoice_lineInput = {
    invoice_id: number
    customer_id: number
    invoice_date: Date | string
    billing_address?: string | null
    billing_city?: string | null
    billing_state?: string | null
    billing_country?: string | null
    billing_postal_code?: string | null
    total: Decimal | DecimalJsLike | number | string
  }

  export type invoiceCreateOrConnectWithoutInvoice_lineInput = {
    where: invoiceWhereUniqueInput
    create: XOR<invoiceCreateWithoutInvoice_lineInput, invoiceUncheckedCreateWithoutInvoice_lineInput>
  }

  export type trackCreateWithoutInvoice_lineInput = {
    track_id: number
    name: string
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    playlist_track?: playlist_trackCreateNestedManyWithoutTrackInput
    album?: albumCreateNestedOneWithoutTrackInput
    genre?: genreCreateNestedOneWithoutTrackInput
    media_type: media_typeCreateNestedOneWithoutTrackInput
  }

  export type trackUncheckedCreateWithoutInvoice_lineInput = {
    track_id: number
    name: string
    album_id?: number | null
    media_type_id: number
    genre_id?: number | null
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    playlist_track?: playlist_trackUncheckedCreateNestedManyWithoutTrackInput
  }

  export type trackCreateOrConnectWithoutInvoice_lineInput = {
    where: trackWhereUniqueInput
    create: XOR<trackCreateWithoutInvoice_lineInput, trackUncheckedCreateWithoutInvoice_lineInput>
  }

  export type invoiceUpsertWithoutInvoice_lineInput = {
    update: XOR<invoiceUpdateWithoutInvoice_lineInput, invoiceUncheckedUpdateWithoutInvoice_lineInput>
    create: XOR<invoiceCreateWithoutInvoice_lineInput, invoiceUncheckedCreateWithoutInvoice_lineInput>
    where?: invoiceWhereInput
  }

  export type invoiceUpdateToOneWithWhereWithoutInvoice_lineInput = {
    where?: invoiceWhereInput
    data: XOR<invoiceUpdateWithoutInvoice_lineInput, invoiceUncheckedUpdateWithoutInvoice_lineInput>
  }

  export type invoiceUpdateWithoutInvoice_lineInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    customer?: customerUpdateOneRequiredWithoutInvoiceNestedInput
  }

  export type invoiceUncheckedUpdateWithoutInvoice_lineInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    customer_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type trackUpsertWithoutInvoice_lineInput = {
    update: XOR<trackUpdateWithoutInvoice_lineInput, trackUncheckedUpdateWithoutInvoice_lineInput>
    create: XOR<trackCreateWithoutInvoice_lineInput, trackUncheckedCreateWithoutInvoice_lineInput>
    where?: trackWhereInput
  }

  export type trackUpdateToOneWithWhereWithoutInvoice_lineInput = {
    where?: trackWhereInput
    data: XOR<trackUpdateWithoutInvoice_lineInput, trackUncheckedUpdateWithoutInvoice_lineInput>
  }

  export type trackUpdateWithoutInvoice_lineInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    playlist_track?: playlist_trackUpdateManyWithoutTrackNestedInput
    album?: albumUpdateOneWithoutTrackNestedInput
    genre?: genreUpdateOneWithoutTrackNestedInput
    media_type?: media_typeUpdateOneRequiredWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateWithoutInvoice_lineInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    album_id?: NullableIntFieldUpdateOperationsInput | number | null
    media_type_id?: IntFieldUpdateOperationsInput | number
    genre_id?: NullableIntFieldUpdateOperationsInput | number | null
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    playlist_track?: playlist_trackUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type trackCreateWithoutMedia_typeInput = {
    track_id: number
    name: string
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineCreateNestedManyWithoutTrackInput
    playlist_track?: playlist_trackCreateNestedManyWithoutTrackInput
    album?: albumCreateNestedOneWithoutTrackInput
    genre?: genreCreateNestedOneWithoutTrackInput
  }

  export type trackUncheckedCreateWithoutMedia_typeInput = {
    track_id: number
    name: string
    album_id?: number | null
    genre_id?: number | null
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedCreateNestedManyWithoutTrackInput
    playlist_track?: playlist_trackUncheckedCreateNestedManyWithoutTrackInput
  }

  export type trackCreateOrConnectWithoutMedia_typeInput = {
    where: trackWhereUniqueInput
    create: XOR<trackCreateWithoutMedia_typeInput, trackUncheckedCreateWithoutMedia_typeInput>
  }

  export type trackCreateManyMedia_typeInputEnvelope = {
    data: trackCreateManyMedia_typeInput | trackCreateManyMedia_typeInput[]
    skipDuplicates?: boolean
  }

  export type trackUpsertWithWhereUniqueWithoutMedia_typeInput = {
    where: trackWhereUniqueInput
    update: XOR<trackUpdateWithoutMedia_typeInput, trackUncheckedUpdateWithoutMedia_typeInput>
    create: XOR<trackCreateWithoutMedia_typeInput, trackUncheckedCreateWithoutMedia_typeInput>
  }

  export type trackUpdateWithWhereUniqueWithoutMedia_typeInput = {
    where: trackWhereUniqueInput
    data: XOR<trackUpdateWithoutMedia_typeInput, trackUncheckedUpdateWithoutMedia_typeInput>
  }

  export type trackUpdateManyWithWhereWithoutMedia_typeInput = {
    where: trackScalarWhereInput
    data: XOR<trackUpdateManyMutationInput, trackUncheckedUpdateManyWithoutMedia_typeInput>
  }

  export type playlist_trackCreateWithoutPlaylistInput = {
    track: trackCreateNestedOneWithoutPlaylist_trackInput
  }

  export type playlist_trackUncheckedCreateWithoutPlaylistInput = {
    track_id: number
  }

  export type playlist_trackCreateOrConnectWithoutPlaylistInput = {
    where: playlist_trackWhereUniqueInput
    create: XOR<playlist_trackCreateWithoutPlaylistInput, playlist_trackUncheckedCreateWithoutPlaylistInput>
  }

  export type playlist_trackCreateManyPlaylistInputEnvelope = {
    data: playlist_trackCreateManyPlaylistInput | playlist_trackCreateManyPlaylistInput[]
    skipDuplicates?: boolean
  }

  export type playlist_trackUpsertWithWhereUniqueWithoutPlaylistInput = {
    where: playlist_trackWhereUniqueInput
    update: XOR<playlist_trackUpdateWithoutPlaylistInput, playlist_trackUncheckedUpdateWithoutPlaylistInput>
    create: XOR<playlist_trackCreateWithoutPlaylistInput, playlist_trackUncheckedCreateWithoutPlaylistInput>
  }

  export type playlist_trackUpdateWithWhereUniqueWithoutPlaylistInput = {
    where: playlist_trackWhereUniqueInput
    data: XOR<playlist_trackUpdateWithoutPlaylistInput, playlist_trackUncheckedUpdateWithoutPlaylistInput>
  }

  export type playlist_trackUpdateManyWithWhereWithoutPlaylistInput = {
    where: playlist_trackScalarWhereInput
    data: XOR<playlist_trackUpdateManyMutationInput, playlist_trackUncheckedUpdateManyWithoutPlaylistInput>
  }

  export type playlist_trackScalarWhereInput = {
    AND?: playlist_trackScalarWhereInput | playlist_trackScalarWhereInput[]
    OR?: playlist_trackScalarWhereInput[]
    NOT?: playlist_trackScalarWhereInput | playlist_trackScalarWhereInput[]
    playlist_id?: IntFilter<"playlist_track"> | number
    track_id?: IntFilter<"playlist_track"> | number
  }

  export type playlistCreateWithoutPlaylist_trackInput = {
    playlist_id: number
    name?: string | null
  }

  export type playlistUncheckedCreateWithoutPlaylist_trackInput = {
    playlist_id: number
    name?: string | null
  }

  export type playlistCreateOrConnectWithoutPlaylist_trackInput = {
    where: playlistWhereUniqueInput
    create: XOR<playlistCreateWithoutPlaylist_trackInput, playlistUncheckedCreateWithoutPlaylist_trackInput>
  }

  export type trackCreateWithoutPlaylist_trackInput = {
    track_id: number
    name: string
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineCreateNestedManyWithoutTrackInput
    album?: albumCreateNestedOneWithoutTrackInput
    genre?: genreCreateNestedOneWithoutTrackInput
    media_type: media_typeCreateNestedOneWithoutTrackInput
  }

  export type trackUncheckedCreateWithoutPlaylist_trackInput = {
    track_id: number
    name: string
    album_id?: number | null
    media_type_id: number
    genre_id?: number | null
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedCreateNestedManyWithoutTrackInput
  }

  export type trackCreateOrConnectWithoutPlaylist_trackInput = {
    where: trackWhereUniqueInput
    create: XOR<trackCreateWithoutPlaylist_trackInput, trackUncheckedCreateWithoutPlaylist_trackInput>
  }

  export type playlistUpsertWithoutPlaylist_trackInput = {
    update: XOR<playlistUpdateWithoutPlaylist_trackInput, playlistUncheckedUpdateWithoutPlaylist_trackInput>
    create: XOR<playlistCreateWithoutPlaylist_trackInput, playlistUncheckedCreateWithoutPlaylist_trackInput>
    where?: playlistWhereInput
  }

  export type playlistUpdateToOneWithWhereWithoutPlaylist_trackInput = {
    where?: playlistWhereInput
    data: XOR<playlistUpdateWithoutPlaylist_trackInput, playlistUncheckedUpdateWithoutPlaylist_trackInput>
  }

  export type playlistUpdateWithoutPlaylist_trackInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playlistUncheckedUpdateWithoutPlaylist_trackInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type trackUpsertWithoutPlaylist_trackInput = {
    update: XOR<trackUpdateWithoutPlaylist_trackInput, trackUncheckedUpdateWithoutPlaylist_trackInput>
    create: XOR<trackCreateWithoutPlaylist_trackInput, trackUncheckedCreateWithoutPlaylist_trackInput>
    where?: trackWhereInput
  }

  export type trackUpdateToOneWithWhereWithoutPlaylist_trackInput = {
    where?: trackWhereInput
    data: XOR<trackUpdateWithoutPlaylist_trackInput, trackUncheckedUpdateWithoutPlaylist_trackInput>
  }

  export type trackUpdateWithoutPlaylist_trackInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUpdateManyWithoutTrackNestedInput
    album?: albumUpdateOneWithoutTrackNestedInput
    genre?: genreUpdateOneWithoutTrackNestedInput
    media_type?: media_typeUpdateOneRequiredWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateWithoutPlaylist_trackInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    album_id?: NullableIntFieldUpdateOperationsInput | number | null
    media_type_id?: IntFieldUpdateOperationsInput | number
    genre_id?: NullableIntFieldUpdateOperationsInput | number | null
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type invoice_lineCreateWithoutTrackInput = {
    invoice_line_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
    invoice: invoiceCreateNestedOneWithoutInvoice_lineInput
  }

  export type invoice_lineUncheckedCreateWithoutTrackInput = {
    invoice_line_id: number
    invoice_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
  }

  export type invoice_lineCreateOrConnectWithoutTrackInput = {
    where: invoice_lineWhereUniqueInput
    create: XOR<invoice_lineCreateWithoutTrackInput, invoice_lineUncheckedCreateWithoutTrackInput>
  }

  export type invoice_lineCreateManyTrackInputEnvelope = {
    data: invoice_lineCreateManyTrackInput | invoice_lineCreateManyTrackInput[]
    skipDuplicates?: boolean
  }

  export type playlist_trackCreateWithoutTrackInput = {
    playlist: playlistCreateNestedOneWithoutPlaylist_trackInput
  }

  export type playlist_trackUncheckedCreateWithoutTrackInput = {
    playlist_id: number
  }

  export type playlist_trackCreateOrConnectWithoutTrackInput = {
    where: playlist_trackWhereUniqueInput
    create: XOR<playlist_trackCreateWithoutTrackInput, playlist_trackUncheckedCreateWithoutTrackInput>
  }

  export type playlist_trackCreateManyTrackInputEnvelope = {
    data: playlist_trackCreateManyTrackInput | playlist_trackCreateManyTrackInput[]
    skipDuplicates?: boolean
  }

  export type albumCreateWithoutTrackInput = {
    album_id: number
    title: string
    artist: artistCreateNestedOneWithoutAlbumInput
  }

  export type albumUncheckedCreateWithoutTrackInput = {
    album_id: number
    title: string
    artist_id: number
  }

  export type albumCreateOrConnectWithoutTrackInput = {
    where: albumWhereUniqueInput
    create: XOR<albumCreateWithoutTrackInput, albumUncheckedCreateWithoutTrackInput>
  }

  export type genreCreateWithoutTrackInput = {
    genre_id: number
    name?: string | null
  }

  export type genreUncheckedCreateWithoutTrackInput = {
    genre_id: number
    name?: string | null
  }

  export type genreCreateOrConnectWithoutTrackInput = {
    where: genreWhereUniqueInput
    create: XOR<genreCreateWithoutTrackInput, genreUncheckedCreateWithoutTrackInput>
  }

  export type media_typeCreateWithoutTrackInput = {
    media_type_id: number
    name?: string | null
  }

  export type media_typeUncheckedCreateWithoutTrackInput = {
    media_type_id: number
    name?: string | null
  }

  export type media_typeCreateOrConnectWithoutTrackInput = {
    where: media_typeWhereUniqueInput
    create: XOR<media_typeCreateWithoutTrackInput, media_typeUncheckedCreateWithoutTrackInput>
  }

  export type invoice_lineUpsertWithWhereUniqueWithoutTrackInput = {
    where: invoice_lineWhereUniqueInput
    update: XOR<invoice_lineUpdateWithoutTrackInput, invoice_lineUncheckedUpdateWithoutTrackInput>
    create: XOR<invoice_lineCreateWithoutTrackInput, invoice_lineUncheckedCreateWithoutTrackInput>
  }

  export type invoice_lineUpdateWithWhereUniqueWithoutTrackInput = {
    where: invoice_lineWhereUniqueInput
    data: XOR<invoice_lineUpdateWithoutTrackInput, invoice_lineUncheckedUpdateWithoutTrackInput>
  }

  export type invoice_lineUpdateManyWithWhereWithoutTrackInput = {
    where: invoice_lineScalarWhereInput
    data: XOR<invoice_lineUpdateManyMutationInput, invoice_lineUncheckedUpdateManyWithoutTrackInput>
  }

  export type playlist_trackUpsertWithWhereUniqueWithoutTrackInput = {
    where: playlist_trackWhereUniqueInput
    update: XOR<playlist_trackUpdateWithoutTrackInput, playlist_trackUncheckedUpdateWithoutTrackInput>
    create: XOR<playlist_trackCreateWithoutTrackInput, playlist_trackUncheckedCreateWithoutTrackInput>
  }

  export type playlist_trackUpdateWithWhereUniqueWithoutTrackInput = {
    where: playlist_trackWhereUniqueInput
    data: XOR<playlist_trackUpdateWithoutTrackInput, playlist_trackUncheckedUpdateWithoutTrackInput>
  }

  export type playlist_trackUpdateManyWithWhereWithoutTrackInput = {
    where: playlist_trackScalarWhereInput
    data: XOR<playlist_trackUpdateManyMutationInput, playlist_trackUncheckedUpdateManyWithoutTrackInput>
  }

  export type albumUpsertWithoutTrackInput = {
    update: XOR<albumUpdateWithoutTrackInput, albumUncheckedUpdateWithoutTrackInput>
    create: XOR<albumCreateWithoutTrackInput, albumUncheckedCreateWithoutTrackInput>
    where?: albumWhereInput
  }

  export type albumUpdateToOneWithWhereWithoutTrackInput = {
    where?: albumWhereInput
    data: XOR<albumUpdateWithoutTrackInput, albumUncheckedUpdateWithoutTrackInput>
  }

  export type albumUpdateWithoutTrackInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist?: artistUpdateOneRequiredWithoutAlbumNestedInput
  }

  export type albumUncheckedUpdateWithoutTrackInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist_id?: IntFieldUpdateOperationsInput | number
  }

  export type genreUpsertWithoutTrackInput = {
    update: XOR<genreUpdateWithoutTrackInput, genreUncheckedUpdateWithoutTrackInput>
    create: XOR<genreCreateWithoutTrackInput, genreUncheckedCreateWithoutTrackInput>
    where?: genreWhereInput
  }

  export type genreUpdateToOneWithWhereWithoutTrackInput = {
    where?: genreWhereInput
    data: XOR<genreUpdateWithoutTrackInput, genreUncheckedUpdateWithoutTrackInput>
  }

  export type genreUpdateWithoutTrackInput = {
    genre_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type genreUncheckedUpdateWithoutTrackInput = {
    genre_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type media_typeUpsertWithoutTrackInput = {
    update: XOR<media_typeUpdateWithoutTrackInput, media_typeUncheckedUpdateWithoutTrackInput>
    create: XOR<media_typeCreateWithoutTrackInput, media_typeUncheckedCreateWithoutTrackInput>
    where?: media_typeWhereInput
  }

  export type media_typeUpdateToOneWithWhereWithoutTrackInput = {
    where?: media_typeWhereInput
    data: XOR<media_typeUpdateWithoutTrackInput, media_typeUncheckedUpdateWithoutTrackInput>
  }

  export type media_typeUpdateWithoutTrackInput = {
    media_type_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type media_typeUncheckedUpdateWithoutTrackInput = {
    media_type_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type trackCreateManyAlbumInput = {
    track_id: number
    name: string
    media_type_id: number
    genre_id?: number | null
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
  }

  export type trackUpdateWithoutAlbumInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUpdateManyWithoutTrackNestedInput
    playlist_track?: playlist_trackUpdateManyWithoutTrackNestedInput
    genre?: genreUpdateOneWithoutTrackNestedInput
    media_type?: media_typeUpdateOneRequiredWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateWithoutAlbumInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    media_type_id?: IntFieldUpdateOperationsInput | number
    genre_id?: NullableIntFieldUpdateOperationsInput | number | null
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedUpdateManyWithoutTrackNestedInput
    playlist_track?: playlist_trackUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateManyWithoutAlbumInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    media_type_id?: IntFieldUpdateOperationsInput | number
    genre_id?: NullableIntFieldUpdateOperationsInput | number | null
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type albumCreateManyArtistInput = {
    album_id: number
    title: string
  }

  export type albumUpdateWithoutArtistInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    track?: trackUpdateManyWithoutAlbumNestedInput
  }

  export type albumUncheckedUpdateWithoutArtistInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    track?: trackUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type albumUncheckedUpdateManyWithoutArtistInput = {
    album_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  }

  export type invoiceCreateManyCustomerInput = {
    invoice_id: number
    invoice_date: Date | string
    billing_address?: string | null
    billing_city?: string | null
    billing_state?: string | null
    billing_country?: string | null
    billing_postal_code?: string | null
    total: Decimal | DecimalJsLike | number | string
  }

  export type invoiceUpdateWithoutCustomerInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUpdateManyWithoutInvoiceNestedInput
  }

  export type invoiceUncheckedUpdateWithoutCustomerInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type invoiceUncheckedUpdateManyWithoutCustomerInput = {
    invoice_id?: IntFieldUpdateOperationsInput | number
    invoice_date?: DateTimeFieldUpdateOperationsInput | Date | string
    billing_address?: NullableStringFieldUpdateOperationsInput | string | null
    billing_city?: NullableStringFieldUpdateOperationsInput | string | null
    billing_state?: NullableStringFieldUpdateOperationsInput | string | null
    billing_country?: NullableStringFieldUpdateOperationsInput | string | null
    billing_postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type customerCreateManyEmployeeInput = {
    customer_id: number
    first_name: string
    last_name: string
    company?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email: string
  }

  export type employeeCreateManyEmployeeInput = {
    employee_id: number
    last_name: string
    first_name: string
    title?: string | null
    birth_date?: Date | string | null
    hire_date?: Date | string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    fax?: string | null
    email?: string | null
  }

  export type customerUpdateWithoutEmployeeInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    invoice?: invoiceUpdateManyWithoutCustomerNestedInput
  }

  export type customerUncheckedUpdateWithoutEmployeeInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    invoice?: invoiceUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type customerUncheckedUpdateManyWithoutEmployeeInput = {
    customer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
  }

  export type employeeUpdateWithoutEmployeeInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: customerUpdateManyWithoutEmployeeNestedInput
    other_employee?: employeeUpdateManyWithoutEmployeeNestedInput
  }

  export type employeeUncheckedUpdateWithoutEmployeeInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: customerUncheckedUpdateManyWithoutEmployeeNestedInput
    other_employee?: employeeUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type employeeUncheckedUpdateManyWithoutEmployeeInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    last_name?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fax?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type trackCreateManyGenreInput = {
    track_id: number
    name: string
    album_id?: number | null
    media_type_id: number
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
  }

  export type trackUpdateWithoutGenreInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUpdateManyWithoutTrackNestedInput
    playlist_track?: playlist_trackUpdateManyWithoutTrackNestedInput
    album?: albumUpdateOneWithoutTrackNestedInput
    media_type?: media_typeUpdateOneRequiredWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateWithoutGenreInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    album_id?: NullableIntFieldUpdateOperationsInput | number | null
    media_type_id?: IntFieldUpdateOperationsInput | number
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedUpdateManyWithoutTrackNestedInput
    playlist_track?: playlist_trackUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateManyWithoutGenreInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    album_id?: NullableIntFieldUpdateOperationsInput | number | null
    media_type_id?: IntFieldUpdateOperationsInput | number
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type invoice_lineCreateManyInvoiceInput = {
    invoice_line_id: number
    track_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
  }

  export type invoice_lineUpdateWithoutInvoiceInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    track?: trackUpdateOneRequiredWithoutInvoice_lineNestedInput
  }

  export type invoice_lineUncheckedUpdateWithoutInvoiceInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    track_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type invoice_lineUncheckedUpdateManyWithoutInvoiceInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    track_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type trackCreateManyMedia_typeInput = {
    track_id: number
    name: string
    album_id?: number | null
    genre_id?: number | null
    composer?: string | null
    milliseconds: number
    bytes?: number | null
    unit_price: Decimal | DecimalJsLike | number | string
  }

  export type trackUpdateWithoutMedia_typeInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUpdateManyWithoutTrackNestedInput
    playlist_track?: playlist_trackUpdateManyWithoutTrackNestedInput
    album?: albumUpdateOneWithoutTrackNestedInput
    genre?: genreUpdateOneWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateWithoutMedia_typeInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    album_id?: NullableIntFieldUpdateOperationsInput | number | null
    genre_id?: NullableIntFieldUpdateOperationsInput | number | null
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    invoice_line?: invoice_lineUncheckedUpdateManyWithoutTrackNestedInput
    playlist_track?: playlist_trackUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type trackUncheckedUpdateManyWithoutMedia_typeInput = {
    track_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    album_id?: NullableIntFieldUpdateOperationsInput | number | null
    genre_id?: NullableIntFieldUpdateOperationsInput | number | null
    composer?: NullableStringFieldUpdateOperationsInput | string | null
    milliseconds?: IntFieldUpdateOperationsInput | number
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type playlist_trackCreateManyPlaylistInput = {
    track_id: number
  }

  export type playlist_trackUpdateWithoutPlaylistInput = {
    track?: trackUpdateOneRequiredWithoutPlaylist_trackNestedInput
  }

  export type playlist_trackUncheckedUpdateWithoutPlaylistInput = {
    track_id?: IntFieldUpdateOperationsInput | number
  }

  export type playlist_trackUncheckedUpdateManyWithoutPlaylistInput = {
    track_id?: IntFieldUpdateOperationsInput | number
  }

  export type invoice_lineCreateManyTrackInput = {
    invoice_line_id: number
    invoice_id: number
    unit_price: Decimal | DecimalJsLike | number | string
    quantity: number
  }

  export type playlist_trackCreateManyTrackInput = {
    playlist_id: number
  }

  export type invoice_lineUpdateWithoutTrackInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    invoice?: invoiceUpdateOneRequiredWithoutInvoice_lineNestedInput
  }

  export type invoice_lineUncheckedUpdateWithoutTrackInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    invoice_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type invoice_lineUncheckedUpdateManyWithoutTrackInput = {
    invoice_line_id?: IntFieldUpdateOperationsInput | number
    invoice_id?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type playlist_trackUpdateWithoutTrackInput = {
    playlist?: playlistUpdateOneRequiredWithoutPlaylist_trackNestedInput
  }

  export type playlist_trackUncheckedUpdateWithoutTrackInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
  }

  export type playlist_trackUncheckedUpdateManyWithoutTrackInput = {
    playlist_id?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }
}