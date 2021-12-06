// Get page elements
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const resetButton = document.querySelector('.button--reset');
const colorPickerOne = document.querySelector('#settingsColorOne');
const colorPickerTwo = document.querySelector('#settingsColorTwo');
const colorPickerThree = document.querySelector('#settingsColorThree');
const colorPickerFour = document.querySelector('#settingsColorFour');
const colorPickerFive = document.querySelector('#settingsColorFive');
const colorPickerSix = document.querySelector('#settingsColorSix');
const cellsRangeInput = document.querySelector('#settingsCells');

// Set up constants and variables
const colorPickers = [
  colorPickerOne,
  colorPickerTwo,
  colorPickerThree,
  colorPickerFour,
  colorPickerFive,
  colorPickerSix,
];
const cellSizes = [2, 4, 8, 12, 16];
const defaultCellSize = 2;
let numberOfCols = cellSizes[defaultCellSize];
let numberOfRows = cellSizes[defaultCellSize];
let colSize = canvas.width / cellSizes[defaultCellSize];
let rowSize = canvas.height / cellSizes[defaultCellSize];
const defaultColors = [
  '#BCCAC0', // #1: blue
  '#75938E', // #2: green
  '#CDA273', // #3; yellow
  '#D47D41', // #4: orange
  '#9F503E', // #5: red
  '#403940', // #6: grey
];
let colors = [...defaultColors];
const forms = [
  'triangle',
  'half',
  'circle-full',
  'circle-half',
  'circle-quarter',
]

/**
 * Get a random element from a given array
 *
 * @param arrayName
 * @returns {*}
 */
function getRandomItemFromArray(arrayName) {
  return arrayName[Math.floor(Math.random() * arrayName.length)];
}

/**
 * Add a triangle to the canvas
 *
 * @param ctx
 * @param rowIndex
 * @param colIndex
 */
function addTriangle(ctx, rowIndex, colIndex) {
  const triangleTypes = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
  const triangleType = getRandomItemFromArray(triangleTypes);

  switch (triangleType) {
    case 'top-right':
      ctx.moveTo(colIndex * colSize + colSize, rowIndex * rowSize);
      ctx.lineTo(colIndex * colSize + colSize, rowIndex * rowSize + rowSize);
      ctx.lineTo(colIndex * colSize, rowIndex * rowSize);
      break;
    case 'top-left':
      ctx.moveTo(colIndex * colSize, rowIndex * rowSize);
      ctx.lineTo(colIndex * colSize + colSize, rowIndex * rowSize);
      ctx.lineTo(colIndex * colSize, rowIndex * rowSize + rowSize);
      break;
    case 'bottom-right':
      ctx.moveTo(colIndex * colSize + colSize, rowIndex * rowSize + rowSize);
      ctx.lineTo(colIndex * colSize, rowIndex * rowSize + rowSize);
      ctx.lineTo(colIndex * colSize + colSize, rowIndex * rowSize);
      break;
    case 'bottom-left':
      ctx.moveTo(colIndex * colSize, rowIndex * rowSize + rowSize);
      ctx.lineTo(colIndex * colSize, rowIndex * rowSize);
      ctx.lineTo(colIndex * colSize + colSize, rowIndex * rowSize + rowSize);
      break;
  }
}

/**
 * Add rectangle to the canvas (half size of grid)
 *
 * @param ctx
 * @param rowIndex
 * @param colIndex
 */
function addHalf(ctx, rowIndex, colIndex) {
  const halfTypes = ['horizontal-top', 'horizontal-bottom', 'vertical-right', 'vertical-left'];
  const halfType = getRandomItemFromArray(halfTypes);

  switch (halfType) {
    case 'horizontal-top':
      ctx.fillRect(colIndex * colSize, rowIndex * rowSize, colSize, rowSize / 2);
      break;
    case 'horizontal-bottom':
      ctx.fillRect(colIndex * colSize, rowIndex * rowSize + rowSize / 2, colSize, rowSize / 2);
      break;
    case 'vertical-right':
      ctx.fillRect(colIndex * colSize + colSize / 2, rowIndex * rowSize, colSize / 2, rowSize);
      break;
    case 'vertical-left':
      ctx.fillRect(colIndex * colSize, rowIndex * rowSize, colSize / 2, rowSize);
      break;
  }
}

/**
 * Add a full circle to the canvas
 *
 * @param ctx
 * @param rowIndex
 * @param colIndex
 */
function addCircleFull(ctx, rowIndex, colIndex) {
  ctx.arc(colIndex * colSize + colSize / 2, rowIndex * rowSize + rowSize / 2, rowSize / 2, 0, 2 * Math.PI);
}

/**
 * Add a half circle to the canvas
 *
 * @param ctx
 * @param rowIndex
 * @param colIndex
 */
