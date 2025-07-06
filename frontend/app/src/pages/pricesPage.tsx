// pricesPage.tsx
import React, { useState } from 'react';
import Header from './Header';
import {
  FaTshirt, FaHandsHelping, FaShoePrints, FaHome, FaChild, FaPaw, FaShower, FaBoxOpen,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';

// Import the price data
import {
  womensWorldPrices,
  mensWorldPrices,
  mensSpecialCarePrices,
  perKGPricing,
  shoesBagsPrices,
  curtainsPrices,
  curtainsPerKg,
  householdPrices,
  carpetRugPrices,
  childrenWorldPrices,
  softToyPrices
} from './PricesData'; // Adjust path if needed

function PricesPage() {
  // State to manage the collapsed/expanded status of each section
  const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>({
    "Women's World": false,
    "Men's World": true,
    "Men's Special Care": true,
    "Per KG Pricing": true,
    "Shoes & Bags World": true,
    "Curtains World": true,
    "Curtains per KG": true,
    "Household World": true,
    "Carpet & Rug's World": true,
    "Children's World": true,
    "Soft Toy's World": true,
  });

  // Function to toggle the collapse state for a given section
  const toggleSection = (title: string) => {
    setCollapsedSections(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  // Updated renderTable function to handle collapse/expand
  const renderTable = (
    data: any[],
    title: string,
    headers: { label: string; key: string }[],
    isCollapsed: boolean,
    onToggle: () => void
  ) => (
    <div className="bg-white p-6 rounded-lg shadow-xl mb-10 w-full animate-fade-in">
      <h2
        className="text-2xl font-bold text-blue-700 mb-6 flex items-center cursor-pointer justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center">
          {title === "Women's World" && <FaTshirt className="mr-3 text-pink-500" />}
          {title === "Men's World" && <FaTshirt className="mr-3 text-blue-500" />}
          {title === "Men's Special Care" && <FaHandsHelping className="mr-3 text-green-500" />}
          {title === "Per KG Pricing" && <FaBoxOpen className="mr-3 text-purple-500" />}
          {title === "Shoes & Bags World" && <FaShoePrints className="mr-3 text-yellow-600" />}
          {title === "Curtains World" && <FaShower className="mr-3 text-teal-500" />}
          {title === "Household World" && <FaHome className="mr-3 text-orange-500" />}
          {title === "Carpet & Rug's World" && <FaHome className="mr-3 text-indigo-500" />}
          {title === "Children's World" && <FaChild className="mr-3 text-lime-500" />}
          {title === "Soft Toy's World" && <FaPaw className="mr-3 text-brown-500" />}
          {title}
        </div>
        {isCollapsed ? (
          <FaChevronDown className="text-gray-500" />
        ) : (
          <FaChevronUp className="text-gray-500" />
        )}
      </h2>

      {!isCollapsed && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {headers.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {row[header.key] || 'NA'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header showNavLinks={true} isLoggedIn={false} />

      <div className="flex-grow flex flex-col items-center py-16 px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-8 text-center animate-fade-in-down">
          Our Transparent Pricing
        </h1>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl text-center animate-fade-in">
          Find competitive and clear pricing for all our laundry, dry cleaning, and specialized services.
        </p>

        <div className="w-full max-w-6xl space-y-12">
          {renderTable(womensWorldPrices, "Women's World", [
            { label: 'Item', key: 'item' },
            { label: 'Dry Clean', key: 'dryClean' },
            { label: 'Only Steam Ironing', key: 'steamIroning' },
            { label: 'Stiffening', key: 'stiffening' }
          ], collapsedSections["Women's World"], () => toggleSection("Women's World"))}

          {renderTable(mensWorldPrices, "Men's World", [
            { label: 'Item', key: 'item' },
            { label: 'Dry Clean', key: 'dryClean' },
            { label: 'Only Steam Ironing', key: 'steamIroning' },
            { label: 'Stiffening', key: 'stiffening' }
          ], collapsedSections["Men's World"], () => toggleSection("Men's World"))}

          {renderTable(mensSpecialCarePrices, "Men's Special Care", [
            { label: 'Item', key: 'item' },
            { label: 'Washing Price', key: 'washingPrice' },
            { label: 'Ironing Price', key: 'ironingPrice' }
          ], collapsedSections["Men's Special Care"], () => toggleSection("Men's Special Care"))}

          {renderTable(perKGPricing, "Per KG Pricing", [
            { label: 'Type', key: 'type' },
            { label: 'Price', key: 'price' }
          ], collapsedSections["Per KG Pricing"], () => toggleSection("Per KG Pricing"))}

          {renderTable(shoesBagsPrices, "Shoes & Bags World", [
            { label: 'Item', key: 'item' },
            { label: 'Washing Price', key: 'washingPrice' }
          ], collapsedSections["Shoes & Bags World"], () => toggleSection("Shoes & Bags World"))}

          {renderTable(curtainsPrices, "Curtains World", [
            { label: 'Item', key: 'item' },
            { label: 'Cotton', key: 'cotton' },
            { label: 'Medium', key: 'medium' },
            { label: 'Heavy', key: 'heavy' }
          ], collapsedSections["Curtains World"], () => toggleSection("Curtains World"))}

          {renderTable(curtainsPerKg, "Curtains per KG", [
            { label: 'Item', key: 'item' },
            { label: 'Price', key: 'price' }
          ], collapsedSections["Curtains per KG"], () => toggleSection("Curtains per KG"))}

          {renderTable(householdPrices, "Household World", [
            { label: 'Item', key: 'item' },
            { label: 'Dry Clean', key: 'dryClean' },
            { label: 'Only Steam Ironing', key: 'steamIroning' }
          ], collapsedSections["Household World"], () => toggleSection("Household World"))}

          {renderTable(carpetRugPrices, "Carpet & Rug's World", [
            { label: 'Item', key: 'item' },
            { label: 'Washing', key: 'washing' }
          ], collapsedSections["Carpet & Rug's World"], () => toggleSection("Carpet & Rug's World"))}

          {renderTable(childrenWorldPrices, "Children's World", [
            { label: 'Item', key: 'item' },
            { label: 'Dry Clean', key: 'dryClean' },
            { label: 'Only Steam Ironing', key: 'steamIroning' },
            { label: 'Stiffening', key: 'stiffening' }
          ], collapsedSections["Children's World"], () => toggleSection("Children's World"))}

          {renderTable(softToyPrices, "Soft Toy's World", [
            { label: 'Item', key: 'item' },
            { label: 'Washing', key: 'washing' }
          ], collapsedSections["Soft Toy's World"], () => toggleSection("Soft Toy's World"))}

          {/* Important Notes Section */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md mt-12 animate-fade-in">
            <h3 className="font-bold text-lg mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>For only steam ironing, clothes will be delivered in bulk packing.</li>
              <li>Items marked with '*' indicate starting prices.</li>
              <li>Prices will vary depending upon the size and quality of the article.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-blue-700 text-white text-center text-sm">
        &copy; {new Date().getFullYear()} Fresh Threads. All rights reserved.
      </footer>
    </div>
  );
}

export default PricesPage;