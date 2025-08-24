import { Modal } from '@/components/Modal';
import './App.css';

function App() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div>React Forms</div>
      <Modal isOpen={true} onClose={function (): void {}}>
        <p>Modal window</p>
      </Modal>
    </div>
  );
}

export default App;
