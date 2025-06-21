import { google, sheets_v4 } from 'googleapis';
import { InsertContactRequest } from '@shared/schema';

export interface GoogleSheetsConfig {
  credentials: {
    client_email: string;
    private_key: string;
  };
  spreadsheetId: string;
}

export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private spreadsheetId: string;

  constructor(config: GoogleSheetsConfig) {
    const auth = new google.auth.JWT({
      email: config.credentials.client_email,
      key: config.credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = config.spreadsheetId;
  }

  /**
   * Add a new contact request to the Google Sheet
   */
  async addContactRequest(data: InsertContactRequest, photoUrl?: string): Promise<void> {
    try {
      // Format photo URL as a clickable hyperlink if it exists
      let photoCell = '';
      if (photoUrl) {
        // Use a HYPERLINK formula with a descriptive label
        photoCell = `=HYPERLINK("${photoUrl}", "View Property Photo")`;
      }

      // Format the row with contact request data
      const values = [
        [
          new Date().toISOString(), // Timestamp
          data.name,
          data.phone,
          data.email || '',        // Optional email
          data.service,
          data.description,
          photoCell                // Optional photo URL as hyperlink
        ]
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:G',       // Assumes Sheet1 with columns for our data
        valueInputOption: 'USER_ENTERED',  // Important: allows formulas to work
        requestBody: {
          values
        }
      });

      console.log('Successfully added contact request to Google Sheets');
    } catch (error) {
      console.error('Error adding contact request to Google Sheets:', error);
      throw new Error('Failed to add data to Google Sheets');
    }
  }

  /**
   * Initialize the spreadsheet with headers if it's new
   */
  async initializeSpreadsheet(): Promise<void> {
    try {
      // Check if the first row exists
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A1:G1'
      });

      // If no data or empty first row, add headers
      if (!response.data.values || response.data.values.length === 0) {
        const headers = [
          'Timestamp',
          'Name',
          'Phone',
          'Email',
          'Service',
          'Description',
          'Property Photo URL'
        ];

        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Sheet1!A1:G1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [headers]
          }
        });

        console.log('Initialized Google Sheet with headers');
      }
    } catch (error) {
      console.error('Error initializing Google Sheet:', error);
    }
  }
}
