// Types

type Point = [number, number];

type Coordinates = [Point, Point] | [];

type Geometry = {
	type?: string;
	coordinates: Coordinates;
};

type Dimensions = {
	width: number;
	height: number;
};

const enum GeometryTypes {
	rectangle = 'RECTANGLE',
	square = 'SQUARE'
}

/**
 * Calculates dimensions of an object based on its coordinates.
 * @param {Coordinates} coordinates Array of points defined as [number, number] tuple
 * @return {Dimensions} Non-negative width and height (representing a diagonal of an object)
 */
const getDimensions = (coordinates: Coordinates): Dimensions => {
	const [firstPoint, secondPoint] = coordinates;

	if (firstPoint && secondPoint) {
		// firstPoint and secondPoint are defined
		const width: number = Math.abs(secondPoint[0] - firstPoint[0]);
		const height: number = Math.abs(secondPoint[1] - firstPoint[1]);
		return { width, height };
	} else {
		return { width: 0, height: 0 };
	}
};

/**
 * Checks whether provided object is valid.
 *
 * - Both square and rectangle must have non-zero width and height
 * - Square must have equal width and height
 *
 * @param {Geometry} geometry Object to check
 * @return {string} Formatted message
 */
const isValidGeometry = (geometry: Geometry) => {
	const { width, height } = getDimensions(geometry.coordinates);

	const expectedType: GeometryTypes =
		width === height ? GeometryTypes.square : GeometryTypes.rectangle;

	const geometryType = (geometry.type ?? expectedType).toUpperCase();

	if (width <= 0 || height <= 0) {
		// Invalid Dimensions
		return `${geometryType} (${width}x${height}) is invalid!!!`; // Invalid geometry type
	}

	if (geometryType === expectedType) {
		// Type Dimensions are okay
		return `${geometryType} (${width}x${height}) is valid`;
	} else {
		// Type Dimensions are invalid
		return `${geometryType} (${width}x${height}) is invalid!!!`;
	}
};

// Examples

console.log(
	isValidGeometry({
		coordinates: [
			[1, 2],
			[4, 5]
		]
	})
);

console.log(
	isValidGeometry({
		type: 'RECTANGLE',
		coordinates: [
			[1, 2],
			[4, 7]
		]
	})
);

console.log(
	isValidGeometry({
		type: 'SQUARE',
		coordinates: [
			[1, 2],
			[2, 5]
		]
	})
);

console.log(
	isValidGeometry({
		coordinates: [
			[3, 3],
			[3, 5]
		]
	})
);

console.log(
	isValidGeometry({
		type: 'RECTANGLE',
		coordinates: []
	})
);
