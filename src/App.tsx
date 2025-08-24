import { ControlledForm } from '@/components/ControlledForm';
import { Modal } from '@/components/Modal';

function App() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-xl">React Forms</h1>
      <Modal isOpen={true} onClose={function (): void {}}>
        <p>Modal window</p>
        <ControlledForm onClose={function (): void {}} />
      </Modal>
    </div>
  );
}

export default App;
