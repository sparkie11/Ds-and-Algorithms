import React, { useState } from 'react';
import { addInventoryItem, InventoryItem } from '../lib/mockApi';

interface FormSectionProps {
  onAddListing: (newItem: InventoryItem) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ onAddListing }) => {
  const [formData, setFormData] = useState<InventoryItem>({
    id: '',
    ticketType: '',
    quantity: 0,
    splitType: '',
    maxDisplayQuantity: 0,
    category: '',
    sectionBlock: '',
    row: '',
    firstSeat: '',
    lastSeat: '',
    faceValue: 0,
    payoutPrice: 0,
    seatingArrangement: '',
    dateToShip: '',
    ticketsInHand: false,
    matchEvent: 'Chelsea vs Arsenal - Premier League',
    fanArea: '',
    notes: '',
    benefits: '',
    restrictions: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.ticketType) newErrors.ticketType = 'Ticket Type is required.';
    if (formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.sectionBlock) newErrors.sectionBlock = 'Section/Block is required.';
    if (!formData.row) newErrors.row = 'Row is required.';
    if (!formData.firstSeat) newErrors.firstSeat = 'First Seat is required.';
    if (!formData.seatingArrangement) newErrors.seatingArrangement = 'Seating Arrangement is required.';
    if (!formData.dateToShip) newErrors.dateToShip = 'Date to Ship is required.';
    if (!formData.fanArea) newErrors.fanArea = 'Fan Area is required.';
    if (!formData.benefits) newErrors.benefits = 'Benefits is required.';
    if (!formData.restrictions) newErrors.restrictions = 'Restrictions is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formattedDateToShip = formData.dateToShip || '';
    const newItem = {
      ...formData,
      id: String(Date.now()),
      dateToShip: formattedDateToShip,
    };

    await addInventoryItem(newItem);
    onAddListing(newItem);

    setFormData({
      id: '',
      ticketType: '',
      quantity: 0,
      splitType: '',
      maxDisplayQuantity: 0,
      category: '',
      sectionBlock: '',
      row: '',
      firstSeat: '',
      lastSeat: '',
      faceValue: 0,
      payoutPrice: 0,
      seatingArrangement: '',
      dateToShip: '',
      ticketsInHand: false,
      matchEvent: 'Chelsea vs Arsenal - Premier League',
      fanArea: '',
      notes: '',
      benefits: '',
      restrictions: '',
    });
    setErrors({});
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} id="inventory-form">
        {/* UI Components here, omitted for brevity */}
      </form>
    </section>
  );
};

export default FormSection;
