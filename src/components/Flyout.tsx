import { Button } from '@/components/Button';
import { UI_STRINGS } from '@/shared/constants/ui-strings';
import { downloadCharactersCSV } from '@/shared/utils/download-characters-csv';
import { useSelectedCharactersStore } from '@/store/selectedCharactersStore';

export const Flyout = () => {
  const getSelectedArray = useSelectedCharactersStore(
    (state) => state.getSelectedArray,
  );
  const selectedCount = useSelectedCharactersStore(
    (state) => state.selectedMap.size,
  );
  const unselectAll = useSelectedCharactersStore((state) => state.unselectAll);

  if (selectedCount === 0) return null;

  const handleDownload = () => {
    downloadCharactersCSV(getSelectedArray());
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-600 p-4 flex justify-between items-center z-50">
      <span className="text-base" aria-live="polite">
        {UI_STRINGS.flyout.itemsSelected(selectedCount)}
      </span>
      <div className="flex gap-4">
        <Button onClick={unselectAll}>{UI_STRINGS.flyout.unselectAll}</Button>
        <Button onClick={handleDownload}>{UI_STRINGS.flyout.download}</Button>
      </div>
    </div>
  );
};
