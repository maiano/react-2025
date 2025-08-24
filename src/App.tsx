import { useState } from 'react';
import { ControlledForm } from '@/components/ControlledForm';
import { Modal } from '@/components/Modal';
import { UncontrolledForm } from '@/components/UncontrolledForm';
import { useFormStore } from '@/shared/store/useFormStore';
import { Button } from '@/shared/ui/Button';
import { Tile } from '@/shared/ui/Tile';

function App() {
  const [uncontrolledModal, setUncontrolledModal] = useState(false);
  const [controlledModal, setControlledModal] = useState(false);

  const uncontrolledData = useFormStore((state) => state.uncontrolledForms);
  const controlledData = useFormStore((state) => state.controlledForms);

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-8">
      <h1 className="text-xl">React Forms</h1>

      <div className="space-x-4">
        <Button onClick={() => setUncontrolledModal(true)}>
          Open Uncontrolled Form
        </Button>
        <Button onClick={() => setControlledModal(true)}>
          Open Controlled Form
        </Button>
      </div>

      {uncontrolledData && <Tile data={uncontrolledData} isNew={true} />}
      {controlledData && <Tile data={controlledData} isNew={true} />}

      <Modal
        isOpen={uncontrolledModal}
        onClose={() => setUncontrolledModal(false)}
      >
        <UncontrolledForm onClose={() => setUncontrolledModal(false)} />
      </Modal>

      <Modal isOpen={controlledModal} onClose={() => setControlledModal(false)}>
        <ControlledForm onClose={() => setControlledModal(false)} />
      </Modal>
    </div>
  );
}

export default App;
