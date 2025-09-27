'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';

type ExtendRentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentDate: string;
  onConfirm: (newDate: string) => void;
};

export default function ExtendRentModal({
  isOpen,
  onClose,
  currentDate,
  onConfirm,
}: ExtendRentModalProps) {
  const [newDate, setNewDate] = useState(currentDate);

  const handleSubmit = () => {
    onConfirm(newDate);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className="bg-white max-w-md w-full rounded-lg shadow-xl p-6">
              <Dialog.Title className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                Extend Rent Duration
              </Dialog.Title>

              <p className="text-sm mb-2 text-gray-500">
                Current Expiry: <strong>{format(new Date(currentDate), 'PPP')}</strong>
              </p>

              <input
                type="date"
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-md bg-black hover:bg-gray-800 text-white text-sm"
                >
                  Confirm
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
