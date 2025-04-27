/* eslint-disable */
import type { Prisma, album, artist, customer, employee, genre, invoice, invoice_line, media_type, playlist, playlist_track, track } from "./prisma-client/index.js";
export default interface PrismaTypes {
    album: {
        Name: "album";
        Shape: album;
        Include: Prisma.albumInclude;
        Select: Prisma.albumSelect;
        OrderBy: Prisma.albumOrderByWithRelationInput;
        WhereUnique: Prisma.albumWhereUniqueInput;
        Where: Prisma.albumWhereInput;
        Create: {};
        Update: {};
        RelationName: "artist" | "track";
        ListRelations: "track";
        Relations: {
            artist: {
                Shape: artist;
                Name: "artist";
                Nullable: false;
            };
            track: {
                Shape: track[];
                Name: "track";
                Nullable: false;
            };
        };
    };
    artist: {
        Name: "artist";
        Shape: artist;
        Include: Prisma.artistInclude;
        Select: Prisma.artistSelect;
        OrderBy: Prisma.artistOrderByWithRelationInput;
        WhereUnique: Prisma.artistWhereUniqueInput;
        Where: Prisma.artistWhereInput;
        Create: {};
        Update: {};
        RelationName: "album";
        ListRelations: "album";
        Relations: {
            album: {
                Shape: album[];
                Name: "album";
                Nullable: false;
            };
        };
    };
    customer: {
        Name: "customer";
        Shape: customer;
        Include: Prisma.customerInclude;
        Select: Prisma.customerSelect;
        OrderBy: Prisma.customerOrderByWithRelationInput;
        WhereUnique: Prisma.customerWhereUniqueInput;
        Where: Prisma.customerWhereInput;
        Create: {};
        Update: {};
        RelationName: "employee" | "invoice";
        ListRelations: "invoice";
        Relations: {
            employee: {
                Shape: employee | null;
                Name: "employee";
                Nullable: true;
            };
            invoice: {
                Shape: invoice[];
                Name: "invoice";
                Nullable: false;
            };
        };
    };
    employee: {
        Name: "employee";
        Shape: employee;
        Include: Prisma.employeeInclude;
        Select: Prisma.employeeSelect;
        OrderBy: Prisma.employeeOrderByWithRelationInput;
        WhereUnique: Prisma.employeeWhereUniqueInput;
        Where: Prisma.employeeWhereInput;
        Create: {};
        Update: {};
        RelationName: "customer" | "employee" | "other_employee";
        ListRelations: "customer" | "other_employee";
        Relations: {
            customer: {
                Shape: customer[];
                Name: "customer";
                Nullable: false;
            };
            employee: {
                Shape: employee | null;
                Name: "employee";
                Nullable: true;
            };
            other_employee: {
                Shape: employee[];
                Name: "employee";
                Nullable: false;
            };
        };
    };
    genre: {
        Name: "genre";
        Shape: genre;
        Include: Prisma.genreInclude;
        Select: Prisma.genreSelect;
        OrderBy: Prisma.genreOrderByWithRelationInput;
        WhereUnique: Prisma.genreWhereUniqueInput;
        Where: Prisma.genreWhereInput;
        Create: {};
        Update: {};
        RelationName: "track";
        ListRelations: "track";
        Relations: {
            track: {
                Shape: track[];
                Name: "track";
                Nullable: false;
            };
        };
    };
    invoice: {
        Name: "invoice";
        Shape: invoice;
        Include: Prisma.invoiceInclude;
        Select: Prisma.invoiceSelect;
        OrderBy: Prisma.invoiceOrderByWithRelationInput;
        WhereUnique: Prisma.invoiceWhereUniqueInput;
        Where: Prisma.invoiceWhereInput;
        Create: {};
        Update: {};
        RelationName: "customer" | "invoice_line";
        ListRelations: "invoice_line";
        Relations: {
            customer: {
                Shape: customer;
                Name: "customer";
                Nullable: false;
            };
            invoice_line: {
                Shape: invoice_line[];
                Name: "invoice_line";
                Nullable: false;
            };
        };
    };
    invoice_line: {
        Name: "invoice_line";
        Shape: invoice_line;
        Include: Prisma.invoice_lineInclude;
        Select: Prisma.invoice_lineSelect;
        OrderBy: Prisma.invoice_lineOrderByWithRelationInput;
        WhereUnique: Prisma.invoice_lineWhereUniqueInput;
        Where: Prisma.invoice_lineWhereInput;
        Create: {};
        Update: {};
        RelationName: "invoice" | "track";
        ListRelations: never;
        Relations: {
            invoice: {
                Shape: invoice;
                Name: "invoice";
                Nullable: false;
            };
            track: {
                Shape: track;
                Name: "track";
                Nullable: false;
            };
        };
    };
    media_type: {
        Name: "media_type";
        Shape: media_type;
        Include: Prisma.media_typeInclude;
        Select: Prisma.media_typeSelect;
        OrderBy: Prisma.media_typeOrderByWithRelationInput;
        WhereUnique: Prisma.media_typeWhereUniqueInput;
        Where: Prisma.media_typeWhereInput;
        Create: {};
        Update: {};
        RelationName: "track";
        ListRelations: "track";
        Relations: {
            track: {
                Shape: track[];
                Name: "track";
                Nullable: false;
            };
        };
    };
    playlist: {
        Name: "playlist";
        Shape: playlist;
        Include: Prisma.playlistInclude;
        Select: Prisma.playlistSelect;
        OrderBy: Prisma.playlistOrderByWithRelationInput;
        WhereUnique: Prisma.playlistWhereUniqueInput;
        Where: Prisma.playlistWhereInput;
        Create: {};
        Update: {};
        RelationName: "playlist_track";
        ListRelations: "playlist_track";
        Relations: {
            playlist_track: {
                Shape: playlist_track[];
                Name: "playlist_track";
                Nullable: false;
            };
        };
    };
    playlist_track: {
        Name: "playlist_track";
        Shape: playlist_track;
        Include: Prisma.playlist_trackInclude;
        Select: Prisma.playlist_trackSelect;
        OrderBy: Prisma.playlist_trackOrderByWithRelationInput;
        WhereUnique: Prisma.playlist_trackWhereUniqueInput;
        Where: Prisma.playlist_trackWhereInput;
        Create: {};
        Update: {};
        RelationName: "playlist" | "track";
        ListRelations: never;
        Relations: {
            playlist: {
                Shape: playlist;
                Name: "playlist";
                Nullable: false;
            };
            track: {
                Shape: track;
                Name: "track";
                Nullable: false;
            };
        };
    };
    track: {
        Name: "track";
        Shape: track;
        Include: Prisma.trackInclude;
        Select: Prisma.trackSelect;
        OrderBy: Prisma.trackOrderByWithRelationInput;
        WhereUnique: Prisma.trackWhereUniqueInput;
        Where: Prisma.trackWhereInput;
        Create: {};
        Update: {};
        RelationName: "invoice_line" | "playlist_track" | "album" | "genre" | "media_type";
        ListRelations: "invoice_line" | "playlist_track";
        Relations: {
            invoice_line: {
                Shape: invoice_line[];
                Name: "invoice_line";
                Nullable: false;
            };
            playlist_track: {
                Shape: playlist_track[];
                Name: "playlist_track";
                Nullable: false;
            };
            album: {
                Shape: album | null;
                Name: "album";
                Nullable: true;
            };
            genre: {
                Shape: genre | null;
                Name: "genre";
                Nullable: true;
            };
            media_type: {
                Shape: media_type;
                Name: "media_type";
                Nullable: false;
            };
        };
    };
}