import { source_types } from '@/lib/categories';
import { tool as createTool } from 'ai';
import { z } from 'zod';

const sourceTypeValues = source_types.map(src => src.value) as [string, ...string[]];

const byDateSample = [
            {
                "date": "2025-08-01",
                "volume": {
                    "positive": 23,
                    "negative": 6,
                    "neutral": 6
                },
                "reach": {
                    "positive": 140715,
                    "negative": 5779,
                    "neutral": 1977294
                }
            },
            {
                "date": "2025-08-02",
                "volume": {
                    "positive": 7,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 45797,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-03",
                "volume": {
                    "positive": 5,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 18989,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-04",
                "volume": {
                    "positive": 12,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 425925,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-05",
                "volume": {
                    "positive": 26,
                    "negative": 1,
                    "neutral": 2
                },
                "reach": {
                    "positive": 26907438,
                    "negative": 55,
                    "neutral": 3655
                }
            },
            {
                "date": "2025-08-06",
                "volume": {
                    "positive": 30,
                    "negative": 2,
                    "neutral": 0
                },
                "reach": {
                    "positive": 650457,
                    "negative": 213873,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-07",
                "volume": {
                    "positive": 27,
                    "negative": 0,
                    "neutral": 2
                },
                "reach": {
                    "positive": 206496,
                    "negative": 0,
                    "neutral": 44356
                }
            },
            {
                "date": "2025-08-08",
                "volume": {
                    "positive": 13,
                    "negative": 1,
                    "neutral": 6
                },
                "reach": {
                    "positive": 547633,
                    "negative": 25019,
                    "neutral": 840
                }
            },
            {
                "date": "2025-08-09",
                "volume": {
                    "positive": 1,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 24924,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-10",
                "volume": {
                    "positive": 3,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 32257,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-11",
                "volume": {
                    "positive": 4,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 147716,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-12",
                "volume": {
                    "positive": 20,
                    "negative": 0,
                    "neutral": 3
                },
                "reach": {
                    "positive": 472243,
                    "negative": 0,
                    "neutral": 749113
                }
            },
            {
                "date": "2025-08-13",
                "volume": {
                    "positive": 10,
                    "negative": 2,
                    "neutral": 5
                },
                "reach": {
                    "positive": 85947,
                    "negative": 4322,
                    "neutral": 12105
                }
            },
            {
                "date": "2025-08-14",
                "volume": {
                    "positive": 22,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 467947,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-15",
                "volume": {
                    "positive": 3,
                    "negative": 1,
                    "neutral": 1
                },
                "reach": {
                    "positive": 1680,
                    "negative": 352,
                    "neutral": 43573
                }
            },
            {
                "date": "2025-08-16",
                "volume": {
                    "positive": 2,
                    "negative": 0,
                    "neutral": 1
                },
                "reach": {
                    "positive": 35369,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-17",
                "volume": {
                    "positive": 3,
                    "negative": 2,
                    "neutral": 0
                },
                "reach": {
                    "positive": 16436,
                    "negative": 16738586,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-18",
                "volume": {
                    "positive": 9,
                    "negative": 0,
                    "neutral": 43
                },
                "reach": {
                    "positive": 1398133,
                    "negative": 0,
                    "neutral": 2817582
                }
            },
            {
                "date": "2025-08-19",
                "volume": {
                    "positive": 8,
                    "negative": 7,
                    "neutral": 5
                },
                "reach": {
                    "positive": 1011795,
                    "negative": 64983,
                    "neutral": 1349508
                }
            },
            {
                "date": "2025-08-20",
                "volume": {
                    "positive": 10,
                    "negative": 4,
                    "neutral": 6
                },
                "reach": {
                    "positive": 431970,
                    "negative": 13117,
                    "neutral": 1543776
                }
            },
            {
                "date": "2025-08-21",
                "volume": {
                    "positive": 21,
                    "negative": 0,
                    "neutral": 2
                },
                "reach": {
                    "positive": 7013497,
                    "negative": 0,
                    "neutral": 707944
                }
            },
            {
                "date": "2025-08-22",
                "volume": {
                    "positive": 5,
                    "negative": 0,
                    "neutral": 2
                },
                "reach": {
                    "positive": 80587,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-23",
                "volume": {
                    "positive": 4,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 19772,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-24",
                "volume": {
                    "positive": 0,
                    "negative": 1,
                    "neutral": 1
                },
                "reach": {
                    "positive": 0,
                    "negative": 213501,
                    "neutral": 111
                }
            },
            {
                "date": "2025-08-25",
                "volume": {
                    "positive": 4,
                    "negative": 0,
                    "neutral": 2
                },
                "reach": {
                    "positive": 31570,
                    "negative": 0,
                    "neutral": 45538
                }
            },
            {
                "date": "2025-08-26",
                "volume": {
                    "positive": 28,
                    "negative": 1,
                    "neutral": 19
                },
                "reach": {
                    "positive": 520137,
                    "negative": 1034233,
                    "neutral": 391123
                }
            },
            {
                "date": "2025-08-27",
                "volume": {
                    "positive": 8,
                    "negative": 3,
                    "neutral": 1
                },
                "reach": {
                    "positive": 189145,
                    "negative": 6076,
                    "neutral": 2404
                }
            },
            {
                "date": "2025-08-28",
                "volume": {
                    "positive": 10,
                    "negative": 1,
                    "neutral": 4
                },
                "reach": {
                    "positive": 84890,
                    "negative": 4076,
                    "neutral": 140471
                }
            },
            {
                "date": "2025-08-29",
                "volume": {
                    "positive": 10,
                    "negative": 1,
                    "neutral": 2
                },
                "reach": {
                    "positive": 94817,
                    "negative": 0,
                    "neutral": 705540
                }
            },
            {
                "date": "2025-08-30",
                "volume": {
                    "positive": 3,
                    "negative": 0,
                    "neutral": 1
                },
                "reach": {
                    "positive": 70587,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-08-31",
                "volume": {
                    "positive": 2,
                    "negative": 1,
                    "neutral": 1
                },
                "reach": {
                    "positive": 3247,
                    "negative": 0,
                    "neutral": 43573
                }
            },
            {
                "date": "2025-09-01",
                "volume": {
                    "positive": 18,
                    "negative": 0,
                    "neutral": 4
                },
                "reach": {
                    "positive": 488612,
                    "negative": 0,
                    "neutral": 4225037
                }
            },
            {
                "date": "2025-09-02",
                "volume": {
                    "positive": 11,
                    "negative": 3,
                    "neutral": 3
                },
                "reach": {
                    "positive": 134627,
                    "negative": 163871,
                    "neutral": 34124
                }
            },
            {
                "date": "2025-09-03",
                "volume": {
                    "positive": 29,
                    "negative": 1,
                    "neutral": 26
                },
                "reach": {
                    "positive": 19276728,
                    "negative": 83,
                    "neutral": 9854017
                }
            },
            {
                "date": "2025-09-04",
                "volume": {
                    "positive": 14,
                    "negative": 0,
                    "neutral": 1
                },
                "reach": {
                    "positive": 398639,
                    "negative": 0,
                    "neutral": 1983
                }
            },
            {
                "date": "2025-09-05",
                "volume": {
                    "positive": 39,
                    "negative": 0,
                    "neutral": 2
                },
                "reach": {
                    "positive": 19420031,
                    "negative": 0,
                    "neutral": 51768
                }
            },
            {
                "date": "2025-09-06",
                "volume": {
                    "positive": 6,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 86254,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-07",
                "volume": {
                    "positive": 1,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 0,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-08",
                "volume": {
                    "positive": 10,
                    "negative": 0,
                    "neutral": 1
                },
                "reach": {
                    "positive": 97739,
                    "negative": 0,
                    "neutral": 377382
                }
            },
            {
                "date": "2025-09-09",
                "volume": {
                    "positive": 26,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 333848,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-10",
                "volume": {
                    "positive": 16,
                    "negative": 1,
                    "neutral": 5
                },
                "reach": {
                    "positive": 319058,
                    "negative": 6592,
                    "neutral": 190682
                }
            },
            {
                "date": "2025-09-11",
                "volume": {
                    "positive": 33,
                    "negative": 3,
                    "neutral": 1
                },
                "reach": {
                    "positive": 32665874,
                    "negative": 12508486,
                    "neutral": 62
                }
            },
            {
                "date": "2025-09-12",
                "volume": {
                    "positive": 41,
                    "negative": 5,
                    "neutral": 4
                },
                "reach": {
                    "positive": 19574981,
                    "negative": 252344,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-13",
                "volume": {
                    "positive": 7,
                    "negative": 856,
                    "neutral": 3
                },
                "reach": {
                    "positive": 1040140,
                    "negative": 25924315,
                    "neutral": 72194
                }
            },
            {
                "date": "2025-09-14",
                "volume": {
                    "positive": 5,
                    "negative": 238,
                    "neutral": 0
                },
                "reach": {
                    "positive": 38124,
                    "negative": 42269282,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-15",
                "volume": {
                    "positive": 26,
                    "negative": 76,
                    "neutral": 0
                },
                "reach": {
                    "positive": 812866,
                    "negative": 1402931,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-16",
                "volume": {
                    "positive": 19,
                    "negative": 8,
                    "neutral": 2
                },
                "reach": {
                    "positive": 118921,
                    "negative": 468668,
                    "neutral": 48947
                }
            },
            {
                "date": "2025-09-17",
                "volume": {
                    "positive": 14,
                    "negative": 4,
                    "neutral": 0
                },
                "reach": {
                    "positive": 45959600,
                    "negative": 13174,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-18",
                "volume": {
                    "positive": 20,
                    "negative": 6,
                    "neutral": 27
                },
                "reach": {
                    "positive": 491051,
                    "negative": 306252,
                    "neutral": 1050526
                }
            },
            {
                "date": "2025-09-19",
                "volume": {
                    "positive": 51,
                    "negative": 10,
                    "neutral": 9
                },
                "reach": {
                    "positive": 1121174,
                    "negative": 838761,
                    "neutral": 229794
                }
            },
            {
                "date": "2025-09-20",
                "volume": {
                    "positive": 4,
                    "negative": 1,
                    "neutral": 1
                },
                "reach": {
                    "positive": 52288,
                    "negative": 1936,
                    "neutral": 5229
                }
            },
            {
                "date": "2025-09-21",
                "volume": {
                    "positive": 2,
                    "negative": 2,
                    "neutral": 2
                },
                "reach": {
                    "positive": 4000,
                    "negative": 62993,
                    "neutral": 45532
                }
            },
            {
                "date": "2025-09-22",
                "volume": {
                    "positive": 24,
                    "negative": 1,
                    "neutral": 1
                },
                "reach": {
                    "positive": 1395863,
                    "negative": 18538,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-23",
                "volume": {
                    "positive": 22,
                    "negative": 1,
                    "neutral": 2
                },
                "reach": {
                    "positive": 6528895,
                    "negative": 11638,
                    "neutral": 606
                }
            },
            {
                "date": "2025-09-24",
                "volume": {
                    "positive": 37,
                    "negative": 3,
                    "neutral": 5
                },
                "reach": {
                    "positive": 1097918,
                    "negative": 4532,
                    "neutral": 67909
                }
            },
            {
                "date": "2025-09-25",
                "volume": {
                    "positive": 27,
                    "negative": 1,
                    "neutral": 7
                },
                "reach": {
                    "positive": 33459549,
                    "negative": 12101,
                    "neutral": 38128
                }
            },
            {
                "date": "2025-09-26",
                "volume": {
                    "positive": 49,
                    "negative": 1,
                    "neutral": 2
                },
                "reach": {
                    "positive": 4510011,
                    "negative": 2122,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-27",
                "volume": {
                    "positive": 3,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 44610,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-28",
                "volume": {
                    "positive": 38,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 47188694,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-09-29",
                "volume": {
                    "positive": 17,
                    "negative": 1,
                    "neutral": 3
                },
                "reach": {
                    "positive": 965216,
                    "negative": 12101,
                    "neutral": 1833
                }
            },
            {
                "date": "2025-09-30",
                "volume": {
                    "positive": 8,
                    "negative": 7,
                    "neutral": 5
                },
                "reach": {
                    "positive": 270580,
                    "negative": 440144,
                    "neutral": 508101
                }
            },
            {
                "date": "2025-10-01",
                "volume": {
                    "positive": 14,
                    "negative": 0,
                    "neutral": 5
                },
                "reach": {
                    "positive": 750380,
                    "negative": 0,
                    "neutral": 192830
                }
            },
            {
                "date": "2025-10-02",
                "volume": {
                    "positive": 8,
                    "negative": 2,
                    "neutral": 0
                },
                "reach": {
                    "positive": 90058,
                    "negative": 28691,
                    "neutral": 0
                }
            },
            {
                "date": "2025-10-03",
                "volume": {
                    "positive": 11,
                    "negative": 0,
                    "neutral": 1
                },
                "reach": {
                    "positive": 386630,
                    "negative": 0,
                    "neutral": 148
                }
            },
            {
                "date": "2025-10-04",
                "volume": {
                    "positive": 4,
                    "negative": 1,
                    "neutral": 0
                },
                "reach": {
                    "positive": 44639,
                    "negative": 345,
                    "neutral": 0
                }
            },
            {
                "date": "2025-10-05",
                "volume": {
                    "positive": 2,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 22738,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-10-06",
                "volume": {
                    "positive": 4,
                    "negative": 0,
                    "neutral": 9
                },
                "reach": {
                    "positive": 56106,
                    "negative": 0,
                    "neutral": 1371335
                }
            },
            {
                "date": "2025-10-07",
                "volume": {
                    "positive": 19,
                    "negative": 0,
                    "neutral": 4
                },
                "reach": {
                    "positive": 1782065,
                    "negative": 0,
                    "neutral": 43209
                }
            },
            {
                "date": "2025-10-08",
                "volume": {
                    "positive": 9,
                    "negative": 0,
                    "neutral": 1
                },
                "reach": {
                    "positive": 127536,
                    "negative": 0,
                    "neutral": 854902
                }
            },
            {
                "date": "2025-10-09",
                "volume": {
                    "positive": 12,
                    "negative": 0,
                    "neutral": 3
                },
                "reach": {
                    "positive": 442522,
                    "negative": 0,
                    "neutral": 9879
                }
            },
            {
                "date": "2025-10-10",
                "volume": {
                    "positive": 14,
                    "negative": 1,
                    "neutral": 9
                },
                "reach": {
                    "positive": 243299,
                    "negative": 804,
                    "neutral": 638820
                }
            },
            {
                "date": "2025-10-11",
                "volume": {
                    "positive": 3,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 13750,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-10-13",
                "volume": {
                    "positive": 13,
                    "negative": 0,
                    "neutral": 1
                },
                "reach": {
                    "positive": 2308389,
                    "negative": 0,
                    "neutral": 0
                }
            },
            {
                "date": "2025-10-14",
                "volume": {
                    "positive": 15,
                    "negative": 1,
                    "neutral": 153
                },
                "reach": {
                    "positive": 334275,
                    "negative": 372,
                    "neutral": 780576
                }
            },
            {
                "date": "2025-10-15",
                "volume": {
                    "positive": 5,
                    "negative": 0,
                    "neutral": 0
                },
                "reach": {
                    "positive": 56640,
                    "negative": 0,
                    "neutral": 0
                }
            }
        ]

export function getEvolutionTool(collection: string) {
    return createTool({
        description: `
        Provides a summary of the evolution of sentiment over a specified date range.
        Use this tool when the user asks about trends, evolution or progression of posts over a certain period, such as "How did the conversation evolved?" or "How many posts were created in the past week?".
        `,
        inputSchema: z.object({
            from: z.string().regex(/^\d{8}$/, "incorrect format").describe("start date for the date range"),
            to: z.string().regex(/^\d{8}$/, "incorrect format").describe("end date for the date range"),
            source_types: z.array(z.enum(sourceTypeValues)).default([]),
            sentiments: z.array(z.union([z.literal(-5), z.literal(0), z.literal(5)])).default([]).describe("sentiments for the posts within the date range. 5 for positive, 0 for neutral, -5 for negative"),
            countries: z.array(z.string()).default([])
        }),
        execute: async () => {
            try {
                const data = {
                    data: byDateSample,
                    totals: {
                        volume: 27680,
                        reach: 420082141,
                        engagement: 18862
                    },
                    title: "Evolución en el período",
                    description: "Evolución del volumen y alcance por sentimiento"
                };
                console.log("Aggregated posts data:", data);
                return data
            } catch (error) {
                console.error("Error fetching aggregated posts:", error);
                return { summary: "Failed to fetch aggregated posts.", data: [] };
            }
        }
    })
}

export function getTopPostsTool(collection: string) {
    console.log("Creating getTopPostsTool for collection:", collection);
    return createTool({
        description: `
        Provides a list of the top 5 posts based on reach within a specified date range.
        Use this tool when the user asks for the most influential or popular posts over a certain period, such as "What were the top posts last month?" or "Show me the most engaging content from the past week".
        `,
        inputSchema: z.object({
            from: z.string().regex(/^\d{8}$/, "incorrect format").describe("start date for the date range"),
            to: z.string().regex(/^\d{8}$/, "incorrect format").describe("end date for the date range"),
            source_types: z.array(z.enum(source_types.map(src => src.value) as [string, ...string[]])).default([]),
            sentiments: z.array(z.union([z.literal(-5), z.literal(0), z.literal(5)])).default([]).describe("sentiments for the posts within the date range. 5 for positive, 0 for neutral, -5 for negative"),
            countries: z.array(z.string()).default([])
        }),
        execute: async () => {
            try {
        const data = {
    posts: [
        {
            _id: "69122b5e0c75363c653b744c",
            url: "http://twitter.com/grok/status/1958447598500815313",
            published: "20250821",
            title: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            content: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            reach: 6037307,
            sentiment: 5,
            source_type: "twitter",
            dimension: "institucional",
            stakeholder: "empresa",
            speaker: null,
            is_owned: false,
            author: {
                id: "tw:1720665183188922368",
                name: "Grok",
                short_name: "grok",
                description: "https://t.co/fqNKQSiLQB @grok it",
                gender: "unknown",
                image_url: "http://pbs.twimg.com/profile_images/1893219113717342208/Vgg2hEPa_normal.jpg",
                url: "http://twitter.com/grok/"
            },
            engagement: {
                total: 0,
                num_comments: 0,
                shares: 0,
                likes: 0,
                retweets: 0,
                quotes: 0,
                replies: 0,
                impressions: 0,
                video_views: 0
            }
        },
        {
            _id: "69122b5e0c75363c653b744c",
            url: "http://twitter.com/grok/status/1958447598500815313",
            published: "20250821",
            title: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            content: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            reach: 6037307,
            sentiment: 5,
            source_type: "twitter",
            dimension: "institucional",
            stakeholder: "empresa",
            speaker: null,
            is_owned: false,
            author: {
                id: "tw:1720665183188922368",
                name: "Grok",
                short_name: "grok",
                description: "https://t.co/fqNKQSiLQB @grok it",
                gender: "unknown",
                image_url: "http://pbs.twimg.com/profile_images/1893219113717342208/Vgg2hEPa_normal.jpg",
                url: "http://twitter.com/grok/"
            },
            engagement: {
                total: 0,
                num_comments: 0,
                shares: 0,
                likes: 0,
                retweets: 0,
                quotes: 0,
                replies: 0,
                impressions: 0,
                video_views: 0
            }
        },
        {
            _id: "69122b5e0c75363c653b744c",
            url: "http://twitter.com/grok/status/1958447598500815313",
            published: "20250821",
            title: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            content: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            reach: 6037307,
            sentiment: 5,
            source_type: "twitter",
            dimension: "institucional",
            stakeholder: "empresa",
            speaker: null,
            is_owned: false,
            author: {
                id: "tw:1720665183188922368",
                name: "Grok",
                short_name: "grok",
                description: "https://t.co/fqNKQSiLQB @grok it",
                gender: "unknown",
                image_url: "http://pbs.twimg.com/profile_images/1893219113717342208/Vgg2hEPa_normal.jpg",
                url: "http://twitter.com/grok/"
            },
            engagement: {
                total: 0,
                num_comments: 0,
                shares: 0,
                likes: 0,
                retweets: 0,
                quotes: 0,
                replies: 0,
                impressions: 0,
                video_views: 0
            }
        },
        {
            _id: "69122b5e0c75363c653b744c",
            url: "http://twitter.com/grok/status/1958447598500815313",
            published: "20250821",
            title: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            content: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            reach: 6037307,
            sentiment: 5,
            source_type: "twitter",
            dimension: "institucional",
            stakeholder: "empresa",
            speaker: null,
            is_owned: false,
            author: {
                id: "tw:1720665183188922368",
                name: "Grok",
                short_name: "grok",
                description: "https://t.co/fqNKQSiLQB @grok it",
                gender: "unknown",
                image_url: "http://pbs.twimg.com/profile_images/1893219113717342208/Vgg2hEPa_normal.jpg",
                url: "http://twitter.com/grok/"
            },
            engagement: {
                total: 0,
                num_comments: 0,
                shares: 0,
                likes: 0,
                retweets: 0,
                quotes: 0,
                replies: 0,
                impressions: 0,
                video_views: 0
            }
        },
        {
            _id: "69122b5e0c75363c653b744c",
            url: "http://twitter.com/grok/status/1958447598500815313",
            published: "20250821",
            title: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            content: "@8lack5py @JoelOptimist1 US: Zoetis, Merck Animal Health, Boehringer Ingelheim, Elanco, Phibro. Brazil: Vaccinar, Inata Biológicos, Biogénesis-Bagó, Vaxxinova. EU: Boehringer Ingelheim, Ceva, HIPRA, Virbac, Dechra. China: Jinyu Bio-technology, Pulike, Shandong Sinder, QYH. Japan: KM Biologics, Kyoritsu Seiyaku, Meiji Seika Pharma. Argentina: Biogénesis-Bagó, Laboratorios Aviar, PLATALAB, Tecnovax. India: Hester Biosciences, Venkys, Indian Immunologicals. Turkey: Vetal, Medicavet, Huvepharma. Middle East: MEVAC, Ceva, MSD Animal Health.",
            reach: 6037307,
            sentiment: 5,
            source_type: "twitter",
            dimension: "institucional",
            stakeholder: "empresa",
            speaker: null,
            is_owned: false,
            author: {
                id: "tw:1720665183188922368",
                name: "Grok",
                short_name: "grok",
                description: "https://t.co/fqNKQSiLQB @grok it",
                gender: "unknown",
                image_url: "http://pbs.twimg.com/profile_images/1893219113717342208/Vgg2hEPa_normal.jpg",
                url: "http://twitter.com/grok/"
            },
            engagement: {
                total: 0,
                num_comments: 0,
                shares: 0,
                likes: 0,
                retweets: 0,
                quotes: 0,
                replies: 0,
                impressions: 0,
                video_views: 0
            }
        },
    ],
    totalCount: 48,
    totalPages: 10,
    currentPage: 1,
    pageSize: 5
};
        return {
          data: data.posts,
          title: "Evolución en el período",
          description: "Evolución del volumen y alcance por sentimiento" 
        };
      } catch (error) {
        console.error("Error fetching aggregated posts:", error);
        return { summary: "Failed to fetch aggregated posts.", data: [] };
      }
    },
  });
}

export function getSemantiSearchTool(query: string) {
    return createTool({
        description: `
        Retrieve relevant product info for sales reps. Return all fields for the LLM to summarize.
        `,
        inputSchema: z.object({
            query: z.array(z.string())
        }),
        execute: async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/api/bot/search`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });
                if (!response.ok) throw new Error(`API error: ${response.statusText}`);
                const data = await response.json();

                // Return all fields, not just a subset
                const results = data.results ?? data.vectorSearchResult ?? [];
                return results;
            } catch (error: unknown) {
                console.error(error);
                return { error };
            }
        }
    })
}