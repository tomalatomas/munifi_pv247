/**
 * Create a type that describes `coursesData`
 */
export type Course = {
	code?: string;
	teachers?: string[];
	students?: string[];
};

/**
 * Using utility types create an object from `Course` type that represents a dictionary with course codes as keys
 *
 * ```ts
 * {
 *   A: {
 *     teachers: ['1']
 *     students: ['a', 'b', 'c', 'd']
 *   },
 *   B: {
 *     teachers: ['2', '3'],
 *     students: ['a', 'b', 'e']
 *   }
 * }
 * ```
 */

export type CourseDictionary = Record<string, Course>;

/* commented to avoid unused warning
const courseDict: CourseDictionary = {
	A: { teachers: ['1'], students: ['a', 'b', 'c', 'd'] },
	B: { teachers: ['2', '3'], students: ['a', 'b', 'e'] }
};
*/

/**
 * 
/**
 * Attributes common for both students and teachers
 */
type Common = {
	id: string;
	name: string;
	//type: 'student' | 'teacher';
};

/**
 * Discriminating `type` attribute and attributes specific to students: `attends` and `semester`.
 */
type Student = {
	attends?: string[];
	semester: number;
	type: 'student';
};

/**
 * Discriminating `type` attribute and attributes specific to teachers: `teaches`.
 */
type Teacher = {
	teaches?: string[];
	type: 'teacher';
};

/**
 * Create a type that describes `peopleData`. It should be a discriminating union type `Person` that consists of `Common` type and `Student` or `Teacher` types.
 *
 * Correctly declare `type` attribute in `Student` and `Teacher` types so it can be used as a discriminating attribute.
 */
export type Person = Common & (Student | Teacher);
