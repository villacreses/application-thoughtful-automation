/**
 * Sorts packages into the appropriate stack based on volume and mass.
 * 
 * @param {number} width - Width of the package in centimeters
 * @param {number} height - Height of the package in centimeters
 * @param {number} length - Length of the package in centimeters
 * @param {number} mass - Mass of the package in kilograms
 * @returns {string} The stack name: "STANDARD", "SPECIAL", or "REJECTED"
 */
function sort(width, height, length, mass) {
  // Validate inputs
  if (
    typeof width !== "number" ||
    typeof height !== "number" ||
    typeof length !== "number" ||
    typeof mass !== "number"
  ) {
    throw new Error("All parameters must be numbers");
  }

  if (width < 0 || height < 0 || length < 0 || mass < 0) {
    throw new Error("All dimensions and mass must be non-negative");
  }

  // Check if package is bulky
  const volume = width * height * length;
  const isBulky =
    volume >= 1000000 || width >= 150 || height >= 150 || length >= 150;

  // Check if package is heavy
  const isHeavy = mass >= 20;

  // Determine stack based on criteria
  if (isBulky && isHeavy) {
    return "REJECTED";
  } else if (isBulky || isHeavy) {
    return "SPECIAL";
  } else {
    return "STANDARD";
  }
}

module.exports = sort;
