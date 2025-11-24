# ui-test-automation-playground

The purpose of this website is to provide a platform for sharpening UI test automation skills. Use it to practice with your test automation tool. Use it to learn test automation techniques.

## Live Version

Latest version of this website is always available at [uitestingplayground.com](http://uitestingplayground.com).

## Prerequisites
- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/get-npm)

## Usage

1. Clone the repository
2. In the package folder run
```bash
npm install
```
3. Launch with
```bash
node app.js
```
4. In a browser navigate to
```
http://localhost:3000
```

## Software Stack
- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express/)
- [Pug](https://github.com/pugjs/pug)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [jQuery](https://github.com/jquery/jquery)

Olena Tolsta test task user manual  
1. Install Visual Studio Code https://code.visualstudio.com/download
2. Clone the repository to Visual Studio Code
3. In Visual Studio Code, open Cognigy folder
4. Run the following command in order to read package.json, install all dependencies and update package-lock.json  
npm install  
5. Install Playwright  
npm install -D @playwright/test  
6. Install browsers  
npx playwright install  
7. Make sure to change or just check Base_URL in .env file
8. Run the application  
node app.js  
9. Run tests  
npx playwright test  
Each test has it's number and a tag to run them separately.  
npx playwright test --grep "@smoke"  
or  
npx playwright test --grep "@OTTest-007"  
10. View HTML report  
npx playwright show-report
