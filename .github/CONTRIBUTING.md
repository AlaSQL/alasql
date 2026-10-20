# Contributing to making AlaSQL better


Got questions? [Tag a Stack Overflow question](http://stackoverflow.com/questions/ask?tags=AlaSQL) with `alasql`.


Inputs to improvement? [Open an issue](https://github.com/alasql/alasql/issues/new). 


**All contributions are much welcome and greatly appreciated(!)** 

- Make sure you have git, Node and yarn installed (`npm install -g yarn`)
- Fork the repo here on Github (button top right)
- Clone your forked repo and install dependencies `git clone https://github.com/MYUSERNAME/alasql/ --depth 1 && cd alasql && yarn` 
- Make sure you work with the develop branch `git checkout develop`
- Run tests to verify all is good `yarn test`
- Implement a test that reflects the issue.
  - Add a new test file for the issue: Copy `test/test000.js` and replace `000` with a new number. Preferably the number of the issue you are solving.
- Run `yarn test` to verify only the new test fails
- Implement your contributions in `src/`
- Run `yarn test` and verify all tests are OK
- Format the souce with `yarn format`
- Commit changes to git and push to your forked repo
- Click "Create Pull-request" when looking at your forked repo on Github

Please note that 
- `npm test` will compile from `src/` and overwrite `dist/` before running all tests
- If you would like to change the alasql.org website please make a PR to https://github.com/alasql/alasql-org
- To help debug a problem you can see some advice on https://github.com/AlaSQL/alasql/issues/1415#issuecomment-1293335079
