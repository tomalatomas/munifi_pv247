import { groupBy } from 'lodash';

import { peopleData, coursesData } from './data';
import { CourseDictionary, Person } from './types';

/**
 * Map over `peopleData` and based on the type of the person, either add `attends` for students or `teaches` fro teachers. You can get this additional info by searching through `courseData`. Both `attends` and `teaches` should be a string[] containing course codes. Make sure that `attends` and `teaches` attributes aren't optional in `completePeopleData` (you can achieve this by using utility type and providing it to map's generic argument)
 *
 * - [`map` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
 * - use first generic type argument of `map` to specify its return type
 */

const getAffiliatedCourses = (person: Person): string[] => {
	let courses: string[] = [];
	if (person.type === 'student') {
		// For every course check if person in in students array and then return course code that is defined
		courses = coursesData
			.filter(course =>
				course.students?.some(students => students.includes(person.id))
			)
			.map(x => x.code)
			.filter((s): s is string => Boolean(s));
	} else if (person.type === 'teacher') {
		// For every course check if person in in teachers array and then return course code that is defined
		courses = coursesData
			.filter(course =>
				course.teachers?.some(teachers => teachers.includes(person.id))
			)
			.map(x => x.code)
			.filter((s): s is string => Boolean(s));
	}
	return courses;
};

const completePeopleData = peopleData.map(person => {
	const courses = getAffiliatedCourses(person);
	if (person.type === 'student') {
		person.attends = courses;
	} else {
		person.teaches = courses;
	}
	return person;
});
console.log(
	'Complete people data:\n',
	JSON.stringify(completePeopleData, null, 2)
);

/**
 * Use `groupBy` function from 'lodash' library to group entries from `completePeopleData` based on their type into two arrays.
 *
 * - [`groupBy` documentation](https://lodash.com/docs/4.17.15#groupBy)
 */
const { student: students, teacher: teachers } = groupBy(
	completePeopleData,
	prsn => prsn.type
);
console.log('\nStudents:\n', JSON.stringify(students, null, 2));
console.log('\nTeachers:\n', JSON.stringify(teachers, null, 2));

/**
 * Create a dictionary (using `Object.fromEntries`) from `courseData`, where course codes are the keys. For values, transform teachers and students ids into names. Use 'Unknown teacher' or 'Unknown student' as a fallback if person with given name is not found.
 *
 * - [`Object.fromEntries` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
 * - explicitly provide `CourseDictionary` type to declaration of `coursesDictionary`
 */

const coursesDictionary: CourseDictionary = Object.fromEntries(
	coursesData.map(({ code, teachers, students }) => [
		code,
		{
			teachers: teachers?.map(
				teach =>
					peopleData.find(obj => obj.id === teach)?.name ?? 'Unknown teacher'
			),
			students: students?.map(
				student =>
					peopleData.find(obj => obj.id === student)?.name ?? 'Unknown student'
			)
		}
	])
);

console.log(
	'\nCourses dictionary:\n',
	JSON.stringify(coursesDictionary, null, 2)
);

/**
 * Implement a function that returns formatted string based on provided person's type.
 *
 * - If person is a student the message will be: "Student XY attends courses A,B,C"
 * - If person is a teacher the message will be: "Teacher XY teaches courses A,B,C"
 * - If no person is provided message will be: "No person provided"
 *
 * @param person Person to get info about
 * @returns String containing info about courses given person is related to
 */

const getPersonInfo = (person: Person | undefined): string => {
	if (person) {
		const courses = getAffiliatedCourses(person);
		if (person.type === 'student') {
			if (courses.length < 1) {
				return `Student ${person.name} does not attend any course`;
			}
			return `Student ${person.name} attends courses ${courses.toString()}`;
		} else if (person.type === 'teacher') {
			if (courses.length < 1) {
				return `Teacher ${person.name} does not teach any course`;
			}
			return `Teacher ${person.name} teaches courses ${courses.toString()}`;
		}
	}
	return 'No person provided';
};

console.log(
	'\nStudent info:\n',
	getPersonInfo(completePeopleData.find(p => p.type === 'student'))
);

console.log(
	'\nTeacher info:\n',
	getPersonInfo(completePeopleData.find(p => p.type === 'teacher'))
);
console.log('\nUnknown info:\n', getPersonInfo(undefined));
