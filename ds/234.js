import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  getInventoryItems,
  InventoryItem,
  updateInventoryItem,
} from "../lib/mockApi";

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

/**
 * Sticky-header, horizontally scrollable inventory table.
 *
 * NOTES
 *  • The table container listens for scroll + resize to enable/disable the chevron buttons.
 *  • Edits are written optimistically to local state and then persisted via updateInventoryItem.
 */
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
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /* ------------------------------------------------------------------ */
  /*                               EFFECTS                              */
  /* ------------------------------------------------------------------ */
  // 1️⃣  Fetch inventory once on mount.
  useEffect(() => {
    const fetchInventory = async () => {
      const items = await getInventoryItems();
      setInventory(items);
    };
    fetchInventory();
  }, [setInventory]);

  // 2️⃣  Check horizontal scroll ability on mount + scroll + resize.
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*                             HANDLERS                               */
  /* ------------------------------------------------------------------ */
  const scrollLeft = () => {
    tableContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    tableContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleCellChange = (
    id: string,
    field: keyof InventoryItem,
    value: string | number | boolean
  ) => {
    // optimistic update → UI is snappy
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

    // background persistence
    const updatedItem = inventory.find((item) => item.id === id);
    if (updatedItem) updateInventoryItem({ ...updatedItem, [field]: value });
  };

  /* ------------------------------------------------------------------ */
  /*                                JSX                                 */
  /* ------------------------------------------------------------------ */
  return (
    <section className="bg-white mt-3 mb-20 rounded-lg shadow-md">
      {/* HEADER */}
      <div
        className="flex justify-between items-center p-2 text-white"
        style={{ backgroundColor: "#130562" }}
      >
        <h2 className="text-lg font-semibold">
          Chelsea vs Arsenal – Premier League
        </h2>
        <div className="flex items-center space-x-2 text-sm">
          <span>Sun, 10 Nov 2024</span>
          <span>16:30</span>
          <span>Stamford Bridge, London, United Kingdom</span>
          <button
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="Download"
          >
            <Image src="/file.svg" alt="file" width={16} height={16} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div
        ref={tableContainerRef}
        className="overflow-x-auto border border-gray-200 rounded-md"
      >
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

              {/* Column headers */}
              {[
                "Ticket Type",
                "Quantity",
                "Split Type",
                "Max Displ.",
                "Category",
                "Section/Block",
                "Row",
                "First Seat",
                "Face Value",
                "Payout Price",
                "Seating",
                "Last Seat",
                "Date to Ship",
                "Tickets in Hand",
                "Match Event",
                "Fan Area",
                "Notes",
                "Benefits",
                "Restrictions",
              ].map((title) => (
                <th
                  key={title}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200"
                >
                  {title}
                </th>
              ))}

              {/* ✅ Sticky actions header */}
              <th className="w-32 px-4 py-2 sticky right-0 top-0 z-20 bg-white text-xs font-medium text-gray-500 uppercase flex items-center justify-center space-x-2 border-gray-200">
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className="p-1 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Left chevron */}
                  <svg
                    fill="#130562"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    width="24px"
                    height="24px"
                  >
                    <path d="M689 165.1 308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z" />
                  </svg>
                </button>
                <div className="h-6 border-l border-gray-300" />
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className="p-1 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Right chevron */}
                  <svg
                    fill="#130562"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    width="24px"
                    height="24px"
                  >
                    <path d="M715.8 493.5 335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" />
                  </svg>
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

                {/* ------------------ Editable cells ------------------ */}
                {/* Ticket Type */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.ticketType}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "ticketType",
                        e.target.value as InventoryItem["ticketType"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="E-ticket">E-ticket</option>
                    <option value="Physical">Physical</option>
                    <option value="Local Delivery">Local Delivery</option>
                    <option value="Flash Seats">Flash Seats</option>
                    <option value="Mobile Transfer">Mobile Transfer</option>
                  </select>
                </td>

                {/* Quantity */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleCellChange(item.id, "quantity", Number(e.target.value))
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Split Type */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.splitType}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "splitType",
                        e.target.value as InventoryItem["splitType"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="None">None</option>
                    <option value="Even">Even</option>
                    <option value="Odd">Odd</option>
                    <option value="Pair">Pair</option>
                    <option value="Single">Single</option>
                  </select>
                </td>

                {/* Max Display Quantity */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="number"
                    value={item.maxDisplayQuantity}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "maxDisplayQuantity",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Category */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.category}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "category",
                        e.target.value as InventoryItem["category"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Away Fans Section">Away Fans Section</option>
                    <option value="Home Fans Section">Home Fans Section</option>
                    <option value="Lower Tier">Lower Tier</option>
                    <option value="Upper Tier">Upper Tier</option>
                    <option value="Club Level">Club Level</option>
                  </select>
                </td>

                {/* Section / Block */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.sectionBlock}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "sectionBlock",
                        e.target.value as InventoryItem["sectionBlock"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

                {/* Row */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.row}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "row",
                        e.target.value as InventoryItem["row"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {(["5", "A", "B", "C", "1", "2", "3"] as const).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </td>

                {/* First Seat */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.firstSeat}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "firstSeat",
                        e.target.value as InventoryItem["firstSeat"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {(["1", "2", "3", "4", "5"] as const).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Face Value */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="number"
                    value={item.faceValue}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "faceValue",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Payout Price */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="number"
                    value={item.payoutPrice}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "payoutPrice",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Seating arrangement */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.seatingArrangement}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "seatingArrangement",
                        e.target.value as InventoryItem["seatingArrangement"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Not Seated Together">Not Seated Together</option>
                    <option value="Seated Together">Seated Together</option>
                    <option value="Aisle Seats">Aisle Seats</option>
                    <option value="Center Seats">Center Seats</option>
                  </select>
                </td>

                {/* Last Seat */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="text"
                    value={item.lastSeat || ""}
                    onChange={(e) =>
                      handleCellChange(item.id, "lastSeat", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Date to ship */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="date"
                    value={item.dateToShip}
                    onChange={(e) =>
                      handleCellChange(item.id, "dateToShip", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Tickets in hand */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={String(item.ticketsInHand)}
                    onChange={(e) =>
                      handleCellChange(item.id, "ticketsInHand", e.target.value === "true")
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </td>

                {/* Match event */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="text"
                    value={item.matchEvent}
                    onChange={(e) =>
                      handleCellChange(item.id, "matchEvent", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Fan area */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.fanArea}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "fanArea",
                        e.target.value as InventoryItem["fanArea"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Home">Home</option>
                    <option value="Away">Away</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </td>

                {/* Notes */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <input
                    type="text"
                    value={item.notes}
                    onChange={(e) =>
                      handleCellChange(item.id, "notes", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>

                {/* Benefits */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.benefits}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "benefits",
                        e.target.value as InventoryItem["benefits"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="None">None</option>
                    <option value="Free Parking">Free Parking</option>
                    <option value="VIP Access">VIP Access</option>
                    <option value="Food and Beverage Included">Food and Beverage Included</option>
                    <option value="Merchandise Discount">Merchandise Discount</option>
                  </select>
                </td>

                {/* Restrictions */}
                <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                  <select
                    value={item.restrictions}
                    onChange={(e) =>
                      handleCellChange(
                        item.id,
                        "restrictions",
                        e.target.value as InventoryItem["restrictions"]
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="None">None</option>
                    <option value="Age Limit">Age Limit</option>
                    <option value="Bag Policy">Bag Policy</option>
                    <option value="No Re-entry">No Re-entry</option>
                    <option value="Camera Restrictions">Camera Restrictions</option>
                  </select>
                </td>

                {/* ✅ Sticky actions column */}
                <td className="w-32 px-4 py-5 sticky right-0 bg-white z-20 text-sm flex items-center justify-center space-x-2 border-gray-200">
                  {/* Clone */}
                  <button
                    onClick={() => handleClone(item)}
                    className={
                      clonedItemIds.includes(item.id)
                        ? "text-green-500"
                        : "text-blue-600 hover:text-blue-900"
                    }
                  >
                    {/* Clone icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="1.2em"
                      height="1.2em"
                      fill="currentColor"
                    >
                      <path d="M256 0c-25.3 0-47.2 14.7-57.6 36-7-2.6-14.5-4-22.4-4-35.3 0-64 28.7-64 64v165.5l-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5l87.7 87.7c48 48 113.1 75 181 75H304c1.5 0 3-.1 4.5-.4 91.7-6.2 165-79.4 171.1-171.1.3-1.5.4-3 .4-4.5V160c0-35.3-28.7-64-64-64-5.5 0-10.9.7-16 2v-2c0-35.3-28.7-64-64-64-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zm-16 96.1V64c0-8.8 7.2-16 16-16s16 7.2 16 16v168c0 13.3 10.7 24 24 24s24-10.7 24-24V95.9c0-8.8 7.2-16 16-16s16 7.2 16 16v136c0 13.3 10.7 24 24 24s24-10.7 24-24V160c0-8.8 7.2-16 16-16s16 7.2 16 16v172.9c-.1.6-.1 1.3-.2 1.9-3.4 69.7 59.3 125.6 129 129-.6 0-1.3.1-1.9.2h-13.4c-55.2 0-108.1-21.9-147.1-60.9l-87.7-87.8c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l43.7 43.7c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V96c0-8.8 7.2-16 16-16s16 7.1 16 15.9V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96.1z" />
                    </svg>
                  </button>

                  <div className="h-6 border-l border-gray-300" />

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-red-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 960 960"
                      width="20px"
                      height="20px"
                      fill="currentColor"
                    >
                      <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableSection;
