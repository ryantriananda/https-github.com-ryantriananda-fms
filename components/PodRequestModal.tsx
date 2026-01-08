import React, { useState, useEffect } from 'react';
import { X, Send, Calendar, MapPin, User, MessageSquare, Bed, Save, CheckCircle2, XCircle, Briefcase, Mail, Phone, Monitor, Wind, Zap, Box, Lock, Droplets, Utensils, Shirt, Waves, Home, Layers, Check } from 'lucide-react';
import { PodRequestRecord, UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<PodRequestRecord>) => void;
  initialData?: PodRequestRecord | null;
  mode?: 'create' | 'edit' | 'view' | 'approve';
  currentUser?: UserRecord;
}

// Custom Icons to match TenantPodModal
const BoxIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>);
const ExpandIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>);
const BikeIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>);
const CarIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h8"/></svg>);
const CoffeeIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z"/><path d="M6 2v2"/></svg>);
const DumbbellIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>);

const FACILITIES_CONFIG = [
    { key: 'meja', label: 'MEJA', icon: Monitor },
    { key: 'ac', label: 'AC', icon: Wind },
    { key: 'kursi', label: 'KURSI', icon: User },
    { key: 'colokan', label: 'COLOKAN', icon: Zap },
    { key: 'lemari', label: 'LEMARI', icon: BoxIcon },
    { key: 'cermin', label: 'CERMIN', icon: ExpandIcon },
    { key: 'parkirMotor', label: 'PARKIR MOTOR', icon: BikeIcon },
    { key: 'parkirMobil', label: 'PARKIR MOBIL', icon: CarIcon },
    { key: 'kmLuar', label: 'KM. LUAR', icon: Droplets },
    { key: 'kmDalam', label: 'KM. DALAM', icon: Droplets },
    { key: 'gym', label: 'GYM', icon: DumbbellIcon },
    { key: 'pantry', label: 'PANTRY', icon: CoffeeIcon },
    { key: 'lokerPantry', label: 'LOKER PANTRY', icon: BoxIcon },
    { key: 'lokerBarang', label: 'LOKER BARANG', icon: Lock },
    { key: 'kitchen', label: 'KITCHEN', icon: Utensils },
    { key: 'laundry', label: 'LAUNDRY', icon: Shirt },
    { key: 'kolamRenang', label: 'KOLAM RENANG', icon: Waves },
];

export const PodRequestModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    currentUser 
}) => {
  const [form, setForm] = useState<Partial<PodRequestRecord>>({
    requestDate: new Date().toISOString().split('T')[0],
    reason: '',
    floorPreference: 'LT 2 PRIA',
    roomType: 'SINGLE BED',
    status: 'Pending',
    gender: 'Pria',
    isExpat: false,
    facilities: {
        meja: true, ac: true, kursi: true, colokan: true, lemari: true, cermin: true,
        parkirMotor: false, parkirMobil: false, kmLuar: false, kmDalam: true,
        gym: false, pantry: false, lokerPantry: false, lokerBarang: false,
        kitchen: false, laundry: false, kolamRenang: false
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            requestDate: new Date().toISOString().split('T')[0],
            reason: '',
            floorPreference: 'LT 2 PRIA',
            roomType: 'SINGLE BED',
            status: 'Pending',
            requesterName: currentUser?.name || 'AAN JUNAIDI',
            // Fix: Use 'departemen' instead of 'department' to match PodRequestRecord type
            departemen: currentUser?.department || 'AFTER SALES',
            requesterRole: currentUser?.role || 'TECHNICIAN',
            gender: 'Pria',
            isExpat: false,
            facilities: {
                meja: true, ac: true, kursi: true, colokan: true, lemari: true, cermin: true,
                parkirMotor: false, parkirMobil: false, kmLuar: false, kmDalam: true,
                gym: false, pantry: false, lokerPantry: false, lokerBarang: false,
                kitchen: false, laundry