function addCircleHalf(ctx, rowIndex, colIndex) {
  const circleHalfTypes = ['top', 'bottom', 'right', 'left'];
  const circleHalfType = getRandomItemFromArray(circleHalfTypes);

  switch (circleHalfType) {
    case 'top':
      ctx.arc(colIndex * colSize + colSize / 2, rowIndex * rowSize, rowSize / 2, 0, Math.PI);
      break;
    case 'bottom':
      ctx.arc(colIndex * colSize + colSize / 2, rowIndex * rowSize + rowSize, rowSize / 2, Math.PI, 2 * Math.PI);
      break;
    case 'right':
      ctx.arc(colIndex * colSize + colSize, rowIndex * rowSize + rowSize / 2, rowSize / 2, 0.5 * Math.PI, 1.5 * Math.PI);
      break;
    case 'left':
      ctx.arc(colIndex * colSize, rowIndex * rowSize + rowSize / 2, rowSize / 2, 1.5 * Math.PI, 2.5 * Math.PI);
      break;
  }
}

/**
 * Add a quarter circle to the canvas
 *
 * @param ctx
 * @param rowIndex
 * @param colIndex
 */
function addCircleQuarter(ctx, rowIndex, colIndex) {
  const circleQuarterTypes = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
  const circleQuarterType = getRandomItemFromArray(circleQuarterTypes);
  switch (circleQuarterType) {
    case 'top-right':
      ctx.moveTo(colIndex * colSize + colSize, rowIndex * rowSize);
      ctx.arc(colIndex * colSize + colSize, rowIndex * rowSize, rowSize, 0.5 * Math.PI, Math.PI);
      break;
    case 'top-left':
      ctx.moveTo(colIndex * colSize, rowIndex * rowSize);
      ctx.arc(colIndex * colSize, rowIndex * rowSize, rowSize, 0, .5 * Math.PI);
      break;
    case 'bottom-right':
      ctx.moveTo(colIndex * colSize + colSize, rowIndex * rowSize + rowSize);
      ctx.arc(colIndex * colSize + colSize, rowIndex * rowSize + rowSize, rowSize, 1 * Math.PI, 1.5 * Math.PI);
      break;
    case 'bottom-left':
      ctx.moveTo(colIndex * colSize, rowIndex * rowSize + rowSize);
      ctx.arc(colIndex * colSize, rowIndex * rowSize + rowSize, rowSize, -0.5 * Math.PI, 0);
      break;
  }
}

/**
 * Update the cell size
 *
 * @param newSize
 */
function updateCellSize(newSize) {
  numberOfCols = cellSizes[newSize];
  numberOfRows = cellSizes[newSize];
  colSize = canvas.width / cellSizes[newSize];
  rowSize = canvas.height / cellSizes[newSize];
}

/**
 * Draw illustration on canvas
 */
function draw() {
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numberOfCols; colIndex++) {
      const form = getRandomItemFromArray(forms);
      ctx.beginPath();
      ctx.fillStyle = getRandomItemFromArray(colors);

      // add cell's background color
      ctx.fillRect(colIndex * colSize, rowIndex * rowSize, colSize, rowSize);

      // add a random form to the cell
      ctx.beginPath();
      ctx.fillStyle = getRandomItemFromArray(colors);
      switch (form) {
        case 'triangle':
          addTriangle(ctx, rowIndex, colIndex)
          break;
        case 'half':
          addHalf(ctx, rowIndex, colIndex)
          break;
        case 'circle-full':
          addCircleFull(ctx, rowIndex, colIndex)
          break;
        case 'circle-half':
          addCircleHalf(ctx, rowIndex, colIndex)
          break;
        case 'circle-quarter':
          addCircleQuarter(ctx, rowIndex, colIndex)
          break;
        default:
          break;
      }
      ctx.fill();
    }
  }
}

// Draw new illustration on illustration click
canvas.addEventListener('click', () => draw());

// Reset the colors when the reset button is clicked
resetButton.addEventListener('click', () => {
  for (let i = 0; i < defaultColors.length; i++) {
    colorPickers[i].value = defaultColors[i];
  }
  colors = [...defaultColors];
  updateCellSize(defaultCellSize);
  cellsRangeInput.value = defaultCellSize;
  draw();
});

// Update colors when color input changes
colorPickers.forEach((colorPicker) => {
  colorPicker.addEventListener('input', (event) => {
    colors[event.target.getAttribute('data-color-index')] = event.target.value;
    draw();
  })
})

// Change number of rows and cols when the cells range changes
cellsRangeInput.addEventListener('input', (event) => {
  updateCellSize(+event.target.value)
  draw();
})

// Draw illustration when the page first loads
draw();
