const data = [0, 0, 0, 0, 0, 0, 0, 0];
data.map((val, index) => index);

const obj = {
	type: 'greeting',
	data,
	value: 'World'
};

console.log(`Hello ${obj.value}!! ${data.join(' > ')}`);
