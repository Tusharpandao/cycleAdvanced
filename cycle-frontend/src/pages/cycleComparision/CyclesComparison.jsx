import React, { useState, useEffect } from "react";
import { FaTimes, FaStar, FaPlus, FaDownload, FaEdit } from "react-icons/fa";
import HeroCycle from "../../assets/HeroCycle.png";
import GiantCycle from "../../assets/Giant.webp";
import AvonCycle from "../../assets/Avon.jpg";
import AtlasCycle from "../../assets/Atlas.jpg";
import SchwinnCycle from "../../assets/Schwinn.png";


const CycleComparison = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [selectedCycles, setSelectedCycles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectionError, setSelectionError] = useState({});
  const [selectedBrands, setSelectedBrands] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});
  const [previewImages, setPreviewImages] = useState({});
  const [enlargedImage, setEnlargedImage] = useState(null);
  const MAX_COMPARISON_ITEMS = 4;

  // Static cycle data with Schwinn added
  const cycleData = [
    {
      id: 1,
      brand: "Hero",
      model: "Sprint",
      price: 6910,
      image: HeroCycle,
      specifications: {
        frame: "Steel",
        handlebar: "Flat",
        seating: "Upright",
        wheel: "Spokes",
        tyre: "Tube",
        brakes: "V-Brake",
        chainAssembly: "4 Gears",
      },
      rating: 4.2,
      reviewCount: 120,
      warranty: "1 Year",
      maxSpeed: "25 km/h",
      finance: "1,389/month",
      insurance: "3,455",
      variant: "standard",
    },
    {
      id: 2,
      brand: "Avon",
      model: "Ranger",
      price: 6390,
      image: AvonCycle,
      specifications: {
        frame: "Aluminum",
        handlebar: "Curved",
        seating: "Racing",
        wheel: "Alloy",
        tyre: "Tubeless",
        brakes: "Disc",
        chainAssembly: "6 Gears",
      },
      rating: 4.5,
      reviewCount: 210,
      warranty: "2 Years",
      maxSpeed: "30 km/h",
      finance: "1,285/month",
      insurance: "3,190",
      variant: "standard",
    },
    {
      id: 3,
      brand: "Atlas",
      model: "Explorer",
      price: 5950,
      image: AtlasCycle,
      specifications: {
        frame: "Carbon Steel",
        handlebar: "Flat",
        seating: "Comfort",
        wheel: "Spokes",
        tyre: "Tube",
        brakes: "Caliper",
        chainAssembly: "Single Speed",
      },
      rating: 3.8,
      reviewCount: 75,
      warranty: "6 Months",
      maxSpeed: "20 km/h",
      finance: "1,125/month",
      insurance: "2,975",
      variant: "deluxe",
    },
    {
      id: 4,
      brand: "Giant",
      model: "Mountain Pro",
      price: 8450,
      image: GiantCycle,
      specifications: {
        frame: "Carbon Fiber",
        handlebar: "Riser",
        seating: "Mountain",
        wheel: "Alloy",
        tyre: "All-Terrain",
        brakes: "Hydraulic Disc",
        chainAssembly: "8 Gears",
      },
      rating: 4.8,
      reviewCount: 302,
      warranty: "3 Years",
      maxSpeed: "35 km/h",
      finance: "1,695/month",
      insurance: "4,230",
      variant: "premium",
    },
  ];

  // Extended cycle data with variants and Schwinn
  const extendedCycleData = [
    ...cycleData,
    {
      id: 5,
      brand: "Hero",
      model: "Sprint Deluxe",
      price: 7950,
      image: HeroCycle,
      specifications: {
        frame: "Aluminum",
        handlebar: "Flat",
        seating: "Upright",
        wheel: "Alloy",
        tyre: "Tube",
        brakes: "Disc",
        chainAssembly: "6 Gears",
      },
      rating: 4.4,
      reviewCount: 85,
      warranty: "2 Years",
      maxSpeed: "28 km/h",
      finance: "1,589/month",
      insurance: "3,975",
      variant: "deluxe",
    },
    {
      id: 6,
      brand: "Hero",
      model: "Sprint Premium",
      price: 9250,
      image: HeroCycle,
      specifications: {
        frame: "Carbon Fiber",
        handlebar: "Ergonomic",
        seating: "Premium",
        wheel: "Alloy",
        tyre: "Tubeless",
        brakes: "Hydraulic Disc",
        chainAssembly: "8 Gears",
      },
      rating: 4.7,
      reviewCount: 65,
      warranty: "3 Years",
      maxSpeed: "32 km/h",
      finance: "1,850/month",
      insurance: "4,625",
      variant: "premium",
    }, {
      id: 11,
      brand: "Giant",
      model: "City Cruiser",
      price: 6850,
      image: GiantCycle,
      specifications: {
        frame: "Aluminum",
        handlebar: "Flat",
        seating: "Comfort",
        wheel: "Alloy",
        tyre: "Standard",
        brakes: "V-Brake",
        chainAssembly: "6 Gears",
      },
      rating: 4.2,
      reviewCount: 175,
      warranty: "2 Years",
      maxSpeed: "28 km/h",
      finance: "1,370/month",
      insurance: "3,425",
      variant: "standard",
    },
    // Add Atlas Standard variant
    {
      id: 12,
      brand: "Atlas",
      model: "City Rider",
      price: 5250,
      image: AtlasCycle,
      specifications: {
        frame: "Steel",
        handlebar: "Flat",
        seating: "Standard",
        wheel: "Spokes",
        tyre: "Tube",
        brakes: "Caliper",
        chainAssembly: "Single Speed",
      },
      rating: 3.9,
      reviewCount: 105,
      warranty: "1 Year",
      maxSpeed: "18 km/h",
      finance: "1,050/month",
      insurance: "2,625",
      variant: "standard",
    },
    // Add Avon Deluxe variant
    {
      id: 13,
      brand: "Avon",
      model: "Ranger Deluxe",
      price: 7590,
      image: AvonCycle,
      specifications: {
        frame: "Lightweight Aluminum",
        handlebar: "Ergonomic",
        seating: "Comfort Gel",
        wheel: "Double Wall Alloy",
        tyre: "Tubeless",
        brakes: "Disc",
        chainAssembly: "8 Gears",
      },
      rating: 4.6,
      reviewCount: 142,
      warranty: "2 Years",
      maxSpeed: "32 km/h",
      finance: "1,518/month",
      insurance: "3,795",
      variant: "deluxe",
    },
    // Schwinn data
    {
      id: 7,
      brand: "Schwinn",
      model: "Voyager",
      price: 7890,
      image: SchwinnCycle,
      specifications: {
        frame: "Aluminum",
        handlebar: "Multi-Position",
        seating: "Comfort Gel",
        wheel: "Double Wall Alloy",
        tyre: "All-Weather",
        brakes: "Linear Pull",
        chainAssembly: "7 Gears",
      },
      rating: 4.6,
      reviewCount: 185,
      warranty: "2 Years",
      maxSpeed: "30 km/h",
      finance: "1,580/month",
      insurance: "3,945",
      variant: "standard",
    },
    {
      id: 8,
      brand: "Schwinn",
      model: "Voyager Sport",
      price: 8950,
      image: SchwinnCycle,
      specifications: {
        frame: "Lightweight Aluminum",
        handlebar: "Drop Bar",
        seating: "Sport Racing",
        wheel: "Aero Rim",
        tyre: "High-Performance",
        brakes: "Mechanical Disc",
        chainAssembly: "10 Gears",
      },
      rating: 4.7,
      reviewCount: 128,
      warranty: "2 Years",
      maxSpeed: "35 km/h",
      finance: "1,790/month",
      insurance: "4,475",
      variant: "deluxe",
    },
    {
      id: 9,
      brand: "Schwinn",
      model: "Voyager Elite",
      price: 12500,
      image: SchwinnCycle,
      specifications: {
        frame: "Carbon Fiber",
        handlebar: "Aero Carbon",
        seating: "Racing Pro",
        wheel: "Carbon Rim",
        tyre: "Tubeless Race",
        brakes: "Hydraulic Disc",
        chainAssembly: "12 Gears",
      },
      rating: 4.9,
      reviewCount: 72,
      warranty: "3 Years",
      maxSpeed: "40 km/h",
      finance: "2,500/month",
      insurance: "6,250",
      variant: "premium",
    },
    {
      id: 10,
      brand: "Schwinn",
      model: "Voyager Touring",
      price: 10800,
      image: SchwinnCycle,
      specifications: {
        frame: "Cromoly Steel",
        handlebar: "Touring",
        seating: "Brooks Leather",
        wheel: "Touring Rim",
        tyre: "Puncture-Resistant",
        brakes: "Mechanical Disc",
        chainAssembly: "14 Gears",
      },
      rating: 4.8,
      reviewCount: 94,
      warranty: "3 Years",
      maxSpeed: "32 km/h",
      finance: "2,160/month",
      insurance: "5,400",
      variant: "touring",
    },
  ];

  // Fallback brands data with Schwinn included
  const fallbackBrands = [
    { id: 1, name: "hero" },
    { id: 2, name: "giant" },
    { id: 3, name: "atlas" },
    { id: 4, name: "schwinn" },
    { id: 5, name: "avon" },
  ];

  // Available variants by brand
  const brandVariants = {
    hero: ["standard", "deluxe", "premium"],
    giant: ["standard", "premium"], 
    atlas: ["standard", "deluxe"],   
    avon: ["standard", "deluxe"],    
    schwinn: ["standard", "deluxe", "premium", "touring"],
  };

  useEffect(() => {
    // Fetch brands from API
    const fetchBrands = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch("http://localhost:8080/brand/brands", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch brands: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        // Use fallback data when API fails
        setBrands(fallbackBrands);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);


  

  // Function to get available variants for a brand
  const getAvailableVariants = (brandName) => {
    if (!brandName) return [];
    return brandVariants[brandName.toLowerCase()] || ["standard"];
  };

  // Function to check if a brand+variant combination is already selected
  const isDuplicateCombination = (index, brandName, variantName) => {
    // Skip checking the current index
    for (let i = 0; i < MAX_COMPARISON_ITEMS; i++) {
      if (
        i !== index &&
        selectedBrands[i] === brandName &&
        selectedVariants[i] === variantName
      ) {
        return true;
      }
    }
    return false;
  };

  // Function to get image preview when a brand and variant are selected
  const updatePreviewImage = (index, brandName, variantName) => {
    if (!brandName || !variantName) return;

    const matchingCycle = extendedCycleData.find(
      (c) =>
        c.brand.toLowerCase() === brandName.toLowerCase() &&
        c.variant.toLowerCase() === variantName.toLowerCase()
    );

    if (matchingCycle) {
      setPreviewImages({
        ...previewImages,
        [index]: matchingCycle.image,
      });
    }
  };

  const handleAddCycle = (index) => {
    // Check if a brand and variant are selected for this comparison slot
    const brandName = selectedBrands[index];
    const variantName = selectedVariants[index];

    if (!brandName || !variantName) return;

    // Check for duplicate brand+variant combination
    if (isDuplicateCombination(index, brandName, variantName)) {
      setSelectionError({
        ...selectionError,
        [index]:
          "This brand and variant combination is already selected. Please choose a different combination.",
      });
      return;
    }

    // Clear any previous errors
    setSelectionError({
      ...selectionError,
      [index]: null,
    });

    // Find cycle data based on the selected brand and variant
    const cycle = extendedCycleData.find(
      (c) =>
        c.brand.toLowerCase() === brandName.toLowerCase() &&
        c.variant.toLowerCase() === variantName.toLowerCase()
    );

    if (
      cycle &&
      selectedCycles.length < MAX_COMPARISON_ITEMS &&
      !selectedCycles.some((c) => c.id === cycle.id)
    ) {
      setSelectedCycles([...selectedCycles, cycle]);
    }
  };

  const handleRemoveCycle = (cycleId) => {
    setSelectedCycles(selectedCycles.filter((cycle) => cycle.id !== cycleId));

    // If all cycles are removed, go back to card view
    if (selectedCycles.length <= 1) {
      setShowComparison(false);
    }
  };

  const handleCompareNow = () => {
    if (selectedCycles.length >= 2) {
      setShowComparison(true);
    }
  };

  const handleBackToCards = () => {
    setShowComparison(false);
  };

  const handleBrandChange = (index, brandName) => {
    setSelectedBrands({ ...selectedBrands, [index]: brandName });
    // Reset variant when brand changes
    setSelectedVariants({ ...selectedVariants, [index]: null });
    // Clear any previous errors
    setSelectionError({
      ...selectionError,
      [index]: null,
    });
    // Clear preview image
    const updatedPreviewImages = { ...previewImages };
    delete updatedPreviewImages[index];
    setPreviewImages(updatedPreviewImages);
  };

  const handleVariantChange = (index, variant) => {
    const brandName = selectedBrands[index];

    // Check for duplicate brand+variant combination
    if (isDuplicateCombination(index, brandName, variant)) {
      setSelectionError({
        ...selectionError,
        [index]:
          "This brand and variant combination is already selected. Please choose a different combination.",
      });
    } else {
      // Clear any previous errors
      setSelectionError({
        ...selectionError,
        [index]: null,
      });
    }

    setSelectedVariants({ ...selectedVariants, [index]: variant });

    // Update preview image
    updatePreviewImage(index, brandName, variant);
  };

  const handleEnlargeImage = (image, title) => {
    setEnlargedImage({ image, title });
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading cycles...</p>
      </div>
    );
  }

  // Card View
  if (!showComparison) {
    return (
      <div className="container mx-auto p-4 py-12">
     

        {errorMessage && (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
            role="alert"
          >
            <p>{errorMessage}</p>
          </div>
        )}
        <h1 className="text-2xl font-bold my-6 text-center">Compare Cycles</h1>
        <p className="text-center text-blue-500 font-bold mb-6">
          Select cycles to compare (up to {MAX_COMPARISON_ITEMS})
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-md bg-white"
            >
              <div className="p-4 flex flex-col items-center justify-center">
                {previewImages[index] ? (
                  <div className="w-40 h-40 flex items-center justify-center mb-4 relative">
                    <img
                      src={previewImages[index]}
                      alt="Cycle Preview"
                      className="max-w-full max-h-full object-contain cursor-pointer"
                      onClick={() =>
                        handleEnlargeImage(
                          previewImages[index],
                          `${selectedBrands[index]} ${selectedVariants[index]}`
                        )
                      }
                    />
                    {!selectedCycles.some(
                      (cycle) => cycle.image === previewImages[index]
                    ) && (
                      <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
                        <FaEdit className="text-blue-500" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <FaPlus className="text-gray-400 text-2xl" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-center">
                  {previewImages[index]
                    ? `${selectedBrands[index]} ${selectedVariants[index]}`
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    : "Add Cycle"}
                </h3>
              </div>
              <div className="p-4">
                <div className="mt-2">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedBrands[index] || ""}
                    onChange={(e) => handleBrandChange(index, e.target.value)}
                  >
                    <option value="">Select Brand/Model</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name.charAt(0).toUpperCase() +
                          brand.name.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedVariants[index] || ""}
                    onChange={(e) => handleVariantChange(index, e.target.value)}
                    disabled={!selectedBrands[index]}
                  >
                    <option value="">Select Variant</option>
                    {getAvailableVariants(selectedBrands[index]).map(
                      (variant) => (
                        <option key={variant} value={variant}>
                          {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </option>
                      )
                    )}
                  </select>
                </div>
                {selectionError[index] && (
                  <div className="mt-2 text-red-500 text-sm">
                    {selectionError[index]}
                  </div>
                )}
                <div className="mt-2">
                  <button
                    onClick={() => handleAddCycle(index)}
                    disabled={
                      !selectedBrands[index] ||
                      !selectedVariants[index] ||
                      selectionError[index]
                    }
                    className={`w-full p-2 rounded text-center ${
                      !selectedBrands[index] ||
                      !selectedVariants[index] ||
                      selectionError[index]
                        ? "bg-gray-300 text-gray-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Add to Compare
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected cycles bar */}
        {selectedCycles.length > 0 && (
          <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t p-4 z-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="mr-4 font-semibold">
                  {selectedCycles.length} Cycle
                  {selectedCycles.length > 1 ? "s" : ""} Selected
                </span>
                <div className="flex space-x-4">
                  {selectedCycles.map((cycle) => (
                    <div key={cycle.id} className="relative">
                      <img
                        src={cycle.image}
                        alt={`${cycle.brand} ${cycle.model}`}
                        className="w-16 h-16 object-cover rounded cursor-pointer"
                        onClick={() =>
                          handleEnlargeImage(
                            cycle.image,
                            `${cycle.brand} ${cycle.model}`
                          )
                        }
                      />
                      <button
                        onClick={() => handleRemoveCycle(cycle.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  {selectedCycles.length < MAX_COMPARISON_ITEMS && (
                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                      <FaPlus className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleCompareNow}
                disabled={selectedCycles.length < 2}
                className={`px-6 py-2 rounded ${
                  selectedCycles.length < 2
                    ? "bg-gray-300 text-gray-700"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Compare Now
              </button>
            </div>
          </div>
        )}

        {/* Enlarged Image Modal */}
        {enlargedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-11/12 max-w-3xl overflow-hidden shadow-2xl">
              <div className="relative">
                <button
                  onClick={handleCloseEnlargedImage}
                  className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 z-10"
                >
                  <FaTimes className="text-gray-700" />
                </button>
                <div className="w-full">
                  <img
                    src={enlargedImage.image}
                    alt={enlargedImage.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="p-4 border-t">
                <h3 className="text-xl font-semibold">{enlargedImage.title}</h3>
                {selectedCycles.find(
                  (cycle) => cycle.image === enlargedImage.image
                ) && (
                  <div className="mt-2 text-gray-700">
                    <p className="font-medium">
                      ₹
                      {selectedCycles
                        .find((cycle) => cycle.image === enlargedImage.image)
                        .price.toLocaleString()}
                      *
                    </p>
                    <p className="text-sm text-gray-500">*Ex-showroom Price</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Comparison View
  return (
    <div className="container mx-auto p-4 py-12 border border-gray-300 bg-white shadow-lg rounded-lg">
      <button
        onClick={handleBackToCards}
        className="mb-4  bg-blue-500 text-white px-4 py-2 rounded-md  hover:bg-blue-600 flex items-center" 
      >
        &larr; Back to Cycles
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Cycles Comparison</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">Features</th>
              {selectedCycles.map((cycle) => (
                <th key={cycle.id} className="p-3 text-left border relative">
                  <div className="flex justify-between items-center">
                    <div>
                      <div>
                        {cycle.brand} {cycle.model}
                      </div>
                      <div className="text-sm text-gray-500">
                        {cycle.variant.charAt(0).toUpperCase() +
                          cycle.variant.slice(1)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCycle(cycle.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Image Row */}
            {/* Image Row */}
<tr>
  <td className="p-3 border font-medium bg-gray-50">Image</td>
  {selectedCycles.map((cycle) => (
    <td key={cycle.id} className="p-3 border">
      <div className="flex flex-col items-center">
        <img
          src={cycle.image}
          alt={`${cycle.brand} ${cycle.model}`}
          className="w-60 h-60 object-fit cursor-pointer mb-2"
          onClick={() =>
            handleEnlargeImage(
              cycle.image,
              `${cycle.brand} ${cycle.model}`
            )
          }
        />
        <button
          onClick={() => handleAddToCart(cycle)}
          className="bg-green-500 text-white font-bold p-2 rounded-md hover:bg-green-600 transition-colors mt-2 w-full"
        >
          Add to Cart
        </button>
      </div>
    </td>
  ))}
</tr>

            {/* Basic Information Section */}
            <tr className="bg-gray-200">
              <td colSpan={selectedCycles.length + 1} className="p-2 font-bold">
                Basic Information
              </td>
            </tr>

            {/* On-Road Price */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                On-Road Price
              </td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  ₹{cycle.price.toLocaleString()}*
                </td>
              ))}
            </tr>

            {/* Finance Available */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                Finance Available (EMI)
              </td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  <div>₹{cycle.finance}</div>
                  <div className="text-blue-500 cursor-pointer">
                    Get EMI Offers
                  </div>
                </td>
              ))}
            </tr>

            {/* Insurance */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Insurance</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  ₹{cycle.insurance}
                </td>
              ))}
            </tr>

            {/* User Rating */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">User Rating</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  <div className="flex items-center">
                    {cycle.rating} <FaStar className="text-yellow-400 ml-1" />
                  </div>
                  <div className="text-gray-500 text-sm">
                    Based on {cycle.reviewCount} Reviews
                  </div>
                </td>
              ))}
            </tr>

            {/* Specifications Section */}
            <tr className="bg-gray-200">
              <td colSpan={selectedCycles.length + 1} className="p-2 font-bold">
                Specifications
              </td>
            </tr>

            {/* Frame */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Frame</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.specifications.frame}
                </td>
              ))}
            </tr>

            {/* Handlebar */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Handlebar</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.specifications.handlebar}
                </td>
              ))}
            </tr>

            {/* Seating */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Seating</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.specifications.seating}
                </td>
              ))}
            </tr>

            {/* Wheel */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Wheel</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.specifications.wheel}
                </td>
              ))}
            </tr>

            {/* Tyre */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Tyre</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.specifications.tyre}
                </td>
              ))}
            </tr>

            {/* Brakes */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Brakes</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.specifications.brakes}
                </td>
              ))}
            </tr>

            {/* Chain Assembly */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                Chain Assembly
              </td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.specifications.chainAssembly}
                </td>
              ))}
            </tr>

            {/* Additional Features Section */}
            <tr className="bg-gray-300">
              <td colSpan={selectedCycles.length + 1} className="p-2 font-bold">
                Additional Features
              </td>
            </tr>

            {/* Warranty */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Warranty</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.warranty}
                </td>
              ))}
            </tr>

            {/* Max Speed */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">Max Speed</td>
              {selectedCycles.map((cycle) => (
                <td key={cycle.id} className="p-3 border">
                  {cycle.maxSpeed}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CycleComparison;
