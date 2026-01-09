import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MasterApprovalTable } from '../../components/MasterApprovalTable';
import { MasterVendorTable } from '../../components/MasterVendorTable';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';
import { MasterApprovalModal } from '../../components/MasterApprovalModal';
import { VendorModal } from '../../components/VendorModal';
import { GeneralMasterModal } from '../../components/GeneralMasterModal';
import { 
    MasterApprovalRecord, VendorRecord, GeneralMasterItem 
} from '../../types';

// ============================================
// MASTER APPROVAL PAGE - With Separate Forms
// ============================================
interface MasterApprovalPageProps {
    data: MasterApprovalRecord[];
    onSave: (data: Partial<MasterApprovalRecord>) => void;
}

// Dedicated Create Approval Form
const CreateApprovalForm: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<MasterApprovalRecord>) => void;
}> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<MasterApprovalRecord>>({
        approvalType: '',
        requester: '',
        description: '',
        level: 1,
        status: 'Pending'
    });

    const handleSubmit = () => {
        onSave({ ...formData, id: Date.now().toString(), createdAt: new Date().toISOString() });
        setFormData({ approvalType: '', requester: '', description: '', level: 1, status: 'Pending' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Create New Approval Rule</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Approval Type</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.approvalType} onChange={e => setFormData({ ...formData, approvalType: e.target.value })}>
                            <option value="">Select Type</option>
                            <option value="ATK Request">ATK Request</option>
                            <option value="ARK Request">ARK Request</option>
                            <option value="Asset Mutation">Asset Mutation</option>
                            <option value="Vehicle Request">Vehicle Request</option>
                            <option value="Building Maintenance">Building Maintenance</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Approver Name</label>
                        <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.requester} onChange={e => setFormData({ ...formData, requester: e.target.value })} placeholder="Enter approver name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Approval Level</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.level} onChange={e => setFormData({ ...formData, level: Number(e.target.value) })}>
                            <option value={1}>Level 1 - Department Head</option>
                            <option value={2}>Level 2 - Division Manager</option>
                            <option value={3}>Level 3 - Director</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea className="w-full border rounded-xl px-4 py-2" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description" />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-4 py-2 border rounded-xl" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    );
};

// Dedicated Edit Approval Form
const EditApprovalForm: React.FC<{
    isOpen: boolean;
    data?: MasterApprovalRecord;
    onClose: () => void;
    onSave: (data: Partial<MasterApprovalRecord>) => void;
}> = ({ isOpen, data, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<MasterApprovalRecord>>(data || {});

    React.useEffect(() => {
        if (data) setFormData(data);
    }, [data]);

    const handleSubmit = () => {
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Approval Rule</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Approval Type</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.approvalType} onChange={e => setFormData({ ...formData, approvalType: e.target.value })}>
                            <option value="ATK Request">ATK Request</option>
                            <option value="ARK Request">ARK Request</option>
                            <option value="Asset Mutation">Asset Mutation</option>
                            <option value="Vehicle Request">Vehicle Request</option>
                            <option value="Building Maintenance">Building Maintenance</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Approver Name</label>
                        <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.requester} onChange={e => setFormData({ ...formData, requester: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Approval Level</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.level} onChange={e => setFormData({ ...formData, level: Number(e.target.value) })}>
                            <option value={1}>Level 1 - Department Head</option>
                            <option value={2}>Level 2 - Division Manager</option>
                            <option value={3}>Level 3 - Director</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea className="w-full border rounded-xl px-4 py-2" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-4 py-2 border rounded-xl" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export const MasterApprovalPage: React.FC<MasterApprovalPageProps> = ({ data, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [createFormOpen, setCreateFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [editData, setEditData] = useState<MasterApprovalRecord | undefined>();

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(a => a.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setCreateFormOpen(true)} 
                customAddLabel="Add Approval Rule"
            />
            <MasterApprovalTable 
                data={filteredData} 
                onEdit={(item) => { setEditData(item); setEditFormOpen(true); }} 
            />
            <CreateApprovalForm isOpen={createFormOpen} onClose={() => setCreateFormOpen(false)} onSave={(d) => { onSave(d); setCreateFormOpen(false); }} />
            <EditApprovalForm isOpen={editFormOpen} data={editData} onClose={() => setEditFormOpen(false)} onSave={(d) => { onSave(d); setEditFormOpen(false); }} />
        </>
    );
};

// ============================================
// MASTER VENDOR PAGE - With Separate Forms
// ============================================
interface MasterVendorPageProps {
    data: VendorRecord[];
    onSave: (data: Partial<VendorRecord>) => void;
    onImportClick: () => void;
}

// Dedicated Create Vendor Form
const CreateVendorForm: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<VendorRecord>) => void;
}> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<VendorRecord>>({
        name: '',
        category: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        rating: 0,
        status: 'Active'
    });

    const handleSubmit = () => {
        onSave({ ...formData, id: Date.now().toString() });
        setFormData({ name: '', category: '', contact: '', email: '', phone: '', address: '', rating: 0, status: 'Active' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Add New Vendor</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Vendor Name *</label>
                        <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter vendor name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option value="">Select Category</option>
                            <option value="IT">IT & Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Catering">Catering</option>
                            <option value="Security">Security</option>
                            <option value="Cleaning">Cleaning</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Person</label>
                            <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} placeholder="Contact name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input type="tel" className="w-full border rounded-xl px-4 py-2" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone number" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" className="w-full border rounded-xl px-4 py-2" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="vendor@email.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <textarea className="w-full border rounded-xl px-4 py-2" rows={2} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="Full address" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Initial Rating</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.rating} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}>
                            <option value={0}>Not Rated</option>
                            <option value={1}>1 Star</option>
                            <option value={2}>2 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={5}>5 Stars</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-4 py-2 border rounded-xl" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={handleSubmit}>Add Vendor</button>
                </div>
            </div>
        </div>
    );
};

