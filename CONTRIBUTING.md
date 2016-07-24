# How to Contribute to the AlaSQL project

Thank you very much or the your intentions! AlaSQL project still has a lot of thing to be improved, and your help is very appreciated!


We have many things to improve:
* [issues and bugs](https://github.com/agershun/alasql/issues)
* [wiki documentation](https://github.com/agershun/alasql/wiki)
* code refactoring and documenting 
* import-export functions
* [alasql.org web site](https://github.com/agershun/alasql-org)

For you to edit the source please do the following:

- Fork the repo here on Github
- Clone your forked repo and install dependencies `git clone https://github.com/MYUSERNAME/alasql/ && cd alasql && npm install`  
- Please work with the code from the develop branch `git checkout develop`
- Add a test for the issue: Copy `test/test000.js` and replace `000` with a new number. 
- Impelement a test that reflects the issue.
- Run `npm test` to verify only the new test fails
- Implement your contributions in `src/`
- Run `npm test` and verify all tests are OK
- Commit changes to git and push to your forked repo
- Click "Create Pull-request" when looking at your forked repo on Github

_Please note that `npm test` will compile from `src/` before running tests_ 


 
## For documentation


### Suggest Content
- Have you had questions that you wished you had answers to? Are there resources or references that you wish were made available to you in a central location? **Submit them!** as an issue

### Author Content
- See a question that you can answer or are an expert on? **Answer it!** 
- See an answer that you can improve, build upon, or provide an alternative perspective to? **Edit it!** 
- See ways to organize content better, improve the writing style for clarity or simply make the reading experience easier? **Improve it!**

###Review Content
- Have feedback on the accuracy, clarity or relevance of existing content? **Flag it**.



Thank you!
