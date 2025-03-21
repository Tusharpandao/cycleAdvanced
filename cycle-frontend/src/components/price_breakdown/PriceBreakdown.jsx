import Swal from "sweetalert2";
import image from "../../assets/cycleImg.webp";
import DomainName from "../../utils/config";
import axios from "axios";
import { getAuthHeader } from "../../utils/auth";

function PriceBreakdown({ priceData, handleClear }) {

  const handleAddToCart = async () => {
    // Create toast mixin
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timerProgressBar: true,
    });

    // Show loading toast
    Toast.fire({
      title: 'Adding to cart...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false
    });

    try {
      // Extract itemIds from parts
      const itemIds = Object.values(priceData.parts).map(part => part.itemId);

      // Prepare API request body
      const apiRequestBody = {
        brand: priceData.brand,
        itemIds: itemIds,
        thumbnail: image,
        quantity: 1
      };
      console.log(apiRequestBody);

      // Make API call and wait for response
      const response = await axios.post(`${DomainName}/cart/add`, apiRequestBody, getAuthHeader());
      
      // Update toast to success
      Toast.fire({
        icon: "success",
        title: "Added to cart successfully!",
        timer: 1500,
        timerProgressBar: false,
      });

      handleClear();
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to add item to cart",
        timer: 1500
      });
    }
  };

  // Define the parts mapping for the table
  const partsMapping = [
    { label: "Frame Material", key: "Frame" },
    { label: "Handlebar Type", key: "Handlebar" },
    { label: "Seating Type", key: "Seating" },
    { label: "Wheel Type", key: "Wheel" },
    { label: "Brakes Type", key: "Brakes" },
    { label: "Tyre Type", key: "Tyre" },
    { label: "Chain Assembly", key: "Chain Assembly" }
  ];

  return (
    <>
      <div className="container">
        <h3 className="text-center font-bold pb-2 md:text-4xl text-2xl md:mb-4 text-[#213832]">
          {priceData.brand} Cycle Price
        </h3>
        <div className="price-table-container">
          <table className="price-table">
            <thead>
              <tr>
                <th>Component Type</th>
                <th>Selected Item</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {partsMapping.map(({ label, key }) => {
                const part = priceData.parts[key];
                return (
                  <tr key={key}>
                    <td>{label}</td>
                    <td>{part?.itemName || "N/A"}</td>
                    <td>{part?.price?.toFixed(2) || "0.00"}</td>
                  </tr>
                );
              })}
              <tr className="total-row">
                <td colSpan="2">Total Parts Price</td>
                <td>{priceData.totalPartsPrice.toFixed(2)}</td>
              </tr>
              <tr className="total-row">
                <td colSpan="3" style={{ textAlign: "center" }} className="space-x-4">
                  {/* <button
                    id="saveEstimate"
                    onClick={handleSaveEstimate}
                    className="bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save Estimated Price
                  </button> */}
                  <button
                    onClick={handleAddToCart}
                    className="bg-green-500 text-white font-bold p-2 rounded-md hover:bg-green-600 transition-colors ml-4"
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PriceBreakdown;
