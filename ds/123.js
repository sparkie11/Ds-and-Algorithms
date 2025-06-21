// src/components/TableSection.tsx
import React, { useState, useEffect } from 'react';
import { getInventoryItems, InventoryItem, updateInventoryItem } from '../lib/mockApi';
import Image from 'next/image';



interface TableSectionProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  selectedItems: string[];
  clonedItemIds: string[];
  handleCheckboxChange: (id: string) => void;
  handleSelectAll: () => void;
  handleClone: (item: InventoryItem) => void;
  handleEdit: (item: InventoryItem) => void;
}

const TableSection: React.FC<TableSectionProps> = ({
  inventory,
  setInventory,
  selectedItems,
  clonedItemIds,
  handleCheckboxChange,
  handleSelectAll,
  handleClone,
  handleEdit,
}) => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      const items = await getInventoryItems();
      setInventory(items);
    };
    fetchInventory();

    const currentTableContainerRef = tableContainerRef.current;
    const checkScroll = () => {
      if (currentTableContainerRef) {
        setCanScrollLeft(currentTableContainerRef.scrollLeft > 0);
        setCanScrollRight(currentTableContainerRef.scrollLeft < (currentTableContainerRef.scrollWidth - currentTableContainerRef.clientWidth));
      }
    };

    // Initial check and re-check on scroll
    checkScroll();
    currentTableContainerRef?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      currentTableContainerRef?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [setInventory]);



  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleCellChange = (id: string, field: keyof InventoryItem, value: string | number | boolean) => {
    setInventory(prevInventory =>
      prevInventory.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    const updatedItem = inventory.find(item => item.id === id);
    if (updatedItem) {
      updateInventoryItem({ ...updatedItem, [field]: value });
    }
  };

  return (
    <>
      <section className="bg-white mt-3 mb-20  rounded-lg shadow-md">
      <div className="flex justify-between items-center p-2 text-white " style={{backgroundColor:"#130562"}}>
        <h2 className="text-lg font-semibold">Chelsea vs Arsenal - Premier League</h2>
        <div className="flex items-center space-x-2">
          <span>Sun, 10 Nov 2024</span>
          <span>16:30</span>
          <span>Stamford Bridge, London, United Kingdom</span>
          <button
  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
  aria-label="Scroll Up"
>
  <Image src="/file.svg" alt="Scroll Up" width={16} height={16} />
</button>
        </div>
      </div>

      <div ref={tableContainerRef} className="overflow-x-auto border border-gray-200 rounded-md">
  <table className="min-w-[2400px] table-fixed divide-y divide-gray-200">
    <thead>
      <tr>
        {/* ✅ Sticky checkbox header */}
        <th className="w-12 px-4 py-2 sticky left-0 top-0 bg-gray-50 z-20 border-r border-gray-200">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={selectedItems.length === inventory.length && inventory.length > 0}
            onChange={handleSelectAll}
          />
        </th>

        {/* ❌ Scrollable headers */}
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Ticket Type</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Quantity</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Split Type</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Max Displ.</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Category</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Section/Block</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Row</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">First Seat</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Face Value</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Payout Price</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Seating</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Last Seat</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Date to Ship</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Tickets in Hand</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Match Event</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Fan Area</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Notes</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Benefits</th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200">Restrictions</th>

        {/* ✅ Sticky actions header */}
        <th className="w-32 px-4 py-2 sticky right-0 top-0 bg-gray-10 z-20 text-xs font-medium text-gray-500 uppercase flex items-center justify-center space-x-2 bg-white border-0 border-gray-200">
          <button onClick={scrollLeft} disabled={!canScrollLeft} className="p-1 rounded-full   hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg fill="#130562" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="24px" width="24px" style={{ overflow: "visible", color: "currentcolor" }}><path d="M689 165.1 308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z"></path></svg>
          </button>
          <div className="h-6 border-l border-gray-300"></div> {/* Cell border */}
          <button onClick={scrollRight} disabled={!canScrollRight} className="p-1 rounded-full  hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg fill="#130562" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="24px" width="24px" style={{ overflow: "visible", color: "currentcolor" }}><path d="M715.8 493.5 335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>
          </button>
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {inventory.map((item) => (
        <tr key={item.id}>
          {/* ✅ Sticky checkbox column */}
          <td className="w-12 px-4 py-2 sticky left-0 bg-white z-10 border-r border-gray-200">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
          </td>

          {/* ❌ Scrollable content */}
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.ticketType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'ticketType', e.target.value as 'E-ticket' | 'Physical' | 'Local Delivery' | 'Flash Seats' | 'Mobile Transfer')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="E-ticket">E-ticket</option>
              <option value="Physical">Physical</option>
              <option value="Local Delivery">Local Delivery</option>
              <option value="Flash Seats">Flash Seats</option>
              <option value="Mobile Transfer">Mobile Transfer</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="number"
              value={item.quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'quantity', parseInt(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.splitType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'splitType', e.target.value as 'None' | 'Even' | 'Odd' | 'Pair' | 'Single')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="None">None</option>
              <option value="Even">Even</option>
              <option value="Odd">Odd</option>
              <option value="Pair">Pair</option>
              <option value="Single">Single</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="number"
              value={item.maxDisplayQuantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'maxDisplayQuantity', parseInt(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'category', e.target.value as 'Away Fans Section' | 'Home Fans Section' | 'Lower Tier' | 'Upper Tier' | 'Club Level')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Away Fans Section">Away Fans Section</option>
              <option value="Home Fans Section">Home Fans Section</option>
              <option value="Lower Tier">Lower Tier</option>
              <option value="Upper Tier">Upper Tier</option>
              <option value="Club Level">Club Level</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.sectionBlock}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'sectionBlock', e.target.value as 'Longside Lower Tier' | 'Shortside Lower Tier' | 'Longside Upper Tier' | 'Shortside Upper Tier' | 'Block 1' | 'Block 2' | 'Block 3')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Longside Lower Tier">Longside Lower Tier</option>
              <option value="Shortside Lower Tier">Shortside Lower Tier</option>
              <option value="Longside Upper Tier">Longside Upper Tier</option>
              <option value="Shortside Upper Tier">Shortside Upper Tier</option>
              <option value="Block 1">Block 1</option>
              <option value="Block 2">Block 2</option>
              <option value="Block 3">Block 3</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.row}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'row', e.target.value as '5' | 'A' | 'B' | 'C' | '1' | '2' | '3')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="5">5</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.firstSeat}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'firstSeat', e.target.value as '1' | '2' | '3' | '4' | '5')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="number"
              value={item.faceValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'faceValue', parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="number"
              value={item.payoutPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'payoutPrice', parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.seatingArrangement}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'seatingArrangement', e.target.value as 'Not Seated Together' | 'Seated Together' | 'Aisle Seats' | 'Center Seats')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Not Seated Together">Not Seated Together</option>
              <option value="Seated Together">Seated Together</option>
              <option value="Aisle Seats">Aisle Seats</option>
              <option value="Center Seats">Center Seats</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="text"
              value={item.lastSeat || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'lastSeat', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="date"
              value={item.dateToShip}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'dateToShip', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.ticketsInHand.toString()}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'ticketsInHand', e.target.value === 'true')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="text"
              value={item.matchEvent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'matchEvent', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.fanArea}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'fanArea', e.target.value as 'Home' | 'Away' | 'Neutral')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Home">Home</option>
              <option value="Away">Away</option>
              <option value="Neutral">Neutral</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="text"
              value={item.notes}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'notes', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.benefits}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'benefits', e.target.value as 'None' | 'Free Parking' | 'VIP Access' | 'Food and Beverage Included' | 'Merchandise Discount')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="None">None</option>
              <option value="Free Parking">Free Parking</option>
              <option value="VIP Access">VIP Access</option>
              <option value="Food and Beverage Included">Food and Beverage Included</option>
              <option value="Merchandise Discount">Merchandise Discount</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.restrictions}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'restrictions', e.target.value as 'None' | 'Age Limit' | 'Bag Policy' | 'No Re-entry' | 'Camera Restrictions')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="None">None</option>
              <option value="Age Limit">Age Limit</option>
              <option value="Bag Policy">Bag Policy</option>
              <option value="No Re-entry">No Re-entry</option>
              <option value="Camera Restrictions">Camera Restrictions</option>
            </select>
          </td>

          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.row}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'row', e.target.value as '5' | 'A' | 'B' | 'C' | '1' | '2' | '3')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="5">5</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.firstSeat}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'firstSeat', e.target.value as '1' | '2' | '3' | '4' | '5')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="number"
              value={item.faceValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'faceValue', parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="number"
              value={item.payoutPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'payoutPrice', parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.seatingArrangement}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'seatingArrangement', e.target.value as 'Not Seated Together' | 'Seated Together' | 'Aisle Seats' | 'Center Seats')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Not Seated Together">Not Seated Together</option>
              <option value="Seated Together">Seated Together</option>
              <option value="Aisle Seats">Aisle Seats</option>
              <option value="Center Seats">Center Seats</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="text"
              value={item.lastSeat || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'lastSeat', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="date"
              value={item.dateToShip}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'dateToShip', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.ticketsInHand.toString()}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'ticketsInHand', e.target.value === 'true')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="text"
              value={item.matchEvent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'matchEvent', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.fanArea}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'fanArea', e.target.value as 'Home' | 'Away' | 'Neutral')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Home">Home</option>
              <option value="Away">Away</option>
              <option value="Neutral">Neutral</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <input
              type="text"
              value={item.notes}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCellChange(item.id, 'notes', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.benefits}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'benefits', e.target.value as 'None' | 'Free Parking' | 'VIP Access' | 'Food and Beverage Included' | 'Merchandise Discount')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="None">None</option>
              <option value="Free Parking">Free Parking</option>
              <option value="VIP Access">VIP Access</option>
              <option value="Food and Beverage Included">Food and Beverage Included</option>
              <option value="Merchandise Discount">Merchandise Discount</option>
            </select>
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
            <select
              value={item.restrictions}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCellChange(item.id, 'restrictions', e.target.value as 'None' | 'Age Limit' | 'Bag Policy' | 'No Re-entry' | 'Camera Restrictions')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="None">None</option>
              <option value="Age Limit">Age Limit</option>
              <option value="Bag Policy">Bag Policy</option>
              <option value="No Re-entry">No Re-entry</option>
              <option value="Camera Restrictions">Camera Restrictions</option>
            </select>
          </td>

          {/* ✅ Sticky actions column */}
          <td className="w-32 px-4 py-5 sticky right-0 bg-white z-20 text-sm flex items-center justify-center space-x-2 border-r border-gray-200">
            <button onClick={() => handleClone(item)} className={`${clonedItemIds.includes(item.id) ? 'text-green-500' : 'text-blue-600'} hover:text-blue-900`}>
              <svg fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1.2em" width="1.2em" style={{ overflow: "visible", color: "currentcolor" }}><path d="M256 0c-25.3 0-47.2 14.7-57.6 36-7-2.6-14.5-4-22.4-4-35.3 0-64 28.7-64 64v165.5l-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5l87.7 87.7c48 48 113.1 75 181 75H304c1.5 0 3-.1 4.5-.4 91.7-6.2 165-79.4 171.1-171.1.3-1.5.4-3 .4-4.5V160c0-35.3-28.7-64-64-64-5.5 0-10.9.7-16 2v-2c0-35.3-28.7-64-64-64-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zm-16 96.1V64c0-8.8 7.2-16 16-16s16 7.2 16 16v168c0 13.3 10.7 24 24 24s24-10.7 24-24V95.9c0-8.8 7.2-16 16-16s16 7.2 16 16v136c0 13.3 10.7 24 24 24s24-10.7 24-24V160c0-8.8 7.2-16 16-16s16 7.2 16 16v172.9c-.1.6-.1 1.3-.2 1.9-3.4 69.7-59.3 125.6-129 129-.6 0-1.3.1-1.9.2h-13.4c-55.2 0-108.1-21.9-147.1-60.9l-87.7-87.8c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l43.7 43.7c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V96c0-8.8 7.2-16 16-16s16 7.1 16 15.9V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96.1z"></path></svg>
            </button>
            <div className="h-6 border-l border-gray-300"></div>
            <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-red-900">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>

            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <div className="flex justify-between items-center mt-4">

        {/* <div className="space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
          <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Publish Live</button>
        </div> */}
      </div>
    </section>
  );
};

export default TableSection;
