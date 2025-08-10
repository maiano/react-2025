import summerImage from '@/assets/Rick-And-Morty-PNG-Pic-Background.png';
import { Button } from '@/components/Button';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';

export const Fallback = () => {
  const handleReload = () => window.location.reload();

  return (
    <section className="mt-16 flex flex-col items-center text-center px-4 text-red-400">
      <img
        src={summerImage}
        alt={ERROR_UI_STRINGS.imageAlt}
        className="w-48 h-auto mb-6"
      />
      <h2 className="text-2xl font-bold mb-2 font-mono">
        {ERROR_UI_STRINGS.heading}
      </h2>
      <p className="text-xl mb-4 max-w-xl font-mono">
        {ERROR_UI_STRINGS.description}
      </p>
      <Button onClick={handleReload} className="text-gray-700 cursor-pointer">
        {ERROR_UI_STRINGS.buttonText}
      </Button>
    </section>
  );
};
