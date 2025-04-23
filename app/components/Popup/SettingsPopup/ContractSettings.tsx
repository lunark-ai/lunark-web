"use client";

import { useState, useEffect } from 'react';
import { baseButtonStyle, baseContainerStyle, networks } from '@/constants';
import { Trash, Plus, Edit, X } from 'iconoir-react';
import { toast } from 'react-hot-toast';
import { useUserContext } from '@/contexts';
import { createAxiosInstance } from '@/lib/axios';
import LoadingIcon from '../../Base/LoadingIcon';
import Popup from '../../Popup/Popup';
import { RiCloseLine } from 'react-icons/ri';
import Dropdown from '@/components/Base/Dropdown';

interface Contact {
  id: string;
  name: string;
  address: string;
  networks: string[];
  notes?: string;
  metadata?: string;
}

const ContractSettings = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Contact | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user]);

  const fetchContacts = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await createAxiosInstance().get(`/contacts/${user.id}`);
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (contact: Contact) => {
    setIsEditing(contact.id);
    setEditForm(contact);
  };

  const handleDelete = async (contactId: string) => {
    setSelectedContactId(contactId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!user || !selectedContactId) return;
    
    try {
      await createAxiosInstance().delete(`/contacts/${user.id}?contactId=${selectedContactId}`);
      setContacts(contacts.filter(c => c.id !== selectedContactId));
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Failed to delete contact:', error);
      toast.error('Failed to delete contact');
    } finally {
      setShowConfirmation(false);
      setSelectedContactId(null);
    }
  };

  const handleSave = async () => {
    if (!user || !editForm) return;
    
    setIsSaving(true);
    try {
      if (isEditing) {
        await createAxiosInstance().put(`/contacts/${user.id}`, editForm);
        setContacts(contacts.map(c => c.id === editForm.id ? editForm : c));
        toast.success('Contact updated successfully');
      } else {
        const response = await createAxiosInstance().post(`/contacts/${user.id}`, editForm);
        setContacts([...contacts, response.data]);
        toast.success('Contact added successfully');
      }
      setIsEditing(null);
      setEditForm(null);
      setIsAddingNew(false);
    } catch (error: any) {
      console.error('Failed to save contact:', error);
      toast.error(error.response?.data?.error || 'Failed to save contact');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNetwork = (network: string) => {
    if (!editForm) return;
    if (!editForm.networks.includes(network)) {
      setEditForm({
        ...editForm,
        networks: [...editForm.networks, network]
      });
      setSelectedNetwork('');
    }
    setShowNetworkDropdown(false);
  };

  const handleRemoveNetwork = (networkToRemove: string) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      networks: editForm.networks.filter(network => network !== networkToRemove)
    });
  };

  const validateAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-6 border-b border-[#888]/30">
        <h3 className="text-lg font-medium text-[#FCFCFC]">Address Book</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex flex-col gap-1 flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Manage Contacts</h4>
                <p className="text-[#5e8284] text-sm">
                  Add and manage your saved blockchain addresses
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddingNew(true);
                  setEditForm({ id: '', name: '', address: '', networks: [] });
                }}
                className={`${baseButtonStyle} px-4 py-2 text-sm rounded-full flex items-center gap-2 border border-[#888]/50 hover:border-[#888]/75`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Contact</span>
              </button>
            </div>

            <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

            {(isEditing || isAddingNew) && editForm && (
              <div className={`${baseContainerStyle} p-4 rounded-xl`}>
                <h3 className="text-[#FCFCFC] font-medium mb-4">
                  {isEditing ? 'Edit Contact' : 'Add New Contact'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#5e8284] mb-2">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-black/30 border border-[#888]/50 text-[#FCFCFC] text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#3A3A3A]"
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#5e8284] mb-2">Address</label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full bg-black/30 border border-[#888]/50 text-[#FCFCFC] text-sm font-mono rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#3A3A3A]"
                      placeholder="0x..."
                    />
                    {editForm.address && !validateAddress(editForm.address) && (
                      <p className="text-red-500 text-sm mt-1">Invalid Ethereum address format</p>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm text-[#5e8284] mb-2">Networks</label>
                      <Dropdown
                          value="Add Network"
                          options={[
                            { value: "Add Network", label: "Add Network", disabled: true },
                            ...networks
                              .filter(network => !editForm.networks.includes(network.name))
                              .map(network => ({
                                value: network.name,
                                label: network.name
                              }))
                          ]}
                          onChange={(value) => {
                            if (value !== "Add Network") {
                              handleAddNetwork(value);
                              setSelectedNetwork('');
                            }
                          }}
                          className="inline-flex w-fit"
                        />
                    </div>
                    <div className="relative mt-4">
                      <div className="min-h-[2.75rem] bg-black/30 border border-[#888]/50 rounded-lg px-3 py-2 flex flex-wrap gap-2 items-center">
                        {editForm.networks.map((network) => (
                          <span
                            key={network}
                            className="inline-flex items-center gap-1.5 bg-[#2A2A2A] border border-[#888]/50 text-[#FCFCFC] text-sm px-2.5 py-1 rounded-lg"
                          >
                            {network}
                            <button
                              onClick={() => handleRemoveNetwork(network)}
                              className="text-[#5e8284] hover:text-[#FCFCFC] transition-colors"
                            >
                              <RiCloseLine className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#5e8284] mb-2">Notes (optional)</label>
                    <textarea
                      value={editForm.notes || ''}
                      onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                      className="w-full bg-black/30 border border-[#888]/50 text-[#FCFCFC] text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#3A3A3A]"
                      rows={3}
                      placeholder="Add any notes about this contact"
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={() => {
                        setIsEditing(null);
                        setEditForm(null);
                        setIsAddingNew(false);
                        setShowNetworkDropdown(false);
                      }}
                      className={`${baseButtonStyle} px-4 py-2 text-sm rounded-lg hover:bg-[#2A2A2A]`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!editForm.name || !editForm.address || !validateAddress(editForm.address) || isSaving}
                      className={`${baseButtonStyle} min-w-[7rem] px-4 py-2 text-sm rounded-lg bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500 flex items-center justify-center gap-2`}
                    >
                      {isSaving ? (
                        <>
                          <LoadingIcon className="w-4 h-4" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>{isEditing ? 'Save Changes' : 'Add Contact'}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingIcon />
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#5e8284] text-sm">No contacts saved yet.</p>
                  <p className="text-[#5e8284]/60 text-sm mt-1">Add your first contact using the button above.</p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`${baseContainerStyle} p-4 rounded-xl relative group`}
                  >
                    <div className="flex-1 min-w-0 pr-20">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[#FCFCFC] text-sm font-medium truncate">{contact.name}</h3>
                        {contact.networks?.length > 0 && (
                          <span className="text-sm text-[#5e8284]">
                            ({contact.networks.join(', ')})
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#FCFCFC]/60 font-mono mt-1 truncate">{contact.address}</p>
                      {contact.notes && (
                        <p className="text-sm text-[#5e8284] mt-1 line-clamp-2">Notes: {contact.notes}</p>
                      )}
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(contact)}
                        className={`w-6 h-6 flex items-center justify-center rounded-lg`}
                        title="Edit contact"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className={`w-6 h-6 flex items-center justify-center rounded-lg text-red-500`}
                        title="Delete contact"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Popup
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setSelectedContactId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default ContractSettings;