// import * as fs from 'node:fs';
// import * as path from 'node:path';

// export class TestData {
//     private static readonly testDataPath = path.join(__dirname, '../testdata/opportunity.json');

//     public static getOpportunityData(opportunityType: string): any {
//         try {
//             const rawData = fs.readFileSync(this.testDataPath, 'utf-8');
//             const data = JSON.parse(rawData);
//             return data[opportunityType] || null;
//         } catch (error) {
//             console.error('Error reading test data:', error);
//             return null;
//         }
//     }
// }


// test_framework/utils/testData.ts
// import { join, dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { readFileSync } from 'node:fs';

// // Get the current file's directory in CommonJS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export class TestData {
//     private static readonly testDataPath = join(__dirname, '../testdata/opportunity.json');

//     public static getOpportunityData(opportunityType: string): any {
//         try {
//             const rawData = readFileSync(this.testDataPath, 'utf-8');
//             const data = JSON.parse(rawData);
//             return data[opportunityType] || null;
//         } catch (error) {
//             console.error('Error reading test data:', error);
//             return null;
//         }
//     }
// }


import { join } from 'node:path';
import { readFileSync } from 'node:fs';

export class TestData {

  private static getTestDataPath(): string {
    return join(
      process.cwd(),
      'test_framework',
      'testdata',
      'opportunity.json'
    );
  }

  public static getOpportunityData(opportunityType: string): any {
    try {
      const rawData = readFileSync(this.getTestDataPath(), 'utf-8');
      const data = JSON.parse(rawData);
      return data[opportunityType] || null;
    } catch (error) {
      console.error('Error reading test data:', error);
      return null;
    }
  }
}

