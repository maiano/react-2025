import { generateCSV } from '@/shared/utils/generate-csv';
import { mockCharacter } from '@/tests/mockCharacter';
import { Character } from '@/types/character';

describe('generateCSV', () => {
  it('should generate correct CSV content', async () => {
    const result = await generateCSV([mockCharacter as Character]);
    expect(result.csvContent).toMatchSnapshot();
    expect(result.fileName).toMatch(/\.csv$/);
  });

  it('should handle empty array', async () => {
    const result = await generateCSV([]);
    expect(result.csvContent).toBeTruthy();
  });
});
