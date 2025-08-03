import { Button } from '@/components/Button';
import { UI_STRINGS } from '@/shared/constants/ui-strings';
import { useSelectedCharactersStore } from '@/store/selectedCharactersStore';

export const Flyout = () => {
  const selectedCount = useSelectedCharactersStore(
    (state) => state.selectedMap.size,
  );

  const unselectAll = useSelectedCharactersStore((state) => state.unselectAll);

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-600 p-4 flex justify-between items-center z-50">
      <span className="text-base">
        {UI_STRINGS.flyout.itemsSelected(selectedCount)}
      </span>
      <div className="flex gap-4">
        <Button onClick={unselectAll}>{UI_STRINGS.flyout.unselectAll}</Button>
        <Button
          onClick={() => {}}
          // className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded"
        >
          {UI_STRINGS.flyout.download}
        </Button>
      </div>
    </div>
  );
};