// Dedicated Edit Vendor Form
const EditVendorForm: React.FC<{
    isOpen: boolean;
    data?: VendorRecord;
    onClose: () => void;
    onSave: (data: Partial<VendorRecord>) => void;
}> = ({ isOpen, data, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<VendorRecord>>(data || {});

    React.useEffect(() => {
        if (data) setFormData(data);
    }, [data]);

    const handleSubmit = () => {
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Edit Vendor</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Vendor Name *</label>
                        <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option value="IT">IT & Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Catering">Catering</option>
                            <option value="Security">Security</option>
                            <option value="Cleaning">Cleaning</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Person</label>
                            <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input type="tel" className="w-full border rounded-xl px-4 py-2" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" className="w-full border rounded-xl px-4 py-2" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <textarea className="w-full border rounded-xl px-4 py-2" rows={2} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Rating</label>
                            <select className="w-full border rounded-xl px-4 py-2" value={formData.rating} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}>
                                <option value={0}>Not Rated</option>
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select className="w-full border rounded-xl px-4 py-2" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Blacklisted">Blacklisted</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-4 py-2 border rounded-xl" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export const MasterVendorPage: React.FC<MasterVendorPageProps> = ({ data, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [createFormOpen, setCreateFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [editData, setEditData] = useState<VendorRecord | undefined>();

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(v => v.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'INACTIVE', 'BLACKLISTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setCreateFormOpen(true)} 
                customAddLabel="Add Vendor" 
                onImportClick={onImportClick}
            />
            <MasterVendorTable 
                data={filteredData} 
                onEdit={(item) => { setEditData(item); setEditFormOpen(true); }} 
            />
            <CreateVendorForm isOpen={createFormOpen} onClose={() => setCreateFormOpen(false)} onSave={(d) => { onSave(d); setCreateFormOpen(false); }} />
            <EditVendorForm isOpen={editFormOpen} data={editData} onClose={() => setEditFormOpen(false)} onSave={(d) => { onSave(d); setEditFormOpen(false); }} />
        </>
    );
};

// ============================================
// GENERAL MASTER PAGE - With Separate Forms
// ============================================
interface GeneralMasterPageProps {
    data: GeneralMasterItem[];
    masterType: string; // 'location', 'department', 'category', 'asset-type', etc.
    onSave: (data: Partial<GeneralMasterItem>) => void;
    onImportClick: () => void;
}

// Dedicated Create Master Item Form
const CreateMasterItemForm: React.FC<{
    isOpen: boolean;
    masterType: string;
    onClose: () => void;
    onSave: (data: Partial<GeneralMasterItem>) => void;
}> = ({ isOpen, masterType, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<GeneralMasterItem>>({
        code: '',
        name: '',
        description: '',
        category: masterType,
        status: 'Active'
    });

    const handleSubmit = () => {
        onSave({ ...formData, id: Date.now().toString() });
        setFormData({ code: '', name: '', description: '', category: masterType, status: 'Active' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add {masterType}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Code *</label>
                        <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} placeholder="Enter unique code" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Name *</label>
                        <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea className="w-full border rounded-xl px-4 py-2" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Optional description" />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-4 py-2 border rounded-xl" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
};

// Dedicated Edit Master Item Form
const EditMasterItemForm: React.FC<{
    isOpen: boolean;
    masterType: string;
    data?: GeneralMasterItem;
    onClose: () => void;
    onSave: (data: Partial<GeneralMasterItem>) => void;
}> = ({ isOpen, masterType, data, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<GeneralMasterItem>>(data || {});

    React.useEffect(() => {
        if (data) setFormData(data);
    }, [data]);

    const handleSubmit = () => {
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit {masterType}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Code *</label>
                        <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Name *</label>
                        <input type="text" className="w-full border rounded-xl px-4 py-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea className="w-full border rounded-xl px-4 py-2" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select className="w-full border rounded-xl px-4 py-2" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-4 py-2 border rounded-xl" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export const GeneralMasterPage: React.FC<GeneralMasterPageProps> = ({ data, masterType, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [createFormOpen, setCreateFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [editData, setEditData] = useState<GeneralMasterItem | undefined>();

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(m => m.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setCreateFormOpen(true)} 
                customAddLabel={`Add ${masterType}`} 
                onImportClick={onImportClick}
            />
            <GeneralMasterTable 
                data={filteredData} 
                onEdit={(item) => { setEditData(item); setEditFormOpen(true); }} 
            />
            <CreateMasterItemForm isOpen={createFormOpen} masterType={masterType} onClose={() => setCreateFormOpen(false)} onSave={(d) => { onSave(d); setCreateFormOpen(false); }} />
            <EditMasterItemForm isOpen={editFormOpen} masterType={masterType} data={editData} onClose={() => setEditFormOpen(false)} onSave={(d) => { onSave(d); setEditFormOpen(false); }} />
        </>
    );
};
