install:
	npx ci

run:
	npm run dev

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

serve:
	npx webpack serve

.PHONY: test