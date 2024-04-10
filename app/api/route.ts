import { NextResponse, NextRequest } from "next/server";
import { google } from "googleapis";

type sheetForm = {
  first_name: string;
  last_name: string;
  dob?: string;
  phone: string;
  email?: string;
  occupation?: string;
  memory?: string;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as sheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:G1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.first_name,
            body.last_name,
            body.phone,
            body.email,
            body.dob,
            body.occupation,
            body.memory,
          ],
        ],
      },
    });

    return new Response(
      JSON.stringify({
        body: {
          data: response.data,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
  }
}
