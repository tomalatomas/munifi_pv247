import { Course, Person } from './types';

export const coursesData: Course[] = [
	{ code: 'A', teachers: ['1'], students: ['a', 'b', 'c', 'd'] },
	{ code: 'B', teachers: ['2', '3'], students: ['a', 'b', 'e'] },
	{ code: 'C', teachers: ['2', '5'] },
	{ code: 'D', teachers: ['1', '3'], students: ['a', 'b', 'd'] },
	{ code: 'E' }
];

export const peopleData: Person[] = [
	{
		id: 'a',
		name: 'John',
		type: 'student',
		semester: 1
	},
	{
		id: 'b',
		name: 'Jimmy',
		type: 'student',
		semester: 2
	},
	{
		id: 'c',
		name: 'Laura',
		type: 'student',
		semester: 3
	},
	{
		id: 'd',
		name: 'Peter',
		type: 'student',
		semester: 4
	},
	{
		id: '1',
		name: 'Mr. Shady',
		type: 'teacher'
	},
	{
		id: '2',
		name: 'Mr. Slim',
		type: 'teacher'
	},
	{
		id: '3',
		name: 'Mrs. Julie',
		type: 'teacher'
	},
	{
		id: '4',
		name: 'Mrs. Judy',
		type: 'teacher'
	}
];
