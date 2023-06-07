const getFormValues = <Keys extends string>(target: unknown) =>
	Object.values(target as { id?: string; value: string }[]).reduce(
		(prev, e) => (e.id ? { ...prev, [e.id]: e.value } : prev),
		{} as Record<Keys, string>
	);

export default getFormValues;
