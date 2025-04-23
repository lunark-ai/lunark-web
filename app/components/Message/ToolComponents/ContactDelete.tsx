"use client";

import { Trash } from 'iconoir-react';
import { Contact } from '@/types/contracts';
import { baseContainerStyle } from '@/constants';

interface ContactDeleteProps {
  data: {
    contact: Contact;
  };
}

const ContactDelete = ({ data }: ContactDeleteProps) => {
  return (
    <div className={`flex w-fit items-center rounded-lg px-4 py-2 mt-4 mb-2 ${baseContainerStyle}`}>
      <Trash className="w-5 h-5 mr-3 text-green-600 dark:text-green-400" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-green-600 dark:text-green-400">
          Contact Deleted
        </span>
      </div>
    </div>
  );
};

export default ContactDelete; 