import test from 'ava';
import { Lambda, DynamoDB } from '.';

test("Lambda's endpoint is correct", t => {
	const lambda = new Lambda();
	t.is(lambda.config.endpoint, 'http://localhost:4000');
});

test("DynamoDB's endpoint is correct", t => {
	const dynamoDb = new DynamoDB();
	t.is(dynamoDb.config.endpoint, 'http://localhost:8000');
});
