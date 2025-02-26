import { useState } from "react";

interface DeleteNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>; 
}

export default function WebDeleteNoteModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteNoteModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(); 
    setLoading(false);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-red-600">Supprimer la Note</h2>
        <p className="mt-2">Voulez-vous vraiment supprimer cette note ?</p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          > Annulerr
           
          </button>
          <button
            onClick={handleDelete}
           
            >
  Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
