import { createSlice } from '@reduxjs/toolkit';
import { Rule } from '../models/rule';

const initRuleState: RuleState = {
	rules: [],
};

type RuleState = {
	rules: Rule[];
};

const defaultRules: Rule[] = [
	{
		id: 1,
		product: 'A',
		quantity: 3,
		percentage: 13.33,
	},
	{
		id: 2,
		product: 'B',
		quantity: 2,
		percentage: 25,
	},
];

const ruleSlice = createSlice({
	name: 'rule',
	initialState: initRuleState,
	reducers: {
		loadRules(state) {
			const rules = localStorage.getItem('rules');
			state.rules = rules ? JSON.parse(rules) : defaultRules;
		},
		addRule(state, action) {
			const lastIndex = Math.max(...state.rules.map((o) => o.id));
			action.payload.id = lastIndex + 1;
			action.payload.text = `${action.payload.percentage}% off ${action.payload.quantity} ${action.payload.product} items`;
			state.rules = state.rules.concat(action.payload);
			localStorage.setItem('rules', JSON.stringify(state.rules));
		},
		removeRule(state, action) {
			state.rules = state.rules.filter((rule) => rule.id !== action.payload);
			localStorage.setItem('rules', JSON.stringify(state.rules));
		},
		updateRule(state, action) {
			const ruleIndex = state.rules.findIndex(
				(rule) => rule.id === action.payload.id
			);
			state.rules[ruleIndex] = action.payload;
			localStorage.setItem('rules', JSON.stringify(state.rules));
		},
	},
});

export const ruleActions = ruleSlice.actions;

export default ruleSlice.reducer;
