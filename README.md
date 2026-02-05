# Package Sorting System

A robotic arm package sorting function for Smarter Technology's automated factory.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
```bash
cd application-thoughtful-automation
```

2. Install the required dependencies:
```bash
npm install
```

This will install Jest, the testing framework used for validation.

## Running the Tests

To verify the correctness of the implementation, run the test suite:

```bash
npm test
```

### Test Coverage

The test suite includes **36 comprehensive test cases** covering:

- **STANDARD Stack Tests**: Packages that are neither bulky nor heavy
- **SPECIAL Stack Tests**: Packages that are either bulky or heavy (but not both)
- **REJECTED Stack Tests**: Packages that are both bulky and heavy
- **Boundary Condition Tests**: Edge cases at exact thresholds
- **Error Handling Tests**: Invalid inputs and negative values

### Expected Test Results

When you run `npm test`, all 36 tests should pass. The output will show:
- ✓ Test execution summary
- ✓ All test cases passing
- ✓ Coverage information

## Implementation Details

The `sort.js` file implements the core sorting function:

```javascript
sort(width, height, length, mass)
```

**Parameters:**
- `width` (number): Width in centimeters
- `height` (number): Height in centimeters
- `length` (number): Length in centimeters
- `mass` (number): Mass in kilograms

**Returns:**
- `"STANDARD"`: For packages that are neither bulky nor heavy
- `"SPECIAL"`: For packages that are bulky or heavy (but not both)
- `"REJECTED"`: For packages that are both bulky and heavy

### Sorting Criteria

**Bulky Package Definition:**
- Volume (Width × Height × Length) ≥ 1,000,000 cm³, OR
- Any dimension ≥ 150 cm

**Heavy Package Definition:**
- Mass ≥ 20 kg

## Manual Testing

To test the function manually in a Node.js environment:

```javascript
const sort = require('./sort.js');

// Standard package
console.log(sort(50, 50, 50, 10));        // Output: "STANDARD"

// Special package (heavy but not bulky)
console.log(sort(50, 50, 50, 20));        // Output: "SPECIAL"

// Special package (bulky but not heavy)
console.log(sort(100, 100, 100, 5));      // Output: "SPECIAL"

// Rejected package (both heavy and bulky)
console.log(sort(100, 100, 100, 20));     // Output: "REJECTED"
```

## Verification Checklist

- [x] Correct sorting logic for all three categories
- [x] Input validation (type checking)
- [x] Non-negative value validation
- [x] Boundary condition handling
- [x] Floating-point number support
- [x] Comprehensive test coverage (36 test cases)
- [x] All tests passing